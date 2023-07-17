import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import mainRoute from "./Routes/main_routes.js";
import protectedRoute from "./Routes/user_auth.js";
import userRoute from "./Routes/user_router.js";
import { MongoUrl } from "./database/mongo_db.config.js";
import mongoose from "mongoose";

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
    console.log("MongoDB connected");
 
    //server starting
    app.listen(port, () => {
      console.log(`Example app listening on port ${port}!`);
    });
  })
  .catch((err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("mongodb connected");
    }
  });
