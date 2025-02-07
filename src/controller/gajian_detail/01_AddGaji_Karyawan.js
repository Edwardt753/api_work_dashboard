const main_db = require("../../model");

const AddDataGajiHarian = async (req, res) => {
  const body = req.body;
  // console.log(body);
  const { karyawan_id, harian_data } = body;
  // console.log("harian data :", harian_data);
  const { id } = req.params;
  // console.log("karyawan id : ", karyawan_id);
  // console.log("gaji_master id : ", id);

  let total_waktu =
    harian_data.senin +
    harian_data.selasa +
    harian_data.rabu +
    harian_data.kamis +
    harian_data.jumat +
    harian_data.sabtu +
    harian_data.minggu;
  // console.log("total waktu :  ", total_waktu);

  try {
    const KaryawanWithGaji = await main_db.karyawan.findOne({
      include: [{ model: main_db.tingkatgajiMaster, as: "tingkatGaji" }],
      where: {
        id: karyawan_id,
      },
    });

    if (!KaryawanWithGaji) {
      return res.status(404).json({
        code: 404,
        message: "Data not found",
        data: false,
      });
    }

    //Check data, kalo id master dan karyawan exist maka error(tidak bisa double)
    const checkDouble = await main_db.gajianDetail.findOne({
      where: {
        karyawan_id: karyawan_id,
        id_gaji_master: id,
      },
    });

    if (checkDouble) {
      return res.status(400).json({
        code: 400,
        message: "Cannot input same karyawan data",
        data: false,
      });
    }

    // console.log(KaryawanWithGaji.tingkatGaji.dataValues);

    let total_gaji = total_waktu * KaryawanWithGaji.tingkatGaji.harga_tingkat;

    const result = await main_db.gajianDetail.create({
      id_gaji_master: id,
      karyawan_id: karyawan_id,
      total_waktu: total_waktu,
      harian_data: harian_data,
      gaji_personal: total_gaji,
    });

    return res.status(200).json({
      success: true,
      code: 200,
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

module.exports = AddDataGajiHarian;
