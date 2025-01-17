const main_db = require("../../model");

const CalculateTotalGaji = async (req, res) => {
  const { id } = req.params;

  //   const getValue = Object.values(sum_data);
  //   if (!getValue.every((value) => typeof value === "number")) {
  //     return res.status(400).json({
  //       code: 400,
  //       message: "Value harus number",
  //       data: null,
  //     });
  //   }

  //looping making array into 1 output
  //receive 2 input, |currentvalue| and |the array 1 by 1|
  //   const sum_value = getValue.reduce((total = 0, num) => total + num);

  try {
    //THIS RETEURN ARRAY OF OBJECT
    const getValue2 = await main_db.gajianDetail.findAll({
      where: {
        id_gaji_master: id,
      },
      attributes: ["gaji_personal"],
    });

    const newSumValue = getValue2.reduce(
      (total, item) => total + item.dataValues.gaji_personal,
      0
    );

    await main_db.gajianMaster.update(
      {
        total_gaji: newSumValue,
      },
      {
        where: {
          id: id,
        },
      }
    );

    return res.status(200).json({
      success: true,
      code: 200,
      data: newSumValue,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

module.exports = CalculateTotalGaji;
