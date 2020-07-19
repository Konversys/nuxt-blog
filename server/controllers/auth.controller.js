const bcrypt = require("bcrypt-nodejs");
const jwt = require("jsonwebtoken");
const keys = require("../keys");
const User = require("../models/user.model");

module.exports.login = async (req, res) => {
  const candidate = await User.findOne({
    login: req.body.login
  });
  if (candidate && candidate.role === "admin") {
    const isPasswordCorrect = bcrypt.compareSync(
      req.body.password,
      candidate.password
    );
    if (isPasswordCorrect) {
      const token = jwt.sign(
        {
          login: candidate.login,
          userId: candidate._id
        },
        keys.JWT,
        { expiresIn: 60 * 60 } // час жизни
      );
      res.json({ token });
    } else {
      res.status(401).json({ message: "Пароль не верный" }); // на проде = дыра в безопасности
    }
  } else {
    res.status(404).json({ message: "Пользователь не найден" });
  }
};

module.exports.createUser = async (req, res) => {
  try {
    const candidate = await User.findOne({
      login: req.body.login
    });
    if (candidate) {
      res.status(409).json({ message: "Пользователь уже существует" });
    } else {
      const salt = bcrypt.genSaltSync(10);
      const { login, password, role } = req.body;
      const user = new User({
        login,
        password: bcrypt.hashSync(password, salt),
        role
      });

      await user.save();
      res.status(201).json(user);
    }
  } catch (error) {
    res.status(500).json(error);
  }
};
