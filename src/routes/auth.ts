import { Router } from "express";
import passport from "passport";
import bcrypt from "bcryptjs";
import User from "../models/User";

const router = Router();

const isAuth = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    res
      .status(401)
      .json({ msg: "You are not authorized to view this resource" });
  }
};

router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/api/auth/me",
  })
);

router.post("/signup", async (req, res, next) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
    });

    const newUser = await user.save();

    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json(error);
  }
});

router.get("/", (req, res) => {
  res.send("Hello world");
});

router.get("/bad", (req, res) => {
  res.send("Bad bad");
});

router.get("/me", isAuth, (req, res) => {
  res.json(req.user);
});



export default router;
