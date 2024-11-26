// import { Storage } from "@google-cloud/storage"

const { default: axios } = require("axios");

// export const getSignedUrl = async(fileName) => {
//     const storage = new Storage();
//     const options = {
//         version: 'v4',
//         action: 'write',
//         expires: Date.now() + 15 * 60 * 1000, // 15 minutes
//         contentType: 'application/octet-stream',
//       };
    
//       // Get a v4 signed URL for uploading file
//       const [url] = await storage
//         .bucket(bucketName)
//         .file(fileName)
//         .getSignedUrl(options);
// }

export const handleFileUpload = async (file) => {
    if (!file) {
      return;
    }
    try {
     // add timestamp to file name
      const timestamp = new Date().getTime();
      const fileNameWithTimestamp = `${timestamp}-${file.name}`;
      // Request the signed URL from the API
      const body = { fileName: fileNameWithTimestamp };
      const response = await axios.post("/api/get-signed-url", body);
      const signedUrl = response.data.url;  
      // Extract bucket name and file path from the signed URL
      const bucketName = response.data.bucketName;
      // Upload the file to the signed URL
      await axios.put(signedUrl, file, {
        headers: {
          "Content-Type": "application/octet-stream",
        },
      });
      // Construct the public URL
      const publicUrl = `https://storage.googleapis.com/${bucketName}/${fileNameWithTimestamp}`;
      return publicUrl;
    } catch (error) {
      console.error("Error uploading file:", error);
      return null;
    }
  };
  