const { File } = require('../models/fileShare.model');
const { s3 } = require('../configs/aws/s3');
const { DeleteObjectCommand } = require('@aws-sdk/client-s3');

async function checkAndMarkExpiredFiles() {
  const now = new Date();

  // Find files that are not marked as expired but have passed the expiration date
  const expiredFiles = await File.find({ isExpired: false, expiresAt: { $lte: now } });

  for (const file of expiredFiles) {
    file.isExpired = true;
    await file.save(); // Update the file record

    const fileKey = file.fileUrl.split('/').slice(-2).join('/');
    console.log(fileKey);

    const deleteParams = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: fileKey,
    };

    try {
      const command = new DeleteObjectCommand(deleteParams);
      await s3.send(command);
      console.log(`Deleted file from S3: ${file.fileName}`);
    } catch (err) {
      console.error(`Error deleting file from S3: ${err.message}`);
    }
  }

  console.log(`Marked ${expiredFiles.length} files as expired.`);
}

module.exports = checkAndMarkExpiredFiles;
