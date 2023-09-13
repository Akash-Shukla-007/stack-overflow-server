import express from "express";
const router = express.Router();

import {
  signUp,
  logIn,
  getAllUsers,
  editUserProfile,
} from "../controllers/authControllers";
import { secureAuth } from "../middlewares/auth";

router.post("/signup", signUp);
router.post("/login", logIn);
router.get("/", getAllUsers);
router.patch("/edit", secureAuth, editUserProfile);

module.exports = router;
