const main_db = require("../../model");

const AddGaji = async (req, res) => {
  const { karyawan_id, harian_data } = req.body;
  // console.log("harian data :", harian_data);
  const { id } = req.params;

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
    const KaryawanWithGaji = await main_db.karyawan.findOne(
      {
        include: [{ model: main_db.tingkatgajiMaster, as: "tingkatGaji" }],
      },
      {
        where: {
          karyawan_id: karyawan_id,
        },
      }
    );

    // console.log(KaryawanWithGaji.tingkatGaji);

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

module.exports = AddGaji;
