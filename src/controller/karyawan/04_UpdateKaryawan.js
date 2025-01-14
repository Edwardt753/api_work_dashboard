const db = require("../../model");

const UpdateKaryawan = async (req, res) => {
  const { id } = req.params;
  const { fullname, gender, tingkat_gaji } = req.body;
  try {
    const CheckKaryawan = await db.karyawan.findOne({
      where: {
        id: id,
        status: null,
      },
    });

    if (!CheckKaryawan) {
      return res.status(404).json({
        code: 404,
        message: "Data Karyawan Not Found",
        data: false,
      });
    }

    await db.karyawan.update(
      {
        fullname: fullname,
        gender: gender,
        tingkat_gaji: tingkat_gaji,
      },
      {
        where: {
          id: id,
        },
      }
    );

    const payload = {
      ...CheckKaryawan.toJSON(),
      fullname: fullname || CheckKaryawan.fullname,
      gender: gender || CheckKaryawan.gender,
      tingkat_gaji: tingkat_gaji || CheckKaryawan.tingkat_gaji,
    };

    return res.status(200).json({
      success: true,
      message: "Karyawan Berhasil di update",
      data: payload,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

module.exports = UpdateKaryawan;
