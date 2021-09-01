import { Application } from "express";
import auth from "./auth";

const mountRoutes = (app: Application) => {
  app.use("/api/auth", auth);
};

export default mountRoutes;