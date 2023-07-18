import seqalize from "../sql/sql.js";
import { DataTypes, UUIDV1 } from "sequelize";
const user_model = seqalize.define(
  "user",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: UUIDV1,
      unique: true,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      validate: {
        // is: [
        //   /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
        // ],
        isEmail: {           
          message: "enter the valid email",
        },
      },
      unique: true,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isAdmin: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
  },
  { freezeTableName: true, timestamps: true }
);
export default user_model;
