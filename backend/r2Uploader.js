// r2Uploader.js
require("dotenv").config();
const {
  S3Client,
  PutObjectCommand,
} = require("@aws-sdk/client-s3");

const crypto = require("crypto");

// Create unique file names
function generateFileName(originalName) {
  const ext = originalName.split(".").pop();
  const id = crypto.randomBytes(16).toString("hex");
  return `${id}.${ext}`;
}

// Configure the R2 client
const r2 = new S3Client({
  region: "auto",
  endpoint: `https://${process.env.CF_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: process.env.CF_ACCESS_KEY_ID,
    secretAccessKey: process.env.CF_SECRET_ACCESS_KEY,
  },
});

// Main upload function
async function uploadToR2(file) {
  const fileName = generateFileName(file.originalname);

  const params = {
    Bucket: process.env.CF_BUCKET_NAME,
    Key: fileName,
    Body: file.buffer,
    ContentType: file.mimetype,
  };

  await r2.send(new PutObjectCommand(params));

  return `https://${process.env.CF_BUCKET_SUBDOMAIN}/${fileName}`;
}

module.exports = uploadToR2;
