import mongoose from "mongoose";
import Question from "../models/Question";

const postAnswer = async (req: any, res: any) => {
  const { id } = req.params;
  const { answerBody, userAnswered, noOfAnswers, userAnsweredId } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).send("Question Unavailable");
  }

  updateNoOfAnswers(id, noOfAnswers);
  try {
    const updated = await Question.findOneAndUpdate(
      { _id: id },
      {
        $addToSet: {
          answers: [{ answerBody, userAnswered, userAnsweredId }],
        },
      },
      {
        multi: true,
      }
    );
    return res.status(200).json(updated);
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

const updateNoOfAnswers = async (id: any, noOfAnswers: any) => {
  try {
    await Question.findByIdAndUpdate(id, {
      $set: { noOfAnswers: noOfAnswers },
    });
  } catch (err: any) {
    console.log();
  }
};

const delteAnswer = async (req: any, res: any) => {
  const { id: _id } = req.params;

  const { answerId } = req.body;

  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(404).send("Question Unavailable");
  }
  if (!mongoose.Types.ObjectId.isValid(answerId)) {
    return res.status(404).send("Answer Unavailable");
  }
  try {
    await Question.updateOne(
      { _id },
      { $pull: { answers: { _id: answerId } } }
    );
    return res.status(200).json({ message: "Answer Removed!" });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

export { postAnswer, delteAnswer };
