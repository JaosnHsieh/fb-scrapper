import { db, sequelize } from "./server/models";
import scrape from "./scrape.js";
import express from "express";
const app = express();
import configExpress from "./server/controllers";
configExpress(app);
const port = 8080;
app.listen(port, () => {
  console.log(`listening to ${port}`);
});
