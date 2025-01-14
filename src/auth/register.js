const bcrypt = require("bcrypt");
const db = require("../model/index");

const IsRegister = async (req, res) => {
  const { fullname, email, password } = req.body;

  try {
    const [admin, created] = await db.adminUser.findOrCreate({
      where: {
        email: email,
      },
      defaults: {
        email: email,
        fullname: fullname,
        password: await bcrypt.hash(password, 10),
      },
    });

    console.log(admin);

    if (!created) {
      return res.status(404).json({
        code: 404,
        message: "Email already exist",
        status: false,
      });
    }

    return res.status(201).json({
      code: 201,
      message: "Success Create Account",
      payload: {
        id: admin.dataValues.id,
        email: admin.dataValues.email,
        fullname: admin.dataValues.fullname,
        created_at: admin.dataValues.createdAt,
        updated_at: admin.dataValues.updatedAt,
      },
    });
  } catch (error) {
    return res.status(400).json({
      status: false,
      message: "Email already exists!",
    });
  }
};

module.exports = IsRegister;
