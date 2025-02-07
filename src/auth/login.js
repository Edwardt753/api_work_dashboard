const jwt = require("jsonwebtoken");
const db = require("../model/index");
const bcrypt = require("bcrypt");
const main_db = require("../model/index");

const isLogin = async (req, res) => {
  const body = req.body;
  const { username, password } = body;

  try {
    //bisa pindah ke validator
    if (!username || !password) {
      return res.status(400).json({
        status: false,
        message: "need to write username and password",
      });
    }

    //check if username exist in database
    const CheckUser = await db.adminUser.findOne({
      where: {
        username: username,
      },
    });

    //verif passowrd login, return true or false
    const checkPass = await bcrypt.compare(password, CheckUser.password);

    if (!CheckUser || !checkPass) {
      return res.status(400).json({
        code: 400,
        success: false,
        message: "invalid authentication data",
      });
    }

    const secret_token = process.env.ACCESS_TOKEN_SECRET;
    const payload = {
      id: CheckUser.id,
      username: CheckUser.username,
      name: CheckUser.fullname,
    };

    const access_token = jwt.sign(
      {
        ...payload,
        exp: Math.floor(Date.now() / 20), //20 seconds expire time
      },
      secret_token
    );

    const refresh_token = jwt.sign(
      {
        ...payload,
        exp: Math.floor((Date.now() / 24) * 60 * 60), //20 seconds expire time
      },
      secret_token
    );

    //assign token to db
    await main_db.adminUser.update(
      {
        token: refresh_token,
      },
      {
        where: {
          id: CheckUser.id,
        },
      }
    );

    res.cookie("refreshtoken", refresh_token, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 10, //set cookie duration
    });

    return res.json({
      code: 200,
      success: true,
      message: "Login successful",
      token: access_token,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: false,
      message: "Internal server error",
    });
  }
};

module.exports = isLogin;
