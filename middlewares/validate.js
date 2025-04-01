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
