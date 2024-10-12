const { generateUniqueSharableCode } = require('../helper/generateUniqueSharableCode');
const { getSubscriptionLevelByUserID } = require('../helper/getSubscriptionConfig');
const { Share, File } = require('../models/fileShare.model');
const { findUserById } = require('../helper/user');
const Stats = require('../models/stats.model');

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

    await Stats.findOneAndUpdate({ userId }, { $setOnInsert: { userId } }, { upsert: true });

    res.status(200).json({ message: 'Share action created successfully', shareId: newShare._id, sharableCode: generatedCode, expiresAt: expiresAt });
  } catch (error) {
    console.error('Error in createShareAction:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

const cancelShareAction = async (req, res) => {
  const { shareId } = req.body;

  try {
    const share = await Share.findOne({ _id: shareId, status: 'active' });

    if (!share) {
      return res.status(400).json({ message: 'The shared code does not exist or it has already expired' });
    }
    share.expiresAt = Date.now();
    share.status = 'inactive';
    await share.save();
    res.status(200).json({ message: 'Share cancelled successfully' });
  } catch (error) {
    console.error('Error in cancelShareAction:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

const getActiveShare = async (req, res) => {
  const { userId } = req.user;

  try {
    const share = await Share.findOne({ userId, status: 'active' });
    console.log('share', share);

    if (!share) {
      return res.status(200).json({ message: 'The shared has expired', share: null });
    }
    res.status(200).json({ message: 'Share retrieved successfully', shareId: share._id, sharableCode: share.sharableCode, expiresAt: share.expiresAt });
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

const getShareHistory = async (req, res) => {
  const { userId } = req.user;

  try {
    const shareList = await Share.find({ userId }).limit(10).sort({ createdAt: -1 });

    if (shareList.length === 0) {
      return res.status(200).json({ shareList, message: 'You have no shares yet' });
    }

    return res.status(200).json({ message: 'Share History fetched', shareList });
  } catch (error) {
    console.error('Error in getShareHistory:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = { createShareAction, cancelShareAction, getActiveShare, receiveSharedFiles, getShareHistory };
