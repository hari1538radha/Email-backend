import { productModel } from "../mongodb.model/product.model.js";
import seqalize from "../sql/sql.js";
import { DataTypes } from "sequelize";
import user_model from "./user.model.js";
 const order_model = seqalize.define(
  "order",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      unique:true
    },
    product_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: productModel,
        key: "id",
      },
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: user_model,
        key: "username",
      },
    },
    order_Date: {
      type: DataTypes.DATE,
      values: Date.now(),
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1,
      },
    },
  },
  { timestamps: true, freezeTableName: true }
);
// order_model.belongsTo(productModel, { foreignKey: "id", as: "product_id" });
// order_model.belongsTo(user_model, { foreignKey: "id", as: "user_id" });

export default order_model