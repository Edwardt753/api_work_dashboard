const main_db = require("../../model");

const GetAllKategory = async (req, res) => {
  try {
    const result = await main_db.tingkatgajiMaster.findAll();
    if (!result || result.length === 0) {
      return res.status(404).json({
        code: 404,
        message: "Error Fetching Tingkat Gaji Data",
        data: null,
      });
    }

    return res.status(200).json({
      code: 200,
      message: "Successfully getting data",
      data: result,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

module.exports = GetAllKategory;
