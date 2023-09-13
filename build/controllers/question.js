"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.voteQuestion = exports.deleteQuestion = exports.getAllQuestions = exports.postQuestion = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
var Question_1 = __importDefault(require("../models/Question"));
var postQuestion = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, questionBody, questionTags, questionTitle, author, authorUserId, question, error_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, questionBody = _a.questionBody, questionTags = _a.questionTags, questionTitle = _a.questionTitle, author = _a.author, authorUserId = _a.authorUserId;
                question = new Question_1.default({
                    questionBody: questionBody,
                    questionTags: questionTags,
                    questionTitle: questionTitle,
                    author: author,
                    authorUserId: authorUserId,
                });
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                return [4 /*yield*/, question.save()];
            case 2:
                _b.sent();
                return [2 /*return*/, res.status(200).json({
                        message: "Question Posted Successfully",
                        Question: question,
                    })];
            case 3:
                error_1 = _b.sent();
                console.log(error_1);
                return [2 /*return*/, res.status(500).json({ message: error_1.message })];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.postQuestion = postQuestion;
var getAllQuestions = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var questionList;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, Question_1.default.find()];
            case 1:
                questionList = _a.sent();
                try {
                    return [2 /*return*/, res.status(200).json({ QuestionList: questionList })];
                }
                catch (error) {
                    console.log(error);
                    return [2 /*return*/, res.status(500).json({ message: error.message })];
                }
                return [2 /*return*/];
        }
    });
}); };
exports.getAllQuestions = getAllQuestions;
var deleteQuestion = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _id, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _id = req.params.id;
                if (!mongoose_1.default.Types.ObjectId.isValid(_id)) {
                    return [2 /*return*/, res.status(404).send("Question Unavailable")];
                }
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, Question_1.default.findByIdAndRemove(_id)];
            case 2:
                _a.sent();
                return [2 /*return*/, res.status(200).json({ message: "Question Removed!" })];
            case 3:
                error_2 = _a.sent();
                return [2 /*return*/, res.status(500).json({ message: error_2.message })];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.deleteQuestion = deleteQuestion;
var voteQuestion = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _id, _a, value, userAnsweredId, question, upIndex, downIndex, error_3;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _id = req.params.id;
                _a = req.body, value = _a.value, userAnsweredId = _a.userAnsweredId;
                if (!mongoose_1.default.Types.ObjectId.isValid(_id)) {
                    return [2 /*return*/, res.status(404).send("Question Unavailable")];
                }
                _b.label = 1;
            case 1:
                _b.trys.push([1, 5, , 6]);
                return [4 /*yield*/, Question_1.default.findById(_id)];
            case 2:
                question = _b.sent();
                if (!question) return [3 /*break*/, 4];
                upIndex = question === null || question === void 0 ? void 0 : question.upVote.findIndex(function (id) { return id === String(userAnsweredId); });
                downIndex = question === null || question === void 0 ? void 0 : question.downVote.findIndex(function (id) { return id === String(userAnsweredId); });
                if (value === "upVote") {
                    if (downIndex !== 1) {
                        question.downVote = question.downVote.filter(function (id) { return id !== String(userAnsweredId); });
                    }
                    if (upIndex === -1) {
                        question.upVote.push(userAnsweredId);
                    }
                    else {
                        question.upVote = question.upVote.filter(function (id) { return id !== String(userAnsweredId); });
                    }
                }
                if (value === "downVote") {
                    if (upIndex !== -1) {
                        question.upVote = question.upVote.filter(function (id) { return id !== String(userAnsweredId); });
                    }
                    if (downIndex === -1) {
                        question.downVote.push(userAnsweredId);
                    }
                    else {
                        question.downVote = question.downVote.filter(function (id) { return id !== String(userAnsweredId); });
                    }
                }
                return [4 /*yield*/, Question_1.default.findByIdAndUpdate(_id, question)];
            case 3:
                _b.sent();
                return [2 /*return*/, res.status(200).json({ message: "Votes Updated" })];
            case 4: return [3 /*break*/, 6];
            case 5:
                error_3 = _b.sent();
                return [2 /*return*/, res.status(500).json({ message: error_3.message })];
            case 6: return [2 /*return*/];
        }
    });
}); };
exports.voteQuestion = voteQuestion;
