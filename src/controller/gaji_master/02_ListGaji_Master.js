const main_db = require("../../model");

const ListGajiMaster = async (req, res) => {
  try {
    const result = await main_db.gajianMaster.findAll();

    return res.status(200).json({
      code: 200,
      success: true,
      data: result,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

module.exports = ListGajiMaster;
