const main_db = require("../../model/index");

const ListKaryawan = async (req, res) => {
  try {
    const payload = await main_db.karyawan.findAll(); //paranoid:true(defaultnya true), jadi yang deletedAt exist gak show
    //if paranoid:false, munculin semua regardless deletedAt

    return res.status(200).json({
      success: true,
      data: payload,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

module.exports = ListKaryawan;
