import express from "express";
const app = express();
require("dotenv").config();
const mongooge = require("mongoose");
const userRoutes = require("./routes/users");
const questionRoutes = require("./routes/questions");
const answerRoutes = require("./routes/answer");
const cors = require("cors");
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req: any, res: any) => {
  res.send("hello");
});

app.use("/user", userRoutes);
app.use("/questions", questionRoutes);
app.use("/answer", answerRoutes);

const port = process.env.PORT;
mongooge
  .connect(process.env.DATABASE_URL)
  .then(() =>
    app.listen(port || 8000, () => {
      console.log(`Server Running at Port ${port}`);
    })
  )
  .catch((err: any) => console.log(err.message));
