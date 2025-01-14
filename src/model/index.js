require("dotenv").config();
const dbConfig = require("./dbConfig");
const { Sequelize, DataTypes } = require("sequelize");

// Import models
const karyawanModel = require("./main_model/01_KaryawanModel");
const adminUserModel = require("./main_model/02_Admin_User");
const gajianMasterModel = require("./main_model/03_kategori_gaji");
const gajianDetailModel = require("./main_model/04_gaji_detail_model");

// Create Connection Between Sequelize and Database (--> MySQL)
const sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.username,
  dbConfig.password,
  dbConfig.options
);

// //Test Connection
// try {
//   sequelize.authenticate();
//   console.log("Connection has been established successfully.");
// } catch (error) {
//   console.error("Unable to connect to the database:", error);
// }

const main_db = {
  Sequelize: Sequelize,
  sequelize: sequelize,
  karyawan: karyawanModel(sequelize, DataTypes),
  adminUser: adminUserModel(sequelize, DataTypes),
  gajianMaster: gajianMasterModel(sequelize, DataTypes),
  gajianDetail: gajianDetailModel(sequelize, DataTypes),
};
// Synchronize Sequelize Model and Actual Datatables in SQL
main_db.sequelize
  .sync({ force: false })
  // .sync({ force: true }) // force sync --> remove old and create new
  //.sync({ alter: true }) // sync update --> update existing table only
  .then(async () => {
    console.log("Synchronization completed.");
    // Call seeder file to seed the database based on .env conditional
    if (process.env.SEED_DB === "TRUE") {
      const seeder = require("./seeder");
      await seeder.seedData(db);
      console.log("Seeder completed.");
    }
  });

module.exports = main_db;
