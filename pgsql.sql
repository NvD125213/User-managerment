create table users (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text unique not null,
  password text not null,
  role text default 'user'
);

create table books (
  id serial primary key,
  title text not null,
  author text not null,
  genre text not null,
  published_year int not null
);

create table borrowing_history (
  id serial primary key,
  user_id uuid references users(id),
  book_id int references books(id),
  borrowed_date date not null,
  returned_date date
);

CREATE INDEX idx_user_id ON borrowing_history (user_id);
CREATE INDEX idx_book_id ON borrowing_history (book_id);

CREATE OR REPLACE FUNCTION get_most_borrowed_books()
RETURNS TABLE (
  title TEXT,
  author TEXT,
  genre TEXT,
  borrow_count BIGINT
)
LANGUAGE sql
AS $$
  SELECT 
    b.title,
    b.author,
    b.genre,
    COUNT(bh."book_id") AS borrow_count
  FROM 
    "borrowing_history" bh
  JOIN 
    "books" b ON bh."book_id" = b.id
  WHERE 
    bh."borrowed_date" > NOW() - INTERVAL '6 months'
  GROUP BY 
    b.id
  ORDER BY 
    borrow_count DESC
  LIMIT 5;
$$;

CREATE OR REPLACE FUNCTION borrow_book(user_uid UUID, book_id_input INT)
RETURNS TABLE (
  borrowing_id INT,
  user_uid_out UUID,
  book_id_out INT,
  borrowed_date_out DATE,
  returned_date_out DATE
)
LANGUAGE plpgsql
AS $$
BEGIN
  -- Kiểm tra sách có tồn tại không
  IF NOT EXISTS (
    SELECT 1 FROM books WHERE id = book_id_input
  ) THEN
    RAISE EXCEPTION 'Book with ID % does not exist', book_id_input;
  END IF;

  -- Thêm bản ghi mượn sách và trả về kết quả
  RETURN QUERY
  INSERT INTO borrowing_history (user_id, book_id, borrowed_date)
  VALUES (user_uid, book_id_input, current_date)
  RETURNING borrowing_id, user_id, book_id, borrowed_date, returned_date;
END;
$$;

