import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import mainRoute from "./Routes/main_routes.js";
import protectedRoute from "./Routes/user_auth.js";
import userRoute from "./Routes/user_router.js";
import { MongoUrl } from "./database/mongo_db.config.js";
import mongoose from "mongoose";
import seqalize from "./database/sql/sql.js";
import session from "express-session";
import multer from "multer";

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
app.use(
  session({
    saveUninitialized: true,
    secret: "session code",
    resave: false,
  })
);
export const upload  = multer({ dest: "/images" }).single("image");
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
          .sync()
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
  })
  .catch((err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("mongodb connected");
    }
  });
