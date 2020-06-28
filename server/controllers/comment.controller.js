const Comment = require("../models/comment.model");
const Post = require("../models/post.model");

module.exports.create = async (req, res) => {
  try {
    const { name, text, postId } = req.body;
    const comment = new Comment({
      name,
      text,
      postId
    });

    await comment.save();

    const post = await Post.findOne({ _id: comment.postId });
    post.comments.push(comment);

    await post.save();
    res.status(201).json(comment);
  } catch (error) {
    res.status(500).json(error);
  }
};
