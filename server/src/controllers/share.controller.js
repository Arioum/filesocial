const { generateUniqueSharableCode } = require('../helper/generateUniqueSharableCode');
const { getSubscriptionLevelByUserID } = require('../helper/getSubscriptionConfig');
const { Share, File } = require('../models/fileShare.model');
const { findUserById } = require('../helper/user');

const createShareAction = async (req, res) => {
  const { userId } = req.user;
  const { fileIds } = req.body;

  try {
    let generatedCode;
    let codeNotUnique;

    do {
      generatedCode = generateUniqueSharableCode();
      codeNotUnique = await Share.findOne({ sharableCode: generatedCode });
    } while (codeNotUnique);

    const files = await File.find({ _id: { $in: fileIds }, userId: userId });
    if (files.length !== fileIds.length) {
      return res.status(400).json({ message: 'One or more file IDs are invalid or do not belong to the user' });
    }

    const subscriptionConfig = await getSubscriptionLevelByUserID(userId);
    const { shareTime } = subscriptionConfig.features;
    const expirationTime = parseInt(shareTime, 10);
    const expiresAt = new Date(Date.now() + expirationTime * 60 * 1000);

    const newShare = new Share({
      userId,
      files: files,
      sharableCode: generatedCode,
      expiresAt: expiresAt,
    });

    await newShare.save();

    res.status(200).json({ message: 'Share action created successfully', sharableCode: generatedCode, expiresAt: expiresAt });
  } catch (error) {
    console.error('Error in createShareAction:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

const cancelShareAction = async (req, res) => {
  const { sharableCode } = req.params;

  try {
    const share = await Share.find({ sharableCode, status: 'active' });
    console.log('share', share);

    if (!share) {
      return res.status(400).json({ message: 'The shared code does not exist or it has already expired' });
    }
    share.status = 'inactive';
    await share.save();
    res.status(200).json({ message: 'Share cancelled successfully' });
  } catch (error) {
    console.error('Error in cancelShareAction:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

const receiveSharedFiles = async (req, res) => {
  const { sharableCode } = req.params;

  try {
    const share = await Share.find({ sharableCode, status: 'active' });

    if (share.length === 0) {
      return res.status(401).json({ message: 'The shared code does not exist or it has already expired' });
    }

    const files = share[0].files;
    const user = await findUserById(share[0].userId);

    return res
      .status(200)
      .json({ message: 'Receive action created successfully', files, expiresAt: share.expiresAt, user: { userId: user._id, userName: user.userName } });
  } catch (error) {
    console.error('Error in recieveSharedFiles:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = { createShareAction, cancelShareAction, receiveSharedFiles };
