import fs from "fs";
import path from "path";
import Sequelize from "sequelize";
import config from "../../config.js";

const env = process.env.NODE_ENV || "develop";
const { database, username, password, options, resetDB } = config.db;
console.log(database, username, password, options);
const sequelize = new Sequelize(database, username, password, options);
let db = {};

fs
  .readdirSync(__dirname)
  .filter(file => {
    return file.indexOf(".") !== 0 && file !== "index.js";
  })
  .forEach(file => {
    var model = sequelize.import(path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if ("associate" in db[modelName]) {
    db[modelName].associate(db);
  }
});

(async () => {
  try {
    if (env === "develop" && resetDB) {
      await sequelize.sync({ force: true });
    }
  } catch (e) {
    console.error(e);
  }
})();

export { db, sequelize };
