import {
    Table,
    Column,
    CreatedAt,
    UpdatedAt,
    Model,
    PrimaryKey,
    AutoIncrement,
  } from 'sequelize-typescript';
  
  @Table({
    tableName: 'Classificacoes',
  })
  class Classificacao extends Model<Classificacao> {
    @PrimaryKey
    @AutoIncrement
    @Column
    id: number;
  
    @Column
    name: string;
  
    @CreatedAt
    createdAt: Date;
  
    @UpdatedAt
    updatedAt: Date;
  }
  
  export { Classificacao };
  