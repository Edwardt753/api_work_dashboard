const main_db = require("../../model");

const DeleteKategory = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await main_db.tingkatgajiMaster.destroy({
      where: {
        id: id,
      },
    });

    if (!result) {
      return res.status(404).json({
        code: 404,
        message: "Data tidak ditemukan",
        data: null,
      });
    }

    return res.status(200).json({
      code: 200,
      success: true,
      message: "Data berhasil dihapus",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

module.exports = DeleteKategory;
