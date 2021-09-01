import MongoStore from "connect-mongo";
import db from "./db";

const sessionStore = MongoStore.create({
  // @ts-ignore
  client: db.getClient(),
});

export default sessionStore;
