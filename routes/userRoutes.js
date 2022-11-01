const { User, validate } = require("../models/UserModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const shortid = require("shortid");
const sendEmail = require("../utils/sendEmail");
const dotenv = require("dotenv");
dotenv.config();

//signup route
exports.signup = async (req, res) => {
  try {
    //validate the email and hash the password
    //then store it to DB

    const { error } = validate(req.body);
    if (error)
      return res.status(400).send({ message: error.details[0].message });

    let user = await User.findOne({ email: req.body.email });
    if (user)
      return res
        .status(409)
        .send({ message: "User with given email already Exist!" });

    const salt = await bcrypt.genSalt(Number(process.env.SALT));
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    user = await new User({ ...req.body, password: hashPassword }).save();

    res.send(user);
  } catch (err) {
    console.log(err);
    res.status(400).send({ msg: err.message });
  }
};

//login route
exports.login = async (req, res) => {
  try {
    // check user is exist or not,
    //if user exist provide token.

    const existUser = await User.findOne({ email: req.body.email });
    if (!existUser) return res.status(403).send({ msg: "User does not exist" });

    const isMatch = await bcrypt.compare(req.body.password, existUser.password);
    if (!isMatch) return res.status(403).send({ msg: "Incorrect Password" });

    const token = await jwt.sign({ ...existUser }, process.env.SECRET_KEY, {
      expiresIn: process.env.JWT_EXPIRY || "7d",
    });

    res.send(token);
  } catch (err) {
    console.log(err);
    res.status(400).send({ msg: err.message });
  }
};

//sending Email route
exports.sendEmail = async (req, res) => {
  try {
    //using nodemailer send the mail
    //send mail function code written in utils

    await sendEmail(req.body.email, req.body.subject, req.body.text);
    res.send({ msg: "mail sent successfully" });
  } catch (err) {
    res.status(403).send({ msg: err.message });
  }
};

//forget password
exports.forgetPassword = async (req, res) => {
  //check user exist or not,
  //if user exist send random password to user
  try {
    const existUser = await User.findOne({ email: req.body.email });
    if (!existUser) return res.status(403).send({ msg: "User does not exist" });

    const salt = await bcrypt.genSalt(Number(process.env.SALT));
    const randomPassword = shortid.generate();
    const password = await bcrypt.hash(randomPassword, salt);

    existUser.password = password;
    existUser.save();

    await sendEmail(
      existUser.email,
      "your new password",
      `your new password for upcoming logins = ${randomPassword}`
    );

    res.send({ msg: "mail sent successfully" });
  } catch (err) {
    res.status(403).send({ msg: err.message });
  }
};
