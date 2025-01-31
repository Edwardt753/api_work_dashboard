const main_db = require("../../model");

const DeleteHarianKaryawan = async (req, res) => {
  const { IGM, KID } = req.params;
  try {
    const CheckKaryawan = await main_db.gajianDetail.findOne({
      where: {
        id_gaji_master: IGM,
        karyawan_id: KID,
      },
    });

    if (!CheckKaryawan) {
      return res.status(404).json({
        code: 404,
        success: false,
        message: "Data Karyawan Tidak Ditemukan!",
      });
    }

    await main_db.gajianDetail.destroy({
      where: {
        id_gaji_master: IGM,
        karyawan_id: KID,
      },
    });

    return res.status(204).json({
      code: 204,
      success: true,
      message: "Data Berhasil Dihapus",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

module.exports = DeleteHarianKaryawan;
