import {
  Table,
  Column,
  CreatedAt,
  UpdatedAt,
  Model,
  PrimaryKey,
  AutoIncrement,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { Motivo } from './Motivo';
import { Classificacao } from './Classificacao';

@Table({
  tableName: "Origens",
})
class Origem extends Model<Origem> {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @Column
  name: string;

  @ForeignKey(() => Motivo)
  @Column
  motivoId: number;

  @ForeignKey(() => Classificacao)
  @Column
  classificacaoId: number;

  @CreatedAt
  createdAt: Date;

  @UpdatedAt
  updatedAt: Date;

  @BelongsTo(() => Motivo, { foreignKey: 'motivoId', as: 'motivo' })
  motivo: Motivo;

  @BelongsTo(() => Classificacao, { foreignKey: 'classificacaoId', as: 'classificacao' })
  classificacao: Classificacao;
}

export { Origem };
