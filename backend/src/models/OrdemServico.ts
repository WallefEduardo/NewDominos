import {
  Model,
  Table,
  Column,
  DataType,
  PrimaryKey,
  Default,
  CreatedAt,
  UpdatedAt,
} from 'sequelize-typescript';

@Table({
  tableName: 'OrdemServicos',
  timestamps: true,
})
export default class OrdemServico extends Model {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  id!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  numOS!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  cliente!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  descricao!: string;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  colaboradorIds!: string;

  @Column({
    type: DataType.DATEONLY, // Usando DATEONLY para datas
    allowNull: false,
  })
  dataInicio!: string; // Armazenando como string

  @Column({
    type: DataType.DATEONLY, // Usando DATEONLY para datas
    allowNull: false,
  })
  dataTermino!: string; // Armazenando como string

  @Column({
    type: DataType.TIME,
    allowNull: false,
  })
  horaInicio!: string;

  @Column({
    type: DataType.TIME,
    allowNull: false,
  })
  horaTermino!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    defaultValue: 'Aguardando'
  })
  status!: string;

  @CreatedAt
  @Column({
    type: DataType.DATE,
  })
  createdAt!: Date;

  @UpdatedAt
  @Column({
    type: DataType.DATE,
  })
  updatedAt!: Date;
}
