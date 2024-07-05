import { createUser, getAllUsers, logIn, addFavorite} from "../controller/usersCT.js";
import { Router } from "express";
export const router = Router();
router.post("/", createUser);
router.get("/", getAllUsers);
router.post("/login", logIn);
router.patch("/characters", addFavorite);