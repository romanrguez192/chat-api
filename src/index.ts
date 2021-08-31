import "dotenv/config";
import express from "express";
import "./config/db";

// Servidor
const app = express();
app.use(express.json());

// Puerto
const port = process.env.PORT || 3000;

// Rutas

// app.use("/api/clientes", clientesRouter);

// Inicio del servidor
app.listen(port, () => console.log(`Server listening on port ${port}`));
