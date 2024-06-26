import { QueryInterface, DataTypes } from 'sequelize';

module.exports = {
  up: async (queryInterface: QueryInterface) => {
    await queryInterface.createTable('Declinios', {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      motivoId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Motivos', // Nome da tabela referenciada
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      origemId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Origens', // Nome da tabela referenciada
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      classificacaoId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Classificacoes', // Nome da tabela referenciada
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      observacao: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
    });
  },

  down: async (queryInterface: QueryInterface) => {
    await queryInterface.dropTable('Declinios');
  }
};