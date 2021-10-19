import "dotenv/config";
import express from "express";
import session from "express-session";
import passport from "passport";
import sessionStore from "./config/sessionStore";
import routes from "./routes";
import "./config/passport";

// Servidor
const app = express();

// Middlewares
app.use(express.json());

app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    store: sessionStore,
    cookie: {
      maxAge: 14 * 24 * 60 * 60 * 1000, // 2 weeks
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

// Puerto
const port = process.env.PORT || 3000;

// Rutas
app.use("/", routes);

// Inicio del servidor
app.listen(port, () => console.log(`Server listening on port ${port}...`));
