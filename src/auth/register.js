const bcrypt = require("bcrypt");
const main_db = require("../model/index");

const IsRegister = async (req, res) => {
  const body = req.body;
  const { username, fullname, password } = body;
  console.log(body);

  try {
    const CheckUsername = await main_db.adminUser.findOne({
      where: {
        username: username,
      },
    });
    console.log(CheckUsername);

    if (CheckUsername) {
      return res.status(404).json({
        code: 404,
        message: "username already exist",
        status: false,
      });
    }

    const CryptedPass = await bcrypt.hash(password, 4);

    const result = await main_db.adminUser.create({
      username: username,
      fullname: fullname,
      password: CryptedPass,
    });

    return res.status(201).json({
      code: 201,
      message: "Success Create Account",
      payload: {
        id: result.id,
        username: result.username,
        fullname: result.fullname,
        created_at: result.createdAt,
        updated_at: result.updatedAt,
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      status: false,
      message: "username already exists!",
    });
  }
};

module.exports = IsRegister;
