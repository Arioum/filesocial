const s3 = require('../aws/s3');
const uuid = require('uuid');

const s3FileUploadMiddleware = (req, res, next) => {
  if (!req.files || req.files.length === 0) {
    return res.status(400).json({ message: 'No files uploaded' });
  }

  let images = [];

  const uploadImages = req.files.map((file) => {
    return new Promise((resolve, reject) => {
      const filename = `${uuid.v4()}.jpg`;

      s3.upload(
        {
          Bucket: 'goldendawn-assets/menuItems',
          Key: filename,
          Body: file.buffer,
          ContentType: 'image/jpeg',
        },
        (err, data) => {
          if (err) {
            reject('Error uploading file to S3');
            return res
              .status(500)
              .json({ error: 'Error uploading file to S3' });
          }
          const imageUrl = data.Location; // S3 URL
          images.push({ url: imageUrl });
          resolve();
        }
      );
    });
  });

  Promise.all(uploadImages)
    .then(() => {
      req.images = images;
      next();
    })
    .catch((error) => {
      return res.status(500).json({ error });
    });
};

module.exports = s3FileUploadMiddleware;
