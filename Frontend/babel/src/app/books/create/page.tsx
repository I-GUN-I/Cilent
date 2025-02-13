"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const CreateBook = () => {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [content, setContent] = useState("");
  const [color, setColor] = useState("#ff5733");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const storedCreate = localStorage.getItem('book-create');
    if (storedCreate) {
      const bookData = JSON.parse(storedCreate);
      setTitle(bookData.title);
      setAuthor(bookData.author);
      setContent(bookData.content);
      setColor(bookData.color);
    }
  }, []);

  useEffect(() => {
    const storedCreate = { title, author, content, color };
    localStorage.setItem("book-create", JSON.stringify(storedCreate));
  }, [title, author, content, color]);

  const handleSubmit = (e: React.FormEvent) => {
    localStorage.clear();
    e.preventDefault();
    setError(null);
  
    const newBook = { title, author, content, color, password };
  
    fetch('http://localhost:8000/books/api/', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newBook),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to create book");
        }
        return res.json();
      })

      .then((data) => {
        router.push(`/books/${data.id}`); // Redirect to book detail page
      })

      .catch((err) => {
        setError(err.message);
      });
  };

  return (
    <main className="min-h-screen p-10 flex flex-col items-center">
      <div
        className="absolute inset-0 bg-cover bg-center filter blur-md opacity-40 z-0"
        style={{
          backgroundImage:
            "url('https://images.squarespace-cdn.com/content/v1/59442018bebafb235d0aae1c/1602551093044-TYO6TJP1ZBQ3JKQYY2B6/Desmazieres-biblio-plongeante-sm.jpg')",
        }}
      />
      <h1 className="text-4xl text-[#4a2c29] font-bold text-center mb-11 tracking-wide drop-shadow-lg font-serif border-b border-gray-700 pb-4">
        Create a New Book
      </h1>
      <p className="text-red-500 text-center mb-4">{error}</p>
      <div className="relative bg-white text-black bg-opacity-70 p-8 shadow-lg rounded-lg max-w-3xl w-full z-10">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-700 font-bold">Title:</label>
            <input
              type="text"
              className="w-full p-2 border rounded-md w-80 mt-2"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                setError(null);
              }}
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-bold">Author:</label>
            <input
              type="text"
              className="w-full p-2 border rounded-md w-auto mt-2"
              value={author}
              onChange={(e) => {
                setAuthor(e.target.value);
                setError(null);
              }}
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-bold">Content:</label>
            <textarea
              className="w-full p-2 border rounded-md h-48 mt-2"
              value={content}
              onChange={(e) => {
                setContent(e.target.value);
                setError(null);
              }}
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-bold">Book Cover Color:</label>
            <input
              type="color"
              className="w-full h-10 rounded-md w-10 mt-2"
              value={color}
              onChange={(e) => setColor(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-gray-700 font-bold">Password:</label>
            <input
              type="password"
              className="w-full p-2 border rounded-md w-80 mt-2"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError(null);
              }}
              required
            />
            <p className="text-xs text-gray-500 mt-1">
              This password will be used to edit your book later.
            </p>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
          >
            Create Book
          </button>
        </form>
      </div>
    </main>
  );
}

export default CreateBook;
