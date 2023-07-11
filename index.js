import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import userRoute from "./Routes/Routes.js";
import { MongoUrl } from "./database/database.js";
import mongoose from "mongoose";

const app = express();
//middleware for server
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json())
//ENV
const port = process.env.PORT;

app.use("/api", userRoute);

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
