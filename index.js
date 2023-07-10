import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import Route from "./Routes/Routes.js";
import { MongoUrl } from "./database/database.js";
import mongoose from "mongoose";

const app = express();
//middleware for server
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//ENV
const port = process.env.PORT;

app.use("/api", Route);

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
