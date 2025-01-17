module.exports = (sequelize, DataTypes) => {
  const gajianDetailModel = sequelize.define(
    "gajian_detail",
    {
      id: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
      },
      id_gaji_master: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      karyawan_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      harian_data: {
        type: DataTypes.JSON,
        allowNull: false,
      },
      total_waktu: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      gaji_personal: {
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

  return gajianDetailModel;
};
