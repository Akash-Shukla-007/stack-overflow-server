import express from "express";
const router = express.Router();

import {
  postQuestion,
  getAllQuestions,
  deleteQuestion,
  voteQuestion,
} from "../controllers/question";
import { secureAuth } from "../middlewares/auth";

router.post("/ask", secureAuth, postQuestion);
router.get("/", getAllQuestions);
router.delete("/delete/:id", secureAuth, deleteQuestion);
router.patch("/vote/:id", secureAuth, voteQuestion);

module.exports = router;
