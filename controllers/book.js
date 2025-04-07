import supabase from "../supabaseClient.js";

export const getAllBooks = async (req, res) => {
  try {
    const { data, error } = await supabase.from("books").select("*");

    if (error) throw error;
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const createBook = async (req, res) => {
  const { title, author, genre, published_year } = req.body;

  try {
    const { data, error } = await supabase
      .from("books")
      .insert([{ title, author, genre, published_year }]);

    if (error) throw error;
    res.status(201).json({
      message: "Created new book!",
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getBookById = async (req, res) => {
  const { id } = req.params;

  try {
    const { data, error } = await supabase
      .from("books")
      .select("*")
      .eq("id", id)
      .single();

    if (error) throw error;
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getMostBorrowedBooks = async (req, res) => {
  try {
    const { data, error } = await supabase.rpc("get_most_borrowed_books");

    if (error) throw error;

    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const borrowBook = async (req, res) => {
  const { user_id, book_id } = req.body;

  const { data, error } = await supabase.rpc("borrow_book", {
    user_uid: user_id,
    book_id_input: book_id,
  });

  if (error) return res.status(400).json({ error: error.message });
  res.json(data);
};
