const { File } = require('../models/fileShare.model');
const { s3 } = require('../configs/aws/s3');
const { findUserById } = require('../helper/user');
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner');
const { PutObjectCommand, GetObjectCommand } = require('@aws-sdk/client-s3');
const { getSubscriptionLevelByUserID } = require('../helper/getSubscriptionConfig');

const getAllFilesByUserId = async (req, res) => {
  const { userId } = req.query;

  try {
    const user = await findUserById(userId);
    if (!user) throw err;

    const fileList = await File.find({ userId, isExpired: false });

    if (fileList.length === 0) {
      return res.status(200).json({ fileList, message: 'There are no files on our servers' });
    }

    return res.status(200).json({ fileList, message: 'Files Found' });
  } catch (err) {
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Route to get pre-signed URL and save file reference
const uploadFile = async (req, res) => {
  const { fileName, fileType, fileSize, userId } = req.body;

  const user = await findUserById(userId);

  if (!user) {
    return res.status(404).json({ message: 'Invalid user' });
  }
  // console.log(fileName, fileType, fileSize, userId);

  const folderName = 'test';
  const uniqueSuffix = Date.now();
  const fileKey = `${folderName}/${uniqueSuffix}-${fileName}`;

  const command = new PutObjectCommand({
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: fileKey,
    ContentType: fileType,
  });

  try {
    // Get pre-signed URL
    const url = await getSignedUrl(s3, command, { expiresIn: 300 });

    const subscriptionConfig = await getSubscriptionLevelByUserID(userId);
    const { fileRetentionTime } = subscriptionConfig.features;
    const expirationTime = parseInt(fileRetentionTime, 10);
    const expiresAt = new Date();
    expiresAt.setMinutes(expiresAt.getMinutes() + expirationTime);

    const file = new File({
      userId,
      fileName,
      fileUrl: `https://${process.env.AWS_BUCKET_NAME}.s3.amazonaws.com/${fileKey}`,
      fileSize,
      fileType,
      expiresAt,
    });

    const savedFile = await file.save();

    // Return pre-signed URL for file upload
    res.status(200).json({ url, fileId: savedFile._id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to generate pre-signed URL' });
  }
};

// Route to generate a pre-signed download URL
const downloadFile = async (req, res) => {
  const { fileId } = req.params;

  // Fetch the file record from the database
  const file = await File.findById(fileId);

  if (!file) {
    return res.status(404).json({ error: 'File not found' });
  }

  if (new Date(file.expiresAt) < new Date()) {
    return res.status(410).json({ isExpired: true, error: 'This share has expired.' });
  }

  const command = new GetObjectCommand({
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: file.fileUrl.replace(`https://${process.env.AWS_BUCKET_NAME}.s3.amazonaws.com/`, ''),
  });

  const currentTime = new Date();
  const timeDifferenceInSeconds = Math.floor((file.expiresAt.getTime() - currentTime.getTime()) / 1000);
  const expiresIn = Math.max(timeDifferenceInSeconds, 1);

  try {
    const url = await getSignedUrl(s3, command, { expiresIn });
    res.status(200).json({ isExpired: false, downloadUrl: url });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to generate download URL' });
  }
};

const cancelUploads = async (req, res) => {
  const { fileIds } = req.body;

  try {
    for (const fileId of fileIds) {
      const file = await File.findById(fileId);

      if (file) {
        file.expiresAt = Date.now();
        await file.save();
      }
    }
    res.status(200).json({ error: 'Failed to generate download URL' });
  } catch (error) {
    console.error("r",error);
    res.status(500).json({ error: 'Failed to generate download URL' });
  }
};

module.exports = { getAllFilesByUserId, uploadFile, downloadFile, cancelUploads };
