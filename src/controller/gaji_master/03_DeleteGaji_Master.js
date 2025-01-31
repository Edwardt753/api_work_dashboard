const main_db = require("../../model");

const DeleteGajiMaster = async (req, res) => {
  const { id } = req.params;

  try {
    const checkData = await main_db.gajianMaster.findOne({
      where: {
        id: id,
        status: null,
      },
    });

    if (!checkData) {
      return res.status(404).json({
        code: 404,
        message: "Data Not Found",
        data: null,
      });
    }

    await main_db.gajianMaster.destroy({
      where: {
        id: id,
      },
    });

    return res.status(204).json({
      success: true,
      message: "Data berhasil di delete",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

module.exports = DeleteGajiMaster;
