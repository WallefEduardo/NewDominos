import { QueryInterface, DataTypes } from "sequelize";

export async function up(queryInterface: QueryInterface) {
  await queryInterface.createTable('OrdemServicos', {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    numOS: {
      type: DataTypes.STRING,
      allowNull: false
    },
    cliente: {
      type: DataTypes.STRING,
      allowNull: false
    },
    descricao: {
      type: DataTypes.STRING,
      allowNull: false
    },
    colaboradorId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'Colaboradores',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    },
    dataInicio: {
      type: DataTypes.DATE,
      allowNull: false
    },
    dataTermino: {
      type: DataTypes.DATE,
      allowNull: false
    },
    horaInicio: {
      type: DataTypes.TIME,
      allowNull: false
    },
    horaTermino: {
      type: DataTypes.TIME,
      allowNull: false
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    }
  });
}

export async function down(queryInterface: QueryInterface) {
  await queryInterface.dropTable('OrdemServicos');
}
