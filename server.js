import express from "express";
import userRoutes from "./routes/users.js";
import authRoutes from "./routes/auth.js";

const app = express();
app.use(express.json());

global.users = [
  {
    id: 1,
    name: "Ngo Van Duc",
    email: "duc@gmail.com",
    password: "123456",
    role: "admin",
  },
];

app.use("/api", authRoutes);
app.use("/api", userRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
