import mongoose from "mongoose";

// Conexión a MongoDB
mongoose.connect(process.env.MONGODB_URL);

const db = mongoose.connection;

db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Connected to database"));

export default db;
