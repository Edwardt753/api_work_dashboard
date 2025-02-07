const main_db = require("../../model");

const AddNewKategory = async (req, res) => {
  const { nominal } = req.body;
  try {
    const result = await main_db.tingkatgajiMaster.create({
      harga_tingkat: nominal,
    });

    return res.status(201).json({
      code: 201,
      success: true,
      message: "Sukses menambahkan data",
      data: result,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

module.exports = AddNewKategory;
