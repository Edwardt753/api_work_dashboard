const jwt = require("jsonwebtoken");
const db = require("../model/index");

const VerifLogin = async (req, res, next) => {
  const checkCookies = req.cookies.jwtToken;

  if (!checkCookies) {
    return res.status(401).json({
      error: "Unauthorized: No token provided",
    });
  }

  try {
  } catch (error) {}
};
