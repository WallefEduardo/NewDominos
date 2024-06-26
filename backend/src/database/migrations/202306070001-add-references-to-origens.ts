import { QueryInterface, DataTypes } from 'sequelize';

module.exports = {
  up: async (queryInterface: QueryInterface) => {
    await queryInterface.addColumn('Origens', 'motivoId', {
      type: DataTypes.INTEGER,
      references: {
        model: 'Motivos',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
    });

    await queryInterface.addColumn('Origens', 'classificacaoId', {
      type: DataTypes.INTEGER,
      references: {
        model: 'Classificacoes',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
    });
  },

  down: async (queryInterface: QueryInterface) => {
    await queryInterface.removeColumn('Origens', 'motivoId');
    await queryInterface.removeColumn('Origens', 'classificacaoId');
  },
};
