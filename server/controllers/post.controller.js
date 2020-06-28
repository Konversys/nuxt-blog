const Post = require("../models/user.model");

module.exports.create = async (req, res) => {
  const post = new Post({
    title: req.body.title,
    text: req.body.text,
    imageUrl: `/${req.body.filename}`
  });

  try {
    await post.save();
    res.status(201).json(post);
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports.getAll = async (req, res) => {
  try {
    const posts = await Post.find().sort({ data: -1 });
    req.json(posts);
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports.getById = async (req, res) => {
  try {
    await Post.findById(req.params.id)
      .populate("comments")
      .exec((error, post) => {
        res.json(post);
      });
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports.update = async (req, res) => {
  const $set = {
    text: req.body.text
  };

  try {
    const post = await Post.findByIdAndUpdate(
      {
        _id: req.params.id
      },
      { $set }
    );
    res.json(post);
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports.remove = async (req, res) => {
  try {
    await Post.deleteOne({ _id: req.params.id });
    res.json({ message: "Пост удален" });
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports.addView = async (req, res) => {
  const $set = {
    views: ++req.body.views
  };
  try {
    await Post.findOneAndUpdate({ _id: req.params.id }, { $set });
    res.status(204).json();
  } catch (error) {
    res.status(500).json(error);
  }
};
