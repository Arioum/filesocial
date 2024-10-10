const { v4: uuidv4 } = require('uuid');

const generateUniqueSharableCode = () => {
  const uuid = uuidv4();
  const parts = uuid.split('-'); // Split the UUID into parts
  const formattedCode = `${parts[0].slice(0, 3)}-${parts[1].slice(0, 3)}-${parts[2].slice(0, 3)}`; // Format: XXX-XXX-XXX
  return formattedCode;
};

module.exports = { generateUniqueSharableCode };
