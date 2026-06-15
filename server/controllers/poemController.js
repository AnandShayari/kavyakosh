import Poem from '../models/Poem.js';
import User from '../models/User.js';
import Comment from '../models/Comment.js';
import Review from '../models/Review.js';
import Like from '../models/Like.js';
import mongoose from 'mongoose';

// Create Poem
export const createPoem = async (req, res) => {
  try {
    const { title, content, mood, language, theme, tags, category, coverImage } = req.body;
    const userId = req.user.id;

    if (!title || !content) {
      return res.status(400).json({ success: false, message: 'Title and content are required' });
    }

    const poem = await Poem.create({
      author: userId,
      title,
      content,
      mood: mood || 'Reflective',
      language: language || 'English',
      theme,
      tags: tags || [],
      category: category || 'Poem',
      coverImage,
      published: false,
      isDraft: false,
    });

    await poem.populate('author', 'name avatar');

    res.status(201).json({
      success: true,
      message: 'Poem created successfully',
      data: poem,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get All Poems (with pagination)
export const getAllPoems = async (req, res) => {
  try {
    const { page = 1, limit = 10, sort = '-createdAt', search, mood, language } = req.query;
    const skip = (page - 1) * limit;

    let filter = { published: true, isArchived: false };

    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { content: { $regex: search, $options: 'i' } },
        { tags: { $in: [new RegExp(search, 'i')] } },
      ];
    }

    if (mood) filter.mood = mood;
    if (language) filter.language = language;

    const poems = await Poem.find(filter)
      .populate('author', 'name avatar email')
      .sort(sort)
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Poem.countDocuments(filter);
    const pages = Math.ceil(total / limit);

    res.status(200).json({
      success: true,
      data: poems,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get Single Poem
export const getPoem = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: 'Invalid poem ID' });
    }

    const poem = await Poem.findByIdAndUpdate(
      id,
      { $inc: { views: 1 } },
      { new: true }
    )
      .populate('author', 'name avatar bio followers')
      .populate({
        path: 'comments',
        populate: { path: 'author', select: 'name avatar' },
      })
      .populate({
        path: 'reviews',
        populate: { path: 'reviewer', select: 'name avatar' },
      });

    if (!poem) {
      return res.status(404).json({ success: false, message: 'Poem not found' });
    }

    res.status(200).json({
      success: true,
      data: poem,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get User's Poems
export const getUserPoems = async (req, res) => {
  try {
    const { userId } = req.params;
    const { page = 1, limit = 10 } = req.query;
    const skip = (page - 1) * limit;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ success: false, message: 'Invalid user ID' });
    }

    const poems = await Poem.find({ author: userId, published: true })
      .sort('-createdAt')
      .skip(skip)
      .limit(parseInt(limit))
      .populate('author', 'name avatar');

    const total = await Poem.countDocuments({ author: userId, published: true });
    const pages = Math.ceil(total / limit);

    res.status(200).json({
      success: true,
      data: poems,
      pagination: { page: parseInt(page), limit: parseInt(limit), total, pages },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update Poem
export const updatePoem = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content, mood, language, theme, tags, category, coverImage } = req.body;
    const userId = req.user.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: 'Invalid poem ID' });
    }

    const poem = await Poem.findById(id);
    if (!poem) {
      return res.status(404).json({ success: false, message: 'Poem not found' });
    }

    if (poem.author.toString() !== userId) {
      return res.status(403).json({ success: false, message: 'Not authorized to update this poem' });
    }

    const updatedPoem = await Poem.findByIdAndUpdate(
      id,
      { title, content, mood, language, theme, tags, category, coverImage },
      { new: true }
    ).populate('author', 'name avatar');

    res.status(200).json({
      success: true,
      message: 'Poem updated successfully',
      data: updatedPoem,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Publish Poem
export const publishPoem = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: 'Invalid poem ID' });
    }

    const poem = await Poem.findById(id);
    if (!poem) {
      return res.status(404).json({ success: false, message: 'Poem not found' });
    }

    if (poem.author.toString() !== userId) {
      return res.status(403).json({ success: false, message: 'Not authorized' });
    }

    poem.published = true;
    poem.isDraft = false;
    poem.publishedDate = new Date();
    await poem.save();

    // Update user stats
    await User.findByIdAndUpdate(userId, { $inc: { totalPoems: 1 } });

    res.status(200).json({
      success: true,
      message: 'Poem published successfully',
      data: poem,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete Poem
export const deletePoem = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: 'Invalid poem ID' });
    }

    const poem = await Poem.findById(id);
    if (!poem) {
      return res.status(404).json({ success: false, message: 'Poem not found' });
    }

    if (poem.author.toString() !== userId && req.user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Not authorized' });
    }

    await Poem.findByIdAndDelete(id);
    await Comment.deleteMany({ poem: id });
    await Review.deleteMany({ poem: id });
    await Like.deleteMany({ poem: id });

    res.status(200).json({
      success: true,
      message: 'Poem deleted successfully',
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Like Poem
export const likePoem = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: 'Invalid poem ID' });
    }

    const poem = await Poem.findById(id);
    if (!poem) {
      return res.status(404).json({ success: false, message: 'Poem not found' });
    }

    // Check if already liked
    const existingLike = await Like.findOne({ poem: id, user: userId });
    if (existingLike) {
      return res.status(400).json({ success: false, message: 'Already liked' });
    }

    await Like.create({ poem: id, user: userId });
    poem.likeCount = (poem.likeCount || 0) + 1;
    poem.likes.push(userId);
    await poem.save();

    // Update user stats
    await User.findByIdAndUpdate(poem.author, { $inc: { totalLikes: 1 } });

    res.status(200).json({
      success: true,
      message: 'Poem liked successfully',
      data: { likeCount: poem.likeCount },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Unlike Poem
export const unlikePoem = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: 'Invalid poem ID' });
    }

    const poem = await Poem.findById(id);
    if (!poem) {
      return res.status(404).json({ success: false, message: 'Poem not found' });
    }

    const like = await Like.findOneAndDelete({ poem: id, user: userId });
    if (!like) {
      return res.status(400).json({ success: false, message: 'Not liked' });
    }

    poem.likeCount = Math.max(0, (poem.likeCount || 1) - 1);
    poem.likes = poem.likes.filter(id => id.toString() !== userId);
    await poem.save();

    res.status(200).json({
      success: true,
      message: 'Like removed successfully',
      data: { likeCount: poem.likeCount },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Save Poem
export const savePoem = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: 'Invalid poem ID' });
    }

    const poem = await Poem.findById(id);
    if (!poem) {
      return res.status(404).json({ success: false, message: 'Poem not found' });
    }

    if (poem.saves.includes(userId)) {
      return res.status(400).json({ success: false, message: 'Already saved' });
    }

    poem.saves.push(userId);
    poem.saveCount = (poem.saveCount || 0) + 1;
    await poem.save();

    await User.findByIdAndUpdate(userId, { $addToSet: { favorites: id } });

    res.status(200).json({
      success: true,
      message: 'Poem saved successfully',
      data: { saveCount: poem.saveCount },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Unsave Poem
export const unsavePoem = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: 'Invalid poem ID' });
    }

    const poem = await Poem.findById(id);
    if (!poem) {
      return res.status(404).json({ success: false, message: 'Poem not found' });
    }

    poem.saves = poem.saves.filter(id => id.toString() !== userId);
    poem.saveCount = Math.max(0, (poem.saveCount || 1) - 1);
    await poem.save();

    await User.findByIdAndUpdate(userId, { $pull: { favorites: id } });

    res.status(200).json({
      success: true,
      message: 'Save removed successfully',
      data: { saveCount: poem.saveCount },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get Trending Poems
export const getTrendingPoems = async (req, res) => {
  try {
    const { limit = 10 } = req.query;

    const poems = await Poem.find({ published: true })
      .sort({ likeCount: -1, views: -1 })
      .limit(parseInt(limit))
      .populate('author', 'name avatar');

    res.status(200).json({
      success: true,
      data: poems,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Search Poems
export const searchPoems = async (req, res) => {
  try {
    const { q, mood, language, tag, page = 1, limit = 10 } = req.query;
    const skip = (page - 1) * limit;

    let filter = { published: true };

    if (q) {
      filter.$or = [
        { title: { $regex: q, $options: 'i' } },
        { content: { $regex: q, $options: 'i' } },
      ];
    }

    if (mood) filter.mood = mood;
    if (language) filter.language = language;
    if (tag) filter.tags = { $in: [new RegExp(tag, 'i')] };

    const poems = await Poem.find(filter)
      .sort('-createdAt')
      .skip(skip)
      .limit(parseInt(limit))
      .populate('author', 'name avatar');

    const total = await Poem.countDocuments(filter);
    const pages = Math.ceil(total / limit);

    res.status(200).json({
      success: true,
      data: poems,
      pagination: { page: parseInt(page), limit: parseInt(limit), total, pages },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

