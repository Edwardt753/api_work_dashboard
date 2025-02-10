const isLogOut = async (req, res) => {
  try {
    res.clearCookie("refreshtoken", {
      httpOnly: true, // Matches the original setting
    });

    return res.status(200).json({
      message: "Berhasil Logout",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: false,
      message: "Internal server error",
    });
  }
};

module.exports = isLogOut;
