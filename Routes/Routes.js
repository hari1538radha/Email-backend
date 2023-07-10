import express from "express";
import {Login} from "../Controllers/Login.js";
const Route = express.Router();
Route.get("/user", Login);

export default Route;
