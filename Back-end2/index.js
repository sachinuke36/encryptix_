const express = require('express');
const app = express();
const cors = require('cors');
const { MongoClient } = require("mongodb");
const port = process.env.PORT || 4000;

// Middleware setup
app.use(express.json());
app.use(cors());

// MongoDB connection URI
const uri = "mongodb+srv://sachinuke1:9309123278Sachu@cluster0.t41qjji.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Create a new MongoClient instance
const client = new MongoClient(uri);

// Async function to handle MongoDB operations
async function run() {
  try {
    // Connect to the MongoDB cluster
    await client.connect();
    console.log("Connected to MongoDB");

    // Access the "jobdekho" database and "jobs" collection
    const database = client.db("jobdekho");
    const collection = database.collection("jobs");

    // Define a POST endpoint to insert data into MongoDB
    app.post('/jobs', async (req, res) => {
      try {
        // Validate request body
        if (!req.body || Object.keys(req.body).length === 0) {
          return res.status(400).json({ message: "Request body is empty" });
        }

        // Insert data into MongoDB collection
        const result = await collection.insertOne(req.body);
        console.log(`Document inserted with _id: ${result.insertedId}`);
        res.status(201).json({ message: "Document inserted successfully", _id: result.insertedId });
      } catch (error) {
        console.error("Error inserting document:", error);
        res.status(500).json({ message: "Internal server error" });
      }
    });

    // Start the Express server
    app.listen(port, () => {
      console.log(`Server is listening at http://localhost:${port}`);
    });
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1); // Exit process if MongoDB connection fails
  }
}

// Run the async function
run();
