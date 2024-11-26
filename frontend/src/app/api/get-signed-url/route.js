import { Storage } from "@google-cloud/storage";
import { NextResponse } from "next/server";

const storage = new Storage({
    keyFilename: 'apttracking-files-admin.json'
});
const bucketName = "apttracking-files-bucket"; // Replace with your bucket name

export async function POST(request, _response) {
  const { fileName } = await request.json();
  if (!fileName) {
    return NextResponse.json({ message: "Missing fileName in request body" }, {status: 422})
  }
  try {
    const options = {
      version: "v4",
      action: "write",
      expires: Date.now() + 15 * 60 * 1000, // 15 minutes
      contentType: "application/octet-stream",
    };

    const [url] = await storage.bucket(bucketName).file(fileName).getSignedUrl(options);
    return NextResponse.json({message: "Success", url, bucketName, status: 201})
  } catch (error) {
    console.error("Error generating signed URL:", error);
    return NextResponse.json({ message: error}, {status: 500})
  }
}
