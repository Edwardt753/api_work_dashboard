const db = require("../../model/index");
const karyawanModels = db.karyawan;

async function AddKaryawan(req, res) {
  const { fullname, gender, tingkat_gaji } = req.body;
  try {
    const result = await karyawanModels.create({
      fullname: fullname,
      gender: gender,
      tingkat_gaji: tingkat_gaji,
    });

    return res.status(201).json({
      success: true,
      message: "Karyawan berhasil ditambahkan",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
}

module.exports = AddKaryawan;
