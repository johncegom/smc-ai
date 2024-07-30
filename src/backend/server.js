// backend/server.js
import express from "express";
import bodyParser from "body-parser";
import { v4 as uuidv4 } from "uuid";
import { db } from "./config/firebase.js";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import twilio from "twilio";
import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";

// Get environment config
dotenv.config();

// Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

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
  const accessCode = generateAccessCode();
  // await sendSMSThroughTwilio(phoneNumber, accessCode);
  try {
    await setDoc(
      doc(db, "users", phoneNumber),
      { accessCode },
      { merge: true }
    );

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

// (POST) GeneratePostCaptions
app.post("/GeneratePostCaptions", async (req, res) => {
  const { socialNetwork, subject, tone } = req.body;
  try {
    const postCaptions = await generatePostCaptions(
      socialNetwork,
      subject,
      tone
    );
    res.json({ postCaptions: postCaptions });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const generateAccessCode = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

const sendSMSThroughTwilio = async (phoneNumber, accessCode) => {
  // Send access code through SMS.
  try {
    await client.messages.create({
      from: SmsSender,
      to: phoneNumber,
      body: `Your access code is: ${accessCode}`,
    });
  } catch (error) {
    console.error(error.message);
  }
};

const generatePostCaptions = async (socialNetwork, subject, tone) => {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  const prompt = `
    Generate a list of captions (at least five captions) for social media posts using the following inputs:  ${socialNetwork}, ${subject}, and ${tone}. Each caption should be engaging and tailored to the specified social media platform. The tone should align with the given input. Captions should be concise, yet impactful, and encourage interaction such as likes, comments, and shares. Include relevant hashtags where appropriate. The list of captions must be a string and separate by double semicolon, e.g: "caption1;; caption2;; caption2;; ...". Besides, I don't need any advice, just give me the list.
  `;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const postCaptions = response.text();
  return postCaptions;
};

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
