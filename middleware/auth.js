const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

exports.authToken = async (req, res, next) => {
  const token = req.header("x-auth-token");
  if (!token)
    return res.status(401).send({ msg: "Unauthorized: Token not found" });

  try {
    req.body.tokenData = jwt.verify(token, process.env.SECRET_KEY);
    next();
  } catch (err) {
    console.log(err);
    res.status(401).send({ msg: "Unauthorized: Invalid token" });
  }
};
