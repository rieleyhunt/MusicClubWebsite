// r2Uploader.js
const express = require('express');
const multer = require('multer');
const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');
require('dotenv').config();

const router = express.Router();

const R2_ENDPOINT = 'https://56cd80b33b68f5cc6054c3e4b6c548e2.r2.cloudflarestorage.com';
const BUCKET = 'bbf-assets';        // bucket ONLY
const KEY_PREFIX = 'assets/';    // prefix for the files

const PUBLIC_BASE = process.env.R2_PUBLIC_BASE;

// Upload destination: memory
const upload = multer({
  storage: multer.memoryStorage(),
  // limits: { fileSize: 10 * 1024 * 1024 }, // (optional) 10MB limit
});

console.log('ID:', process.env.R2_ACCESS_KEY_ID);
console.log('SECRET:', process.env.R2_SECRET_ACCESS_KEY);

// Your R2 configuration

const s3 = new S3Client({
  region: 'auto',                   // R2 uses 'auto'
  endpoint: R2_ENDPOINT,            // S3-compatible endpoint
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY,
  },
  // forcePathStyle: true, // usually not required for R2 with full endpoint
});


// Route to upload a file
router.post('/upload', upload.single('file'), async (req, res) => {
    try {
    const file = req.file;
    if (!file) return res.status(400).json({ error: 'No file uploaded' });

    const key = `${KEY_PREFIX}${file.originalname}`;

    // Note: R2 ignores ACL; public access is controlled by your bucket policy / R2.dev binding.
    const command = new PutObjectCommand({
      Bucket: BUCKET,
      Key: key,
      Body: file.buffer,
      ContentType: file.mimetype,
    });

    await s3.send(command);

    // Construct a public URL based on how you expose the bucket:
    // If you’ve enabled a public R2.dev binding:
    //   https://pub-<hash>.r2.dev/<key>
    // Or if you use the R2 bucket endpoint (and public policy/custom domain):
    //   https://<your-public-host>/<key>
    const publicBase = process.env.R2_PUBLIC_BASE; // e.g. https://pub-xxxx.r2.dev  OR https://assets.yourdomain.com
    const url = `${publicBase}/${key}`;

    res.json({ message: 'Upload successful', url });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Upload failed' });
  }
});


module.exports = router;
