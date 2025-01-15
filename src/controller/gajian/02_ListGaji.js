const main_db = require("../../model");

const ListKaryawanGajiID = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await main_db.gajianDetail.findAll({
      where: {
        id_gaji_master: id,
      },
    });

    // console.log("result : ", result);

    //conditional for findAll are stored in object or array so need to check length
    if (!result || result.length === 0) {
      return res.status(404).json({
        success: false,
        code: 404,
        message: "Data not found",
      });
    }

    return res.status(200).json({
      success: true,
      code: 200,
      message: result,
    });
  } catch (error) {
    // console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

module.exports = ListKaryawanGajiID;
