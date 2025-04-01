import express from "express";
import {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
} from "../controllers/users.js";
import { authenticateToken } from "../middlewares/auth.js";
import { restrictTo } from "../middlewares/role.js";
import { validateUser } from "../middlewares/validate.js";

const router = express.Router();

router.post("/users", authenticateToken, validateUser, createUser);
router.get("/users", authenticateToken, getAllUsers);
router.get("/users/:id", authenticateToken, getUserById);
router.put("/users/:id", authenticateToken, validateUser, updateUser);
router.delete("/users/:id", authenticateToken, restrictTo("admin"), deleteUser);

export default router;
