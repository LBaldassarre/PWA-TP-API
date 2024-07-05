import { Schema, model } from "mongoose";
const UserSchema = Schema({
  userName: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  characters_id: { type: String }
});

export const User = model("User", UserSchema);