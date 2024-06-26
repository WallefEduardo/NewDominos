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
import { Origem } from './Origem';
import { Classificacao } from './Classificacao';

@Table({
  tableName: 'Declinios',
})
class Declinio extends Model<Declinio> {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @ForeignKey(() => Motivo)
  @Column
  motivoId: number;

  @ForeignKey(() => Origem)
  @Column
  origemId: number;

  @ForeignKey(() => Classificacao)
  @Column
  classificacaoId: number;

  @Column
  observacao: string;

  @CreatedAt
  createdAt: Date;

  @UpdatedAt
  updatedAt: Date;

  @BelongsTo(() => Motivo)
  motivo: Motivo;

  @BelongsTo(() => Origem)
  origem: Origem;

  @BelongsTo(() => Classificacao)
  classificacao: Classificacao;
}

export { Declinio };