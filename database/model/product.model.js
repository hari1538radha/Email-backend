import seqalize from "../sql/sql.js";
import { DataTypes } from "sequelize";

const product_model = seqalize.define(
  "product_sql",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    discription: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  { timestamps: true, createdAt: true, updatedAt: true }
);

export default product_model;
