# 🔐 Secure Messaging Backend (Node.js + TypeScript)

This is the backend service for a secure, encrypted client-server messaging app built with Node.js, Express, and MongoDB. It handles authentication, encrypted message broadcasting, long polling communication (no WebSockets), and audit-logging of events.

## 📦 Features

- 🔐 **Secure user authentication** with bcrypt-hashed passwords
- 🔒 **TLS-encrypted communication** using HTTPS
- 🔐 **RSA + AES** hybrid encryption:
  - RSA for key exchange (optional in production)
  - AES-256-CBC for message encryption
- 📡 **Message broadcasting** via long polling
- 🧾 Encrypted message storage in MongoDB
- 🧪 Unit-tested using **Vitest + Supertest**
- 🧠 Scalable to 10,000+ concurrent clients with clustering/load balancing support

## 🚀 Getting Started

1️⃣ Install Dependencies

Ensure you have Node.js installed, then run:

npm install

2️⃣ Start the Backend

Run the backend server:

npm run start:local

By default, the backend runs on https://localhost:3501.

🔥 Running with Frontend

Make sure the frontend is running on http://localhost:3000, and the backend is running on https://localhost:3501.

Now you're all set! 🎯 🚀

3️⃣ Start the tests

Run the tests for backend server:

npm run test
 


