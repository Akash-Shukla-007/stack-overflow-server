import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import User from "../models/User";
import tokenGenerator from "../services/tokengenerator";

const signUp = async (req: any, res: any) => {
  const user = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  };
  try {
    const existingUser = await User.findOne({ email: user.email });
    // Checking Existing User
    if (existingUser) {
      return res.status(409).json({ message: "User Already Exists" });
    }
    // Password Hashing
    const saltRounds = parseInt(process.env.SALT_ROUND || "10");
    var hashedPassword = bcrypt.hashSync(user.password, saltRounds);
    user.password = hashedPassword;

    // Creating User in DB
    const data = new User(user);
    await data.save();

    //Sign JWT Token
    const loginToken = tokenGenerator(data.email, data._id);
    console.log(req.userId);
    res.status(201).json({
      message: "User Created",
      User: data,
      Token: loginToken,
    });
  } catch (err: any) {
    res.status(500).json({ message: err });
  }
};

//Login

const logIn = async (req: any, res: any) => {
  const { email, password } = req.body;
  // checking user Email Exist or not
  const user = await User.findOne({ email });

  try {
    //User Exists
    if (user) {
      // Comparing Password
      if (bcrypt.compareSync(password, user.password)) {
        // Valid User --> Signing new JWT Token
        const loginToken = tokenGenerator(user.email, user._id);
        return res
          .status(201)
          .json({ message: "Valid User", User: user, Token: loginToken });
      }

      // Email and Password not Match
      return res
        .status(500)
        .json({ message: "Email and Password Doesn't Match" });
    }
    //User doesn't Exists
    return res.status(404).json({ message: "User Not Found" });
  } catch (err: any) {
    return res.status(500).json({ message: err.message });
  }
};

const getAllUsers = async (req: any, res: any) => {
  const users = await User.find();
  try {
    var allUsers: any = [];
    users.forEach((user) => {
      allUsers.push({
        _id: user._id,
        name: user.name,
        about: user.about,
        tags: user.tags,
        joinedOn: user.joinedOn,
      });
    });
    return res.status(200).json(allUsers);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

const editUserProfile = async (req: any, res: any) => {
  const { name, location, tags, about } = req.body;
  console.log(req.body, req.userId);

  try {
    const data = await User.findOneAndUpdate(
      { _id: req.userId },
      { name, location, tags, about },
      { new: true }
    );
    console.log(data);
    return res
      .status(201)
      .json({ User: data, message: "Profile Updated Successfully" });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export { signUp, logIn, getAllUsers, editUserProfile };
