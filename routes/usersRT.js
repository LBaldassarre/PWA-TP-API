import { createUser, getAllUsers} from "../controller/usersCT.js";
import { Router } from "express";
export const router = Router();
router.post("/", createUser);
router.get("/", getAllUsers);