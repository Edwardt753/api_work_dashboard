module.exports = (sequelize, DataTypes) => {
  const tingkatgajiMaster = sequelize.define(
    "tingkat_gaji",
    {
      id: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
      },
      harga_tingkat: {
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

  tingkatgajiMaster.associate = (models) => {
    tingkatgajiMaster.hasMany(models.karyawan, {
      foreignKey: "tingkat_gaji", // Foreign key in the `karyawan` table
      as: "karyawanList", // Alias for reverse relationship
    });
  };

  return tingkatgajiMaster;
};
