module.exports = (sequelize, DataTypes) => {
  const karyawan = sequelize.define(
    "karyawan",
    {
      id: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
      },
      fullname: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      gender: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      tingkat_gaji: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      freezeTableName: true,
      underscored: true,
      paranoid: true, //--Soft delete feature
      deletedAt: "status",
    }
  );

  karyawan.associate = (models) => {
    karyawan.belongsTo(models.tingkatgajiMaster, {
      foreignKey: "tingkat_gaji",
      as: "tingkatGaji", // Alias as a string
    });
    karyawan.hasMany(models.gajianDetail, {
      foreignKey: "id",
      as: "gajiDetail", // Alias as a string
    });
  };

  // karyawan.associate = (models) => {
  //   karyawan.hasMany(models.gajianDetail, {
  //     foreignKey: "id",
  //     as: "gajiDetail", // Alias as a string
  //   });
  // };

  return karyawan;
};
