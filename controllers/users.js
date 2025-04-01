export const createUser = (req, res) => {
  const { name, email, password, role = "user" } = req.body;
  const newUser = { id: global.users.length + 1, name, email, password, role };
  global.users.push(newUser);
  res.status(201).json(newUser);
};

export const getAllUsers = (req, res) => {
  res.json(global.users);
};

export const getUserById = (req, res) => {
  const user = global.users.find((u) => u.id === parseInt(req.params.id));
  if (!user) return res.status(404).json({ message: "User not found" });
  res.json(user);
};

export const updateUser = (req, res) => {
  const userIndex = global.users.findIndex(
    (u) => u.id === parseInt(req.params.id)
  );
  if (userIndex === -1)
    return res.status(404).json({ message: "User not found" });
  global.users[userIndex] = { ...global.users[userIndex], ...req.body };
  res.json(global.users[userIndex]);
};

export const deleteUser = (req, res) => {
  const userIndex = global.users.findIndex(
    (u) => u.id === parseInt(req.params.id)
  );
  if (userIndex === -1)
    return res.status(404).json({ message: "User not found" });
  global.users.splice(userIndex, 1);
  res.status(204).send();
};
