// backend/server.js
import express from "express";
import bodyParser from "body-parser";
import { v4 as uuidv4 } from "uuid";
import { db } from "./config/firebase.js";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import twilio from "twilio";
import dotenv from "dotenv";

// Get environment config
dotenv.config();

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const SmsSender = process.env.TWILIO_SMS_SENDER;
const client = twilio(accountSid, authToken);

const app = express();
const port = 2003;

app.use(bodyParser.json());

// (POST) CreateNewAccessCode
app.post("/CreateNewAccessCode", async (req, res) => {
  const { phoneNumber } = req.body;
  const accessCode = Math.floor(100000 + Math.random() * 900000).toString();
  try {
    await setDoc(
      doc(db, "users", phoneNumber),
      { accessCode },
      { merge: true }
    );
    client.messages
      .create({
        from: SmsSender,
        to: phoneNumber,
        body: `Your access code is: ${accessCode}`,
      })
      .then((message) => console.log(message.sid))
      .done();
    res.status(200).json({ accessCode: accessCode });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// (POST) ValidateAccessCode
app.post("/ValidateAccessCode", async (req, res) => {
  const { accessCode, phoneNumber } = req.body;
  try {
    const userDoc = await getDoc(doc(db, "users", phoneNumber));
    if (userDoc.exists() && userDoc.data().accessCode === accessCode) {
      await updateDoc(doc(db, "users", phoneNumber), { accessCode: "" });
      res.json({ success: true });
    } else {
      res.status(400).json({ success: false, message: "Invalid access code" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
