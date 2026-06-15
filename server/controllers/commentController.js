import Comment from '../models/Comment.js';
import Poem from '../models/Poem.js';
import mongoose from 'mongoose';

// Add Comment
export const addComment = async (req, res) => {
  try {
    const { poemId } = req.params;
    const { text } = req.body;
    const userId = req.user.id;

    if (!text) {
      return res.status(400).json({ success: false, message: 'Comment text is required' });
    }

    if (!mongoose.Types.ObjectId.isValid(poemId)) {
      return res.status(400).json({ success: false, message: 'Invalid poem ID' });
    }

    const poem = await Poem.findById(poemId);
    if (!poem) {
      return res.status(404).json({ success: false, message: 'Poem not found' });
    }

    const comment = await Comment.create({
      poem: poemId,
      author: userId,
      text,
    });

    await comment.populate('author', 'name avatar');
    poem.comments.push(comment._id);
    poem.commentCount = (poem.commentCount || 0) + 1;
    await poem.save();

    res.status(201).json({
      success: true,
      message: 'Comment added successfully',
      data: comment,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get Comments
export const getComments = async (req, res) => {
  try {
    const { poemId } = req.params;
    const { page = 1, limit = 20 } = req.query;
    const skip = (page - 1) * limit;

    if (!mongoose.Types.ObjectId.isValid(poemId)) {
      return res.status(400).json({ success: false, message: 'Invalid poem ID' });
    }

    const comments = await Comment.find({ poem: poemId })
      .populate('author', 'name avatar')
      .populate('replies.author', 'name avatar')
      .sort('-createdAt')
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Comment.countDocuments({ poem: poemId });

    res.status(200).json({
      success: true,
      data: comments,
      pagination: { page: parseInt(page), limit: parseInt(limit), total },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update Comment
export const updateComment = async (req, res) => {
  try {
    const { commentId } = req.params;
    const { text } = req.body;
    const userId = req.user.id;

    if (!mongoose.Types.ObjectId.isValid(commentId)) {
      return res.status(400).json({ success: false, message: 'Invalid comment ID' });
    }

    const comment = await Comment.findById(commentId);
    if (!comment) {
      return res.status(404).json({ success: false, message: 'Comment not found' });
    }

    if (comment.author.toString() !== userId) {
      return res.status(403).json({ success: false, message: 'Not authorized' });
    }

    comment.text = text;
    await comment.save();
    await comment.populate('author', 'name avatar');

    res.status(200).json({
      success: true,
      message: 'Comment updated successfully',
      data: comment,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete Comment
export const deleteComment = async (req, res) => {
  try {
    const { commentId } = req.params;
    const userId = req.user.id;

    if (!mongoose.Types.ObjectId.isValid(commentId)) {
      return res.status(400).json({ success: false, message: 'Invalid comment ID' });
    }

    const comment = await Comment.findById(commentId);
    if (!comment) {
      return res.status(404).json({ success: false, message: 'Comment not found' });
    }

    if (comment.author.toString() !== userId && req.user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Not authorized' });
    }

    await Comment.findByIdAndDelete(commentId);
    await Poem.findByIdAndUpdate(comment.poem, { $inc: { commentCount: -1 } });

    res.status(200).json({
      success: true,
      message: 'Comment deleted successfully',
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Like Comment
export const likeComment = async (req, res) => {
  try {
    const { commentId } = req.params;
    const userId = req.user.id;

    const comment = await Comment.findById(commentId);
    if (!comment) {
      return res.status(404).json({ success: false, message: 'Comment not found' });
    }

    if (comment.likes.includes(userId)) {
      return res.status(400).json({ success: false, message: 'Already liked' });
    }

    comment.likes.push(userId);
    comment.likeCount = (comment.likeCount || 0) + 1;
    await comment.save();

    res.status(200).json({
      success: true,
      message: 'Comment liked',
      data: { likeCount: comment.likeCount },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Reply to Comment
export const replyToComment = async (req, res) => {
  try {
    const { commentId } = req.params;
    const { text } = req.body;
    const userId = req.user.id;

    if (!text) {
      return res.status(400).json({ success: false, message: 'Reply text is required' });
    }

    const comment = await Comment.findById(commentId);
    if (!comment) {
      return res.status(404).json({ success: false, message: 'Comment not found' });
    }

    comment.replies.push({
      author: userId,
      text,
      likes: [],
    });

    comment.replyCount = (comment.replyCount || 0) + 1;
    await comment.save();
    await comment.populate('replies.author', 'name avatar');

    res.status(201).json({
      success: true,
      message: 'Reply added',
      data: comment,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
