import express from "express";
import {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
} from "../controllers/users.js";
import { requireAuth } from "../middlewares/auth.js";
import { restrictTo } from "../middlewares/role.js";
import { validateUser } from "../middlewares/validate.js";

const router = express.Router();

router.post(
  "/users",
  requireAuth,
  validateUser,
  restrictTo("admin"),
  createUser
);
router.get("/users", requireAuth, restrictTo("admin"), getAllUsers);
router.get("/users/:id", requireAuth, restrictTo("admin"), getUserById);
router.put(
  "/users/:id",
  requireAuth,
  validateUser,
  restrictTo("admin"),
  updateUser
);
router.delete("/users/:id", requireAuth, restrictTo("admin"), deleteUser);

export default router;
