const db = require("../../model");

const DetailKaryawan = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await db.karyawan.findOne({
      where: {
        id: id,
        status: null,
      },
    });

    if (!result) {
      console.log(result);
      return res.status(404).json({
        code: 404,
        message: "Data Karyawan Not Found",
        data: false,
      });
    }

    return res.status(200).json({
      code: 200,
      message: "Data ditemukan",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

module.exports = DetailKaryawan;
