const main_db = require("../../model");

const GetGajiDetails = async (req, res) => {
  const { IGM, KID } = req.params;
  try {
    const result = await main_db.gajianDetail.findOne({
      where: {
        id_gaji_master: IGM,
        karyawan_id: KID,
      },
    });

    if (!result) {
      return res.status(404).json({
        code: 404,
        success: false,
        message: "Detail Gaji Not Found",
      });
    }

    return res.status(200).json({
      code: 200,
      success: true,
      data: result,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

module.exports = GetGajiDetails;
