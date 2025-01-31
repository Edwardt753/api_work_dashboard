const main_db = require("../../model");
const { Sequelize } = require("sequelize");

const AddGajimaster = async (req, res) => {
  const { date } = req.body;

  try {
    //Check if data already exist on current date
    //cannot duplicate data on same date
    const checkData = await main_db.gajianMaster.findOne({
      where: Sequelize.where(
        Sequelize.fn("DATE", Sequelize.col("tanggal_gajian")),
        date
      ),
    });

    if (checkData) {
      return res.status(409).json({
        code: 409,
        message: "Data Already exist cannot add more",
        data: null,
      });
    }

    const result = await main_db.gajianMaster.create({
      tanggal_gajian: date,
    });

    return res.status(201).json({
      code: 201,
      success: true,
      message: "Successfully create data",
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

module.exports = AddGajimaster;
