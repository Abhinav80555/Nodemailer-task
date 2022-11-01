const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connection = require("./db");
const userRoutes = require("./routes/userRoutes");
const auth = require("./middleware/auth");

//db connection
connection();

//middlewares
const app = express();
app.use(express.json());
app.use(cors());

dotenv.config();

//API's
app.post("/signup", userRoutes.signup);
app.post("/login", userRoutes.login);
app.post("/mailsend", auth.authToken, userRoutes.sendEmail);
app.put("/forgetpassword", userRoutes.forgetPassword);

// Common call
app.get("/", async (req, res) => {
  res.status(200).send("App running successfully!!");
});
const port = process.env.PORT || 8055;
app.listen(port, console.log(`Listening on port ${port}...`));
