import express from "express";
const router = express.Router();

import { delteAnswer, postAnswer } from "../controllers/answerController";
import { secureAuth } from "../middlewares/auth";

router.patch("/post/:id", secureAuth, postAnswer);
router.patch("/delete/:id", secureAuth, delteAnswer);

module.exports = router;
