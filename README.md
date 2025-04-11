Secure Messaging Application Backend

This is the backend for the Secure Messaging Wev Application. It receives logs from Spark job runs and stores them in Parquet files instead of a database. The backend is built using Node.js with Express and serves APIs to retrieve and store logs.

🚀 Getting Started

1️⃣ Install Dependencies

Ensure you have Node.js installed, then run:

npm install

2️⃣ Start the Backend

Run the backend server:

npm run start:local

By default, the backend runs on http://localhost:3001.

📌 API Endpoints

1️⃣ Add a Spark Job Log

Endpoint: POST /logs

Description: Stores a Spark job log in a Parquet file.

Request Body (JSON):

{
  "jobId": "job_001",
  "runTime": 5000,
  "executorCount": 4,
  "errors": "None"
}

Response:

{
  "message": "Log saved successfully"
}

2️⃣ Retrieve All Logs

Endpoint: GET /logs

Description: Fetches all stored logs.

Response (Example):

[
  {
    "jobId": "job_001",
    "runTime": 5000,
    "executorCount": 4,
    "errors": "None"
  },
  {
    "jobId": "job_002",
    "runTime": 6200,
    "executorCount": 3,
    "errors": "Timeout Error"
  }
]

🔧 How Data is Stored

Logs are stored in Parquet format in the data/ directory.

Each request appends data to spark_logs.parquet.

Logs Not Persisting

Ensure that:

The data/ directory exists.

The server has permission to write to files.

🔥 Running with Frontend

Make sure the frontend is running on http://localhost:3000, and the backend is running on http://localhost:3001.

Now you're all set! 🎯 🚀

🔥 Edge cases:

If you're faces with TLS Fix Mode Activated – That error means your frontend is rejecting the HTTPS certificate because it’s self-signed and not trusted.
Solution: 
	1.	Open the backend in a browser:
https://localhost:3501
	2.	Your browser will warn about “not secure.” Click:
	•	Advanced > Proceed to localhost (unsafe)
	3.	After that, your browser (and fetch/axios in frontend) will stop rejecting it.

⚠️ In Chrome, you only need to do this once per cert/key pair.

