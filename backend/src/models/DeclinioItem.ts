// src/models/DeclinioItem.ts

import {
    Table,
    Column,
    Model,
    PrimaryKey,
    AutoIncrement,
    CreatedAt,
    UpdatedAt,
    DataType,
    AllowNull
  } from 'sequelize-typescript';
  
  @Table
  class DeclinioItem extends Model<DeclinioItem> {
    @PrimaryKey
    @AutoIncrement
    @Column
    id: number;
  
    @AllowNull(false)
    @Column(DataType.STRING)
    motivo: string;
  
    @AllowNull(false)
    @Column(DataType.STRING)
    origem: string;
  
    @AllowNull(false)
    @Column(DataType.STRING)
    classificacao: string;
  
    @CreatedAt
    @Column
    createdAt: Date;
  
    @UpdatedAt
    @Column
    updatedAt: Date;
  }
  
  export default DeclinioItem;
  