import promiseApi from "./promise";
import asyncApi from "./async";
const configExpress = app => {
  app.use("/promise", promiseApi);
  app.use("/async", asyncApi);
};
export default configExpress;
