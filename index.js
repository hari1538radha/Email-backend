import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import mainRoute from "./Routes/main_routes.js";
import protectedRoute from "./Routes/user_auth.js";
import userRoute from "./Routes/user_router.js";
import { MongoUrl } from "./database/mongo_db.config.js";
import mongoose from "mongoose";
import seqalize from "./database/sql/sql.js";
import { Sequelize } from "sequelize";
import product_model from "./database/model/product.model.js";
const app = express();
//middleware for server
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json());
//ENV
const port = process.env.PORT;
app.use("/api", mainRoute);
app.use("/user", userRoute);
app.use("/auth", protectedRoute);
//Mongoose connection

mongoose
  .connect(MongoUrl, {
    useNewUrlParser: true,
    useUnifiedtopology: true,
  })
  .then(() => {
    seqalize
      .authenticate()
      .then((response) => {
        seqalize
          .sync({ force: true })
          .then((result) => {
            console.log("tabels are been created");
            app.listen(port, () => {
              console.log(`Example app listening on port ${port}!`);
            });
          })
          .catch((err) => {
            console.log(err);
          });

        console.log("Seqalize ORM connected ");
      })
      .catch((err) => {
        console.log({ message: "seqalize error", error: err });
      });
    console.log("MongoDB connected");
    //initializing the sequalize sync method
    //server starting
  })
  .catch((err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("mongodb connected");
    }
  });
