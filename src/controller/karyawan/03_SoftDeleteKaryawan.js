const db = require("../../model");

const DeleteKaryawan = async (req, res) => {
  const { id } = req.params;
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

    await db.karyawan.destroy({
      where: {
        id: id,
      },
    });

    return res.status(204).json({
      success: true,
      message: "Karyawan berhasil di delete",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

module.exports = DeleteKaryawan;
