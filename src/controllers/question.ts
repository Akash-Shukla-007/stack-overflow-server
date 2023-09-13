import mongoose from "mongoose";
import Question from "../models/Question";

const postQuestion = async (req: any, res: any) => {
  const { questionBody, questionTags, questionTitle, author, authorUserId } =
    req.body;
  const question = new Question({
    questionBody,
    questionTags,
    questionTitle,
    author,
    authorUserId,
  });
  try {
    await question.save();
    return res.status(200).json({
      message: "Question Posted Successfully",
      Question: question,
    });
  } catch (error: any) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

const getAllQuestions = async (req: any, res: any) => {
  const questionList = await Question.find();
  try {
    return res.status(200).json({ QuestionList: questionList });
  } catch (error: any) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

const deleteQuestion = async (req: any, res: any) => {
  const { id: _id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(404).send("Question Unavailable");
  }
  try {
    await Question.findByIdAndRemove(_id);
    return res.status(200).json({ message: "Question Removed!" });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

const voteQuestion = async (req: any, res: any) => {
  const { id: _id } = req.params;
  const { value, userAnsweredId } = req.body;

  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(404).send("Question Unavailable");
  }
  try {
    var question = await Question.findById(_id);
    if (question) {
      const upIndex = question?.upVote.findIndex(
        (id: any) => id === String(userAnsweredId)
      );
      const downIndex = question?.downVote.findIndex(
        (id: any) => id === String(userAnsweredId)
      );

      if (value === "upVote") {
        if (downIndex !== 1) {
          question.downVote = question.downVote.filter(
            (id: any) => id !== String(userAnsweredId)
          );
        }
        if (upIndex === -1) {
          question.upVote.push(userAnsweredId);
        } else {
          question.upVote = question.upVote.filter(
            (id: any) => id !== String(userAnsweredId)
          );
        }
      }
      if (value === "downVote") {
        if (upIndex !== -1) {
          question.upVote = question.upVote.filter(
            (id: any) => id !== String(userAnsweredId)
          );
        }
        if (downIndex === -1) {
          question.downVote.push(userAnsweredId);
        } else {
          question.downVote = question.downVote.filter(
            (id: any) => id !== String(userAnsweredId)
          );
        }
      }
      await Question.findByIdAndUpdate(_id, question);
      return res.status(200).json({ message: "Votes Updated" });
    }
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

export { postQuestion, getAllQuestions, deleteQuestion, voteQuestion };
