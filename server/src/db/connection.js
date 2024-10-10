const mongoose = require('mongoose');

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch((err) => console.log(`Error occured while connecting: ${err}`));

  