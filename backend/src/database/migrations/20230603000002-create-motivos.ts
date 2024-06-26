import { DataTypes } from "sequelize";

module.exports = {
  up: async (queryInterface: any) => {
    await queryInterface.createTable("Motivos", {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false
      }
    });
  },
  down: async (queryInterface: any) => {
    await queryInterface.dropTable("Motivos");
  }
};
