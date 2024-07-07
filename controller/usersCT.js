import { User } from "../model/usersM.js";

//register new user
export const createUser = (req, res, next) => {
  const { userName, email, password } = req.body;
  const characters_id = "[]";
  const newUser = new User({ userName, email, password, characters_id });
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

export const logIn = async (req, res, next) => {
  const { email, password } = req.body;
  const [user] = await User.find({ email: email });
  if (user) {
    if (password === user.password) {
      res.status(200).json({ message: "Log In Successful", data: user })
    } else {
      res.status(400).json({ message: "Wrong Password" })
    }
  } else {
    res.status(500).json({ message: "Email not found" })
  }
};

export const addFavorite = async (req, res, next) => {
  const { email, characters_id } = req.body;
  const update = await User.updateOne(
    { email: email },
    {
      $set: { characters_id: characters_id }
    }
  );
  update
    ? res.status(200).json({ mensaje: "Character List Updated" })
    : res.status(500).json({ mensaje: "Internal Server Error" })
};