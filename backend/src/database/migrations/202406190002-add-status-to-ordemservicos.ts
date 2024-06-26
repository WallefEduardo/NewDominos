import { QueryInterface, DataTypes } from "sequelize";

export async function up(queryInterface: QueryInterface) {
  await queryInterface.addColumn('OrdemServicos', 'status', {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'Aguardando'
  });
}

export async function down(queryInterface: QueryInterface) {
  await queryInterface.removeColumn('OrdemServicos', 'status');
}
