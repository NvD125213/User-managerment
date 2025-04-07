import express from "express";
import {
  getAllBooks,
  getBookById,
  createBook,
  getMostBorrowedBooks,
  borrowBook,
} from "../controllers/book.js";
import { requireAuth } from "../middlewares/auth.js";
import { restrictTo } from "../middlewares/role.js";
import { validateBook } from "../middlewares/validate.js";

const router = express.Router();

router.post(
  "/books",
  requireAuth,
  validateBook,
  restrictTo("admin"),
  createBook
);
router.get("/books", requireAuth, getAllBooks);
router.get("/books/:id", requireAuth, getBookById);
router.get("/most-borrowed", requireAuth, getMostBorrowedBooks);
router.post("/borrow", requireAuth, borrowBook);

export default router;
