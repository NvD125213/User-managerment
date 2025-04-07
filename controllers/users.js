import supabase from "../supabaseClient.js";

// Tạo người dùng mới
export const createUser = async (req, res) => {
  const { name, email, password, role = "user" } = req.body;

  const { user, error: authError } = await supabase.auth.api.createUser({
    email,
    password,
  });

  if (authError) return res.status(400).json({ error: authError.message });

  const { data, error } = await supabase
    .from("users")
    .insert([{ id: user.id, name, email, role }]);

  if (error) return res.status(500).json({ error: error.message });

  res.status(201).json(data[0]);
};

export const getAllUsers = async (req, res) => {
  const { data, error } = await supabase.from("users").select("*");

  if (error) return res.status(500).json({ error: error.message });

  res.json(data);
};

export const getUserById = async (req, res) => {
  const { id } = req.params;

  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !data)
    return res.status(404).json({ message: "User not found" });

  res.json(data);
};

// Cập nhật người dùng
export const updateUser = async (req, res) => {
  const { id } = req.params;
  const { name, email, role } = req.body;

  const { data, error } = await supabase
    .from("users")
    .update({ name, email, role })
    .eq("id", id)
    .single();

  if (error || !data)
    return res.status(404).json({ message: "User not found" });

  res.json(data);
};

export const deleteUser = async (req, res) => {
  const { id } = req.params;

  const { error } = await supabase.from("users").delete().eq("id", id);

  if (error) return res.status(404).json({ message: "User not found" });

  res.status(204).send();
};
