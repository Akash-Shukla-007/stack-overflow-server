"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var QuestionSchema = new mongoose_1.default.Schema({
    questionTitle: {
        type: String,
        required: true,
    },
    questionBody: {
        type: String,
        required: true,
    },
    questionTags: {
        type: [String],
        required: true,
    },
    noOfAnswers: {
        type: Number,
        default: 0,
    },
    upVote: {
        type: [String],
        default: [],
    },
    downVote: {
        type: [String],
        default: [],
    },
    author: {
        type: String,
        required: true,
    },
    authorUserId: {
        type: String,
        // required: true,
    },
    postedOn: {
        type: Date,
        default: Date.now,
    },
    answers: [
        {
            answerBody: { type: String },
            userAnswered: { type: String },
            userAnsweredId: { type: String },
            answeredOn: {
                type: Date,
                default: Date.now,
            },
        },
    ],
});
var Question = mongoose_1.default.model("Question", QuestionSchema);
exports.default = Question;
