app.get("/api/json-files", async (req, res) => {
    try {
      const listCommand = new ListObjectsV2Command({
        Bucket: BUCKET_NAME,
        Prefix: PREFIX,
        MaxKeys: 1000
      });
  
      console.log("Fetching file list from S3...");
      const listedObjects = await s3.send(listCommand);
  
      if (!listedObjects.Contents) {
        return res.json({ success: true, data: [], message: "No files found." });
      }
  
      // Filter JSON files and take first 20
      const jsonFiles = listedObjects.Contents
        .filter(obj => obj.Key.endsWith(".json"))
        .slice(0, 20);
  
      // Fetch all files in parallel
      const fileDataPromises = jsonFiles.map(async file => {
        try {
          const getCommand = new GetObjectCommand({
            Bucket: BUCKET_NAME,
            Key: file.Key
          });
  
          const response = await s3.send(getCommand);
          const bodyContents = await streamToString(response.Body);
          const parsed = JSON.parse(bodyContents);
  
          return { filename: file.Key, data: parsed };
        } catch (err) {
          console.error(`Error processing ${file.Key}:`, err.message);
          return null;
        }
      });
  
      const allData = (await Promise.all(fileDataPromises)).filter(Boolean);
  
      res.json({
        success: true,
        data: allData,
        message: "First 20 JSON files fetched in parallel"
      });
  
    } catch (error) {
      console.error("Error fetching files from S3:", error);
      res.status(500).json({ error: "Failed to fetch JSON files from S3." });
    }
  });