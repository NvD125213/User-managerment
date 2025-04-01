import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const SECRET_KEY = process.env.SECRET_KEY;

export const login = (req, res) => {
  const { email, password } = req.body;
  const user = global.users.find(
    (u) => u.email === email && u.password === password
  );

  if (!user) return res.status(401).json({ message: "Invalid credentials" });

  if (!SECRET_KEY) {
    return res
      .status(500)
      .json({ message: "Server error: SECRET_KEY is missing" });
  }

  const token = jwt.sign({ id: user.id, role: user.role }, SECRET_KEY, {
    expiresIn: "1h",
  });

  res.json({ token });
};
