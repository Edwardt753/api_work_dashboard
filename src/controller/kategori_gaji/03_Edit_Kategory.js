const main_db = require("../../model");

const EditKategory = async (req, res) => {
  const { id } = req.params;
  const { nominal } = req.body;
  try {
    const result = await main_db.tingkatgajiMaster.update(
      {
        harga_tingkat: nominal,
      },
      {
        where: {
          id: id,
        },
      }
    );

    if (!result) {
      return res.status(404).json({
        code: 404,
        message: "Data tidak ditemukan",
        data: null,
      });
    }

    return res.status(201).json({
      code: 201,
      success: true,
      message: "Sukses melakukan update data",
      data: result,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

module.exports = EditKategory;
