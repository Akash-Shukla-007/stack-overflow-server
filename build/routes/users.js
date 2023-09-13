"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var router = express_1.default.Router();
var authControllers_1 = require("../controllers/authControllers");
var auth_1 = require("../middlewares/auth");
router.post("/signup", authControllers_1.signUp);
router.post("/login", authControllers_1.logIn);
router.get("/", authControllers_1.getAllUsers);
router.patch("/edit", auth_1.secureAuth, authControllers_1.editUserProfile);
module.exports = router;
