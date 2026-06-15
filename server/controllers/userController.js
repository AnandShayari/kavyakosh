import User from '../models/User.js';
import Follow from '../models/Follow.js';
import Poem from '../models/Poem.js';
import mongoose from 'mongoose';

// Get User Profile
export const getUserProfile = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ success: false, message: 'Invalid user ID' });
    }

    const user = await User.findById(userId)
      .select('-password')
      .populate('subscription');

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    const totalPoems = await Poem.countDocuments({ author: userId, published: true });
    const followers = await Follow.countDocuments({ following: userId, status: 'active' });
    const following = await Follow.countDocuments({ follower: userId, status: 'active' });

    res.status(200).json({
      success: true,
      data: {
        ...user.toObject(),
        stats: {
          totalPoems,
          followers,
          following,
          totalLikes: user.totalLikes,
        },
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update Profile
export const updateProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const { name, bio, avatar, coverImage } = req.body;

    const user = await User.findByIdAndUpdate(
      userId,
      { name, bio, avatar, coverImage },
      { new: true }
    ).select('-password');

    res.status(200).json({
      success: true,
      message: 'Profile updated successfully',
      data: user,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Follow User
export const followUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const followerId = req.user.id;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ success: false, message: 'Invalid user ID' });
    }

    if (userId === followerId) {
      return res.status(400).json({ success: false, message: 'Cannot follow yourself' });
    }

    const targetUser = await User.findById(userId);
    if (!targetUser) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    const existingFollow = await Follow.findOne({ follower: followerId, following: userId });
    if (existingFollow) {
      return res.status(400).json({ success: false, message: 'Already following' });
    }

    await Follow.create({ follower: followerId, following: userId });

    await User.findByIdAndUpdate(userId, { $inc: { totalFollowers: 1 } });
    await User.findByIdAndUpdate(followerId, { $inc: { totalFollowing: 1 } });

    res.status(200).json({
      success: true,
      message: 'User followed successfully',
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Unfollow User
export const unfollowUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const followerId = req.user.id;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ success: false, message: 'Invalid user ID' });
    }

    const follow = await Follow.findOneAndDelete({ follower: followerId, following: userId });
    if (!follow) {
      return res.status(400).json({ success: false, message: 'Not following' });
    }

    await User.findByIdAndUpdate(userId, { $inc: { totalFollowers: -1 } });
    await User.findByIdAndUpdate(followerId, { $inc: { totalFollowing: -1 } });

    res.status(200).json({
      success: true,
      message: 'User unfollowed successfully',
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get Followers
export const getFollowers = async (req, res) => {
  try {
    const { userId } = req.params;
    const { page = 1, limit = 20 } = req.query;
    const skip = (page - 1) * limit;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ success: false, message: 'Invalid user ID' });
    }

    const followers = await Follow.find({ following: userId, status: 'active' })
      .populate('follower', 'name avatar bio')
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Follow.countDocuments({ following: userId, status: 'active' });

    res.status(200).json({
      success: true,
      data: followers.map(f => f.follower),
      pagination: { page: parseInt(page), limit: parseInt(limit), total },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get Following
export const getFollowing = async (req, res) => {
  try {
    const { userId } = req.params;
    const { page = 1, limit = 20 } = req.query;
    const skip = (page - 1) * limit;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ success: false, message: 'Invalid user ID' });
    }

    const following = await Follow.find({ follower: userId, status: 'active' })
      .populate('following', 'name avatar bio')
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Follow.countDocuments({ follower: userId, status: 'active' });

    res.status(200).json({
      success: true,
      data: following.map(f => f.following),
      pagination: { page: parseInt(page), limit: parseInt(limit), total },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get Suggested Users
export const getSuggestedUsers = async (req, res) => {
  try {
    const userId = req.user.id;
    const { limit = 10 } = req.query;

    const following = await Follow.find({ follower: userId }).select('following');
    const followingIds = following.map(f => f.following.toString());

    const suggested = await User.find({
      _id: { $nin: [...followingIds, userId] },
    })
      .select('name avatar bio')
      .limit(parseInt(limit));

    res.status(200).json({
      success: true,
      data: suggested,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get User Dashboard Stats
export const getDashboardStats = async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await User.findById(userId);
    const poems = await Poem.find({ author: userId });
    const publishedPoems = poems.filter(p => p.published);
    const draftPoems = poems.filter(p => p.isDraft);

    const totalLikes = publishedPoems.reduce((sum, p) => sum + p.likeCount, 0);
    const totalComments = publishedPoems.reduce((sum, p) => sum + p.commentCount, 0);
    const totalViews = publishedPoems.reduce((sum, p) => sum + p.views, 0);

    res.status(200).json({
      success: true,
      data: {
        totalPoems: publishedPoems.length,
        totalDrafts: draftPoems.length,
        totalLikes,
        totalComments,
        totalViews,
        followers: user.totalFollowers,
        following: user.totalFollowing,
        premium: user.premium,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Search Users
export const searchUsers = async (req, res) => {
  try {
    const { q } = req.query;

    if (!q) {
      return res.status(400).json({ success: false, message: 'Search query is required' });
    }

    const users = await User.find({
      $or: [
        { name: { $regex: q, $options: 'i' } },
        { email: { $regex: q, $options: 'i' } },
      ],
    })
      .select('name avatar bio')
      .limit(10);

    res.status(200).json({
      success: true,
      data: users,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

