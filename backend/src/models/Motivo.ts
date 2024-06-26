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
    tableName: 'Motivos',
  })
  class Motivo extends Model<Motivo> {
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
  
  export { Motivo };
  