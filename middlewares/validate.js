import { body, validationResult } from "express-validator";

export const validateUser = [
  body("name").notEmpty().withMessage("Name is required"),
  body("email")
    .isEmail()
    .custom((value) => {
      if (global.users.some((u) => u.email === value)) {
        throw new Error("Email already exists");
      }
      return true;
    }),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

export const validateBook = [
  body("title")
    .isString()
    .withMessage("Title must be a string")
    .notEmpty()
    .withMessage("Title is required")
    .isLength({ max: 255 })
    .withMessage("Title must be less than 255 characters"),

  body("author")
    .isString()
    .withMessage("Author must be a string")
    .notEmpty()
    .withMessage("Author is required")
    .isLength({ max: 255 })
    .withMessage("Author must be less than 255 characters"),

  body("genre")
    .isString()
    .withMessage("Genre must be a string")
    .notEmpty()
    .withMessage("Genre is required")
    .isLength({ max: 100 })
    .withMessage("Genre must be less than 100 characters"),

  body("publishedYear")
    .isInt({ min: 1000, max: 9999 })
    .withMessage("Published Year must be a valid year")
    .notEmpty()
    .withMessage("Published Year is required"),
];
