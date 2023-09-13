"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var router = express_1.default.Router();
var question_1 = require("../controllers/question");
var auth_1 = require("../middlewares/auth");
router.post("/ask", auth_1.secureAuth, question_1.postQuestion);
router.get("/", question_1.getAllQuestions);
router.delete("/delete/:id", auth_1.secureAuth, question_1.deleteQuestion);
router.patch("/vote/:id", auth_1.secureAuth, question_1.voteQuestion);
module.exports = router;
