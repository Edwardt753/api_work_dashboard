module.exports = (sequelize, DataTypes) => {
  const gajianMaster = sequelize.define(
    "gajian_master",
    {
      id: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
      },
      total_gaji: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      tanggal_gajian: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    },
    {
      freezeTableName: true,
      underscored: true,
      paranoid: true, //--Soft delete feature
      deletedAt: "status",
    }
  );

  return gajianMaster;
};
