import { User } from "../model/usersM.js";

//register new user
export const createUser = (req, res, next) => {
  const { userName, email, password } = req.body;
  const character_id = [];
  const newUser = new User({ userName, email, password, character_id });
  newUser
    .save()
    .then((info) => {
      res.status(200).json({ message: "New user successfully created." });
    })
    .catch((err) => {
      return next(err);
    });
};

export const getAllUsers = async (req, res, next) => {
  const users = await User.find({});
  res.status(200).json({ users });
};