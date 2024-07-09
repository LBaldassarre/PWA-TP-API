import { User } from "../model/usersM.js";
import { validateUser, validatePartialUser } from "../validator/userSchema.js";
import bcrypt from 'bcrypt';

export const isServerRunning = async (req, res, next) => {
  res.status(200).json({ message: "server running" });
}

//register new user
export const createUser = async (req, res, next) => {
  const { userName, email, password } = req.body;
  const characters_id = "[]";
  const validatedUser = validateUser({
    userName,
    email,
    password,
    characters_id
  });
  if (validatedUser.error) {
    const [path] = validatedUser.error.issues[0].path;
    const error = validatedUser.error.issues[0].message;
    const message = path + ': ' + error
    res.status(422).json({message: message});
  } else {
    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ userName, email, password: hashPassword, characters_id });
    newUser
      .save()
      .then((info) => {
        res.status(200).json({ message: "New user successfully created" });
      })
      .catch((err) => {
        return next(err);
      });
  }
};

export const getAllUsers = async (req, res, next) => {
  const users = await User.find({});
  res.status(200).json({ data: users });
};

export const getUser = async (req, res, next) => {
  const { email } = req.params;
  const [user] = await User.find({ email: email });
  res.status(200).json({ user });
};

export const logIn = async (req, res, next) => {
  const { email, password } = req.body;
  const [user] = await User.find({ email: email });
  if (user) {
    const isSamePassword = await (bcrypt.compare(password,user.password))
    if (isSamePassword) {
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
    ? res.status(200).json({ message: "Character List Updated" })
    : res.status(500).json({ message: "Internal Server Error" })
};

export const changePassword = async (req, res) => {
  const { email, newPassword } = req.body;
  const [user] = await User.find({ email: email });

  if (!user) {
    return res
      .status(404)
      .json({ message: "Email not found" });
  }

  const validatedUser = validatePartialUser({email: email, password: newPassword});
  if (validatedUser.error) {
    const [path] = validatedUser.error.issues[0].path;
    const error = validatedUser.error.issues[0].message;
    const message = path + ': ' + error
    return res.status(422).json({message: message});
  }
  if (!validatedUser.data.password) {
    return res.status(422).json({message: "You must at least include one valid field"});
  }
  const hashPassword = await bcrypt.hash(newPassword, 10);
  const update = await User.updateOne(
    { email: email },
    {
      $set: { password: hashPassword }
    }
  );
  update
    ? res.status(200).json({ message: "Password updated successfully" })
    : res.status(500).json({ message: "Internal Server Error" })
}