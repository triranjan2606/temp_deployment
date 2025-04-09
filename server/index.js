const express = require("express");
const { S3Client, ListObjectsV2Command, GetObjectCommand } = require("@aws-sdk/client-s3");
const { Readable } = require("stream");
const dotenv = require("dotenv")
const cors = require('cors')

const app = express();
app.use(cors({
    origin: '*', // Allow access from any origin
}));
const PORT = 5000;
dotenv.config();

// Configure AWS S3

const s3 = new S3Client({
  region: "eu-north-1", // change to your region
  credentials: {
    accessKeyId: process.env.ACCESS_KEY_ID,     
    secretAccessKey: process.env.SECRET_ACCESS_KEY
  }
});

// Your bucket and "folder" (prefix)
const BUCKET_NAME = "detection-data-123";
const PREFIX = "temp/"; // optional "folder" inside the bucket

// Helper to convert stream to string
const streamToString = async (stream) => {
  return new Promise((resolve, reject) => {
    const chunks = [];
    stream.on("data", (chunk) => chunks.push(chunk));
    stream.on("error", reject);
    stream.on("end", () => resolve(Buffer.concat(chunks).toString("utf-8")));
  });
};

// API to fetch all JSON files from S3
app.get("/api/json-files", async (req, res) => {
  try {
    const listCommand = new ListObjectsV2Command({
      Bucket: BUCKET_NAME,
      Prefix: PREFIX,
    });

    const listedObjects = await s3.send(listCommand);

    if (!listedObjects.Contents) {
      return res.json([]);
    }

    const jsonFiles = listedObjects.Contents.filter(obj => obj.Key.endsWith(".json"));

    const allData = [];

    for (const file of jsonFiles) {
      const getCommand = new GetObjectCommand({
        Bucket: BUCKET_NAME,
        Key: file.Key
      });

      const response = await s3.send(getCommand);
      const bodyContents = await streamToString(response.Body);

      try {
        const parsed = JSON.parse(bodyContents);
        allData.push({ filename: file.Key, data: parsed });
      } catch (e) {
        console.error(`Error parsing ${file.Key}:`, e.message);
      }
    }

    res.json( {
      success: true,
      data: allData,
      message:"letest cases fetched successfully"
    });
  } catch (error) {
    console.error("Error fetching files from S3:", error);
    res.status(500).json({ error: "Failed to fetch JSON files from S3." });
  }
});

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})