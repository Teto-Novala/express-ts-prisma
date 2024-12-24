import { Router } from "express";
import {
  createUser,
  deleteUserById,
  getUserById,
  getUsers,
  updateUserById,
} from "../handlers/users.handler";

const router = Router();
router.get("/", getUsers);
router.get("/:id", getUserById);

router.post("/create", createUser);
router.put("/update/:id", updateUserById);
router.delete("/delete/:id", deleteUserById);

export default router;
