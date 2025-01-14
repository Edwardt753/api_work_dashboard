const main_db = require("../../model");

const AddGaji = async (req, res) => {
  const { karyawan_id, harian_data, total_waktu } = req.body;
  const id_gajian = req.params;

  try {
    const result = await main_db.gajianDetail.create({
      id_gajian: id_gajian,
      karyawan_id: karyawan_id,
      harian_data: harian_data,
      total_waktu: total_waktu,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

module.exports = AddGaji;
