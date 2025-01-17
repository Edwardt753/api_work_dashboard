const main_db = require("../../model");

const AddGajimaster = async (req, res) => {
  try {
    await main_db.gajianMaster.create({});

    return res.status(201).json({
      code: 201,
      success: true,
      message: "Successfully create data",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

module.exports = AddGajimaster;
