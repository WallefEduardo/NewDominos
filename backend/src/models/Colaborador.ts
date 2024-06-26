// backend/src/models/Colaborador.ts

import {
  Model,
  Table,
  Column,
  DataType,
  PrimaryKey,
  Default,
  CreatedAt,
  UpdatedAt
} from 'sequelize-typescript';

@Table({
  tableName: 'Colaboradores',
  timestamps: true
})
export default class Colaborador extends Model {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column({
    type: DataType.UUID,
    allowNull: false
  })
  id!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  nome!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  genero!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  funcao!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  setor!: string;

  @Column({
    type: DataType.STRING,
    allowNull: true
  })
  foto!: string;

  @CreatedAt
  @Column({ type: DataType.DATE })
  createdAt!: Date;

  @UpdatedAt
  @Column({ type: DataType.DATE })
  updatedAt!: Date;
}
