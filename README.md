# Social Media Caption GenAI

A project to create a platform using AI to generate caption(s) for social media content.

## Table of Contents

- [Project Structure](#project-structure)
- [Complete Section](#complete-section)
- [Images](#images)
- [How to Run](#how-to-run)
  - [Frontend](#frontend)
  - [Backend](#backend)
- [Testing](#testing)

## Project Structure

```
SOCIAL-MEDIA-GEN-AI
├── node_modules
├── public
│   ├── favicon.ico
│   ├── index.html
│   ├── logo192.png
│   ├── logo512.png
│   └── manifest.json
├── src
│   ├── assets
│   ├── backend
│   ├── components
│   ├── contexts
│   ├── hooks
│   └── routes
├── index.js
├── logo.svg
├── .gitignore
├── package-lock.json
├── package.json
└── README.md
```

The project is divided into two parts: Frontend and Backend. The backend source is stored in the `backend` folder. To keep things simple, the backend is built as simply as possible.

## Complete Section

Because of lacking experience, only the following section is completed, the rest is not complete and will be completed in future (as a personal project!):

- **Login**
- **Services**
- **Start from scratch**
- **Facebook post**
- **Instagram post**
- **Twitter(X) post**

## Images

![First Login page](/public/images/login-1.png "Login - Phase 1")
![Second Login page](/public/images/login-2.png "Login - Phase 2")
![Home page](/public/images/welcome.png "Welcome")
![Services page](/public/images/services-1.png "Services")
![Start from scratch page](/public/images/services-2.png "Start from scratch")
![Instagram post caption generation page](/public/images/services-3.png "Instagram post captions generation")
![Facebook post caption generation page with generated captions](/public/images/services-4.png "Instagram post captions generated")

## How to Run

### Frontend

1. Navigate to the `social-media-gen-ai` folder.
2. Start the React application with the command:
   ```sh
   npm start
   ```

### Backend

1. Navigate to the `social-media-gen-ai` folder.
2. Navigate to the `src/backend` folder.
3. Create a `.env` file and add the necessary information (Twilio, Firebase, Gemini). You can find these details in the attached document in the email.
   - **Firebase:**
     ```env
     FIREBASE_API_KEY=your_api_key
     FIREBASE_AUTH_DOMAIN=your_auth_domain
     FIREBASE_DATABASE_URL=your_database_url
     FIREBASE_PROJECT_ID=your_project_id
     FIREBASE_STORAGE_BUCKET=your_storage_bucket
     FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
     FIREBASE_APP_ID=your_app_id
     ```
   - **Twilio:**
     ```env
     TWILIO_ACCOUNT_SID=your_account_sid
     TWILIO_AUTH_TOKEN=your_auth_token
     TWILIO_SMS_SENDER=your_sms_sender
     ```
   - **Gemini:**
     ```env
     GEMINI_API_KEY=your_api_key
     ```
4. Start the Express application with the command:
   ```sh
   npm start
   ```

## Testing

For testing purposes, access code API responses from the frontend and log them into the console. To test OTP code through SMS (Twilio), follow the Twilio guide to create a trial account and make sure your mobile phone is verified and can receive SMS message from Twilio via API on Twilio console.
