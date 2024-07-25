const fs = require('fs');
const path = require('path');

const uploadFiles = (req, res) => {
  const chunk = req.file;
  const chunkIndex = parseInt(req.body.chunkIndex, 10);
  const totalChunks = parseInt(req.body.totalChunks, 10);
  const fileIdentifier = req.body.fileIdentifier || 'default';
  const originalFileName = req.body.originalFileName || 'file';
  const originalFileExtension = path.extname(originalFileName);

  if (!chunk) {
    return res.status(400).send('No file uploaded');
  }

  const tempDir = path.join(__dirname, 'uploads', fileIdentifier);
  if (!fs.existsSync(tempDir)) {
    fs.mkdirSync(tempDir, { recursive: true });
  }

  const chunkPath = path.join(tempDir, `${chunkIndex}`);
  fs.writeFileSync(chunkPath, chunk.buffer);

  const uploadedChunks = fs.readdirSync(tempDir).length;

  if (uploadedChunks === totalChunks) {
    const finalFileName = originalFileName;
    const filePath = path.join(__dirname, 'uploads', finalFileName);
    const writeStream = fs.createWriteStream(filePath);

    const pipeChunks = (index) => {
      if (index >= totalChunks) {
        writeStream.end();
        fs.rmSync(tempDir, { recursive: true, force: true });
        res.send('File upload complete');
        return;
      }

      const currentChunkPath = path.join(tempDir, `${index}`);
      const readStream = fs.createReadStream(currentChunkPath);

      readStream.pipe(writeStream, { end: false });
      readStream.on('end', () => {
        if (index + 1 === totalChunks) {
          writeStream.end();
          writeStream.on('finish', () => {
            try {
              fs.rmSync(tempDir, { recursive: true, force: true });
              res.send('File upload complete');
            } catch (err) {
              console.error('Error removing temporary directory:', err);
              res.status(500).send('Error completing upload');
            }
          });
        } else {
          pipeChunks(index + 1);
        }
      });
    };

    writeStream.on('error', (error) => {
      console.error('Error writing final file:', error);
      res.status(500).send('Error uploading chunk');
    });

    pipeChunks(0);
  } else {
    res.status(200).send('Chunk uploaded');
  }
};

module.exports = uploadFiles;
