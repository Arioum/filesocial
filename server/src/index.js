require('dotenv').config();
const express = require('express');
const cors = require('cors');
const routes = require('./routes/routes');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());

app.use('/api/v1', routes);

app.listen(4000 || process.env.PROD, () =>
  console.log('Server running on port 4000')
);
