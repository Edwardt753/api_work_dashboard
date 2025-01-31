const main_db = require("../../model");

const EditDataHarian = async (req, res) => {
  //Id_Gajian_Master & Karyawan ID
  const { IGM, KID } = req.params;
  const { harian_data } = req.body;
  let total_waktu =
    harian_data.senin +
    harian_data.selasa +
    harian_data.rabu +
    harian_data.kamis +
    harian_data.jumat +
    harian_data.sabtu +
    harian_data.minggu;

  try {
    const result = await main_db.gajianDetail.update(
      {
        total_waktu: total_waktu,
        harian_data: harian_data,
      },
      {
        where: {
          id_gaji_master: IGM,
          karyawan_id: KID,
        },
      }
    );

    if (!result) {
      return res.status(404).json({
        code: 404,
        success: false,
        message: "Detail Gaji Not Found",
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

module.exports = EditDataHarian;
