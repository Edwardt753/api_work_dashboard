const main_db = require("../model");
const jwt = require("jsonwebtoken");

const refreshToken = async (req, res) => {
  const GetToken = req.cookies.refreshtoken;

  const secret_token = process.env.ACCESS_TOKEN_SECRET;
  try {
    if (!GetToken) {
      return res.status(401).json({
        error: "Unauthorized: No token provided/Missing",
      });
    }

    const checkToken = await main_db.adminUser.findOne({
      where: {
        token: GetToken,
      },
    });

    // console.log(checkToken);
    if (!checkToken) {
      return res.status(401).json({
        error: "Unauthorized: Wrong Token",
      });
    }

    const payload = jwt.verify(GetToken, secret_token);

    const acessToken = jwt.sign(
      {
        ...payload,
        exp: Math.floor(Date.now() / 20), //20 seconds expire time
      },
      secret_token
    );

    return res.status(200).json({
      token: acessToken,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: false,
      message: "Internal server error",
    });
  }
};

module.exports = refreshToken;
