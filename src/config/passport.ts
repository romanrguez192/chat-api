import passport from "passport";
import { Strategy as LocalStrategy, VerifyFunction } from "passport-local";
import bcrypt from "bcryptjs";
import db from "./db";
import User from "../models/User";

interface IUser {
  _id: string;
}

const verify: VerifyFunction = async (email, password, done) => {
  try {
    const user = await User.findOne({ email });

    if (!user) {
      return done(null);
    }

    const match = await bcrypt.compare(password, user.password);

    if (match) {
      done(null, user);
    } else {
      done(null, false, { message: "Incorrect password" });
    }
  } catch (error) {
    done(error);
  }
};

const strategy = new LocalStrategy({ usernameField: "email" }, verify);

passport.use(strategy);

passport.serializeUser((user: IUser, done) => {
  done(null, user._id);
});

passport.deserializeUser(async (userId: string, done) => {
  try {
    const user = await User.findById(userId);
    done(null, user);
  } catch (error) {
    done(error);
  }
});
