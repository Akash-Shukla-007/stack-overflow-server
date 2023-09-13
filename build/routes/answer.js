"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var router = express_1.default.Router();
var answerController_1 = require("../controllers/answerController");
var auth_1 = require("../middlewares/auth");
router.patch("/post/:id", auth_1.secureAuth, answerController_1.postAnswer);
router.patch("/delete/:id", auth_1.secureAuth, answerController_1.delteAnswer);
module.exports = router;
