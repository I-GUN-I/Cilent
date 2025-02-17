"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Image from "next/image";


const EditBook = () => {
  const router = useRouter();
  const { id } = useParams(); // Get book ID from URL
  
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [content, setContent] = useState("");
  const [color, setColor] = useState("#ffffff");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(`http://localhost:8000/books/api/${id}/`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch book details");
        }
        return res.json();
      })

      .then((data) => {
        setTitle(data.title);
        setAuthor(data.author);
        setContent(data.content);
        setColor(data.color);
      })
      .catch((err) => setError(err.message));
  }, [id]); //Runs when 'id' changes

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const updatedBook = { title, author, content, color, password };
  
    fetch(`http://localhost:8000/books/api/${id}/`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedBook),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to update book");
        }
        return res.json();
      })

      .then(() => {
        router.push(`/books/${id}`);
      })
      
      .catch((err) => {
        setError(err.message);
      });
  };
  

  return (
    <main className="relative min-h-screen p-10 flex flex-col items-center">
      <div className="inset-0 w-full h-full">
        <Image
          src="https://images.squarespace-cdn.com/content/v1/59442018bebafb235d0aae1c/1602551093044-TYO6TJP1ZBQ3JKQYY2B6/Desmazieres-biblio-plongeante-sm.jpg"
          alt="Library Background"
          fill
          className="opacity-40 blur-md object-cover"
          priority
        />
      </div>

      <h1 className="text-4xl text-[#4a2c29] font-bold text-center mb-11 tracking-wide drop-shadow-lg font-serif border-b border-gray-700 pb-4">
        Edit Book
      </h1>
      <p className="text-red-500 text-center mb-4">{error}</p>

      <div className="relative bg-white text-black bg-opacity-70 p-8 shadow-lg rounded-lg max-w-3xl w-full z-10">
        <form onSubmit={handleSubmit} className="space-y-6">

          <div>
            <label className="block text-gray-700 font-bold">Title:</label>
            <input
              type="text"
              className="w-full p-2 border rounded-md mt-2"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-bold">Author:</label>
            <input
              type="text"
              className="w-full p-2 border rounded-md mt-2"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-bold">Content:</label>
            <textarea
              className="w-full p-2 border rounded-md h-48 mt-2"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-bold">Book Cover Color:</label>
            <input
              type="color"
              className="w-10 h-10 rounded-md mt-2"
              value={color}
              onChange={(e) => setColor(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-gray-700 font-bold">Password:</label>
            <input
              type="password"
              className="w-full p-2 border rounded-md mt-2"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <p className="text-xs text-gray-500 mt-1">
              This password will be used to confirm the update.
            </p>
          </div>

          <div className="flex justify-between">
            <button
              type="button"
              onClick={() => router.push("/books")}
              className="bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600 transition"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition"
            >
              Update Book
            </button>
          </div>

        </form>
      </div>
    </main>
  );
};

export default EditBook;
