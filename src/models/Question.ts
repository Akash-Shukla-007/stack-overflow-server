import mongoose from "mongoose";

const QuestionSchema = new mongoose.Schema({
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

const Question = mongoose.model("Question", QuestionSchema);
export default Question;
