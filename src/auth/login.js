const jwt = require("jsonwebtoken");
const db = require("../model/index");
const bcrypt = require("bcrypt");

const isLogin = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      status: false,
      message: "need to write email and password",
    });
  }

  try {
    //check if email exist in database
    const checkEmail = await db.adminUser.findOne({
      where: {
        email: email,
      },
    });

    const checkPass = await bcrypt.compare(password, checkEmail.password);

    if (!checkEmail || !checkPass) {
      return res.status(400).json({
        status: false,
        message: "invalid email or password",
      });
    }

    const isToken = jwt.sign(checkEmail.email, process.env.ACCESS_TOKEN_SECRET);

    res.cookie("jwtToken", isToken, {
      httpOnly: true,
      //set cookie duration
      maxAge: 30 * 60 * 1000,
    });

    return res.json({
      code: 200,
      message: "Login successful",
      data: checkEmail.email,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: "Internal server error",
    });
  }
};

module.exports = isLogin;
