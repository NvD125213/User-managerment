import jwt from "jsonwebtoken";
import supabase from "../supabaseClient.js";

export const login = async (req, res) => {
  const { email, password } = req.body;

  const { data: authData, error: authError } =
    await supabase.auth.signInWithPassword({
      email,
      password,
    });

  if (authError) return res.status(401).json({ error: authError.message });

  const userId = authData.user.id;

  const { data: userProfile, error: userError } = await supabase
    .from("users")
    .select("role")
    .eq("id", userId)
    .single();

  if (userError) return res.status(500).json({ error: userError.message });

  const token = jwt.sign(
    {
      id: userId,
      email,
      role: userProfile.role || "user",
    },
    process.env.SECRET_KEY,
    { expiresIn: "2h" }
  );

  res.json({ token, user: { id: userId, email, role: userProfile.role } });
};
export const register = async (req, res) => {
  const { email, password, name } = req.body;

  if (!email || !password || !name) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) {
    return res.status(400).json({ error: error.message });
  }

  const userId = data.user.id;

  const { error: insertError } = await supabase
    .from("users")
    .insert([{ id: userId, email, name, password }]);

  if (insertError) {
    return res.status(500).json({ error: insertError.message });
  }

  res.json({
    message:
      "Registration successful! Please check your email for confirmation.",
  });
};
