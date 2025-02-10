const jwt = require("jsonwebtoken");
const main_db = require("../model/index");

const isLogOut = async (req, res) => {
  const token = req.headers["authorization"];

  if (!token) {
    return res.status(401).json({
      error: "Unauthorized: No token provided",
    });
  }
  const parseToken = token.split(" ")[1];
  const secret_token = process.env.ACCESS_TOKEN_SECRET;

  try {
    if (!parseToken) {
      return res.status(401).json({
        error: "Unauthorized: No token provided",
      });
    }

    let payload;
    try {
      payload = jwt.verify(parseToken, secret_token);
    } catch (error) {
      if (error instanceof jwt.TokenExpiredError) {
        return res.status(401).json({
          error: "Unauthorized: Token has expired",
        });
      } else if (error instanceof jwt.JsonWebTokenError) {
        return res.status(401).json({
          error: "Unauthorized: Invalid token",
        });
      } else if (error instanceof jwt.NotBeforeError) {
        return res.status(401).json({
          error: "Unauthorized: Token not active yet",
        });
      } else {
        return res.status(500).json({
          error: "Internal server error during token verification",
        });
      }
    }

    // console.log("payload :", payload);

    const checkCookie = await main_db.adminUser.findOne({
      where: {
        id: payload.id,
        username: payload.username,
      },
    });

    if (!checkCookie) {
      return res.status(401).json({
        error: "Unauthorized: Wrong Token Data",
      });
    }

    return res.clearCookie("refreshtoken").status(200).json({
      code: 200,
      success: true,
      message: "Berhasil Log Out",
    });
  } catch (error) {
    console.error("Unexpected Error:", error);
    return res.status(500).json({
      status: false,
      message: "Internal server error",
    });
  }
};

module.exports = isLogOut;
