"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Image from "next/image";


const EditBook = () => {
  const router = useRouter();
  const { id } = useParams(); // Get book ID from URL
  // Book detail data variable  
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [content, setContent] = useState("");
  const [color, setColor] = useState("#ffffff");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(`http://localhost:8000/books/api/${id}/`) // Get book detail data
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch book details"); // Throw error if fail to fetch
        }
        return res.json();
      })
      // Set book detail
      .then((data) => {
        setTitle(data.title);
        setAuthor(data.author);
        setContent(data.content);
        setColor(data.color);
      })

      .catch((err) => setError(err.message));
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const updatedBook = { title, author, content, color, password };
    // Patch the new data to API
    fetch(`http://localhost:8000/books/api/${id}/`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedBook),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to update book, is your password correct?"); //Throw error if fail to update, password 
        }
        return res.json();
      })

      .then(() => {
        router.push(`/books/${id}`); // Push to detail page after update success
      })
      
      .catch((err) => {
        setError(err.message);
      });
  };
  

  return (
    // Edit page for getting update book data, check for password to allow update
    <main className="relative min-h-screen p-10 flex flex-col items-center">
      {/* Background Image */}
      <div className="inset-0 w-full h-full">
        <Image
          src="https://images.squarespace-cdn.com/content/v1/59442018bebafb235d0aae1c/1602551093044-TYO6TJP1ZBQ3JKQYY2B6/Desmazieres-biblio-plongeante-sm.jpg"
          alt="Library Background"
          fill
          className="opacity-40 blur-md object-cover"
          priority
        />
      </div>

      <h1 aria-label="Edit Book"
      className="text-4xl text-[#4a2c29] font-bold text-center mb-11 tracking-wide drop-shadow-lg font-serif border-b border-gray-700 pb-4">
        Edit Book
      </h1>
      
      {/* Display error if there're any */}
      <p className="text-red-500 text-center mb-2">{error}</p>

      <div className="relative bg-white text-black bg-opacity-70 p-8 shadow-lg rounded-lg max-w-3xl w-full z-10">
        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Input for Title */}
          <div>
            <label className="block text-gray-700 font-bold">Title:</label>
            <input
              type="text"
              className="p-3 border-2 border-gray-300 rounded-lg w-full mt-2 focus:ring-2 
              focus:ring-amber-400 focus:outline-none transition duration-200 opacity-90"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              aria-label="Edit Book Title"
            />
          </div>

          {/* Input for Author */}
          <div>
            <label className="block text-gray-700 font-bold">Author:</label>
            <input
              type="text"
              className="p-3 border-2 border-gray-300 rounded-lg w-full mt-2 focus:ring-2 
              focus:ring-amber-400 focus:outline-none transition duration-200 opacity-90"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              required
              aria-label="Edit Book Author"
            />
          </div>

          {/* Input for Content */}
          <div>
            <label className="block text-gray-700 font-bold">Content:</label>
            <textarea
              className="p-3 h-80 border-2 border-gray-300 rounded-lg w-full mt-2 focus:ring-2 
              focus:ring-amber-400 focus:outline-none transition duration-200 opacity-90"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
              aria-label="Edit Book Content"
            />
          </div>
          
          {/* Input for Color */}
          <div>
            <label className="block text-gray-700 font-bold">Book Cover Color:</label>
            <input
              type="color"
              className="h-10 rounded-md w-10 mt-2 focus:ring-2 
              focus:ring-stone-400 focus:outline-none transition duration-200"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              aria-label="Edit Book Color"
            />
          </div>

          {/* Correct password of the book */}
          <div>
            <label className="block text-gray-700 font-bold">Password:</label>
            <input
              type="password"
              className="p-3 border-2 border-gray-300 rounded-lg w-full mt-2 focus:ring-2 
              focus:ring-amber-400 focus:outline-none transition duration-200 opacity-90"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              aria-label="Enter Book Password"
            />
            <p className="text-xs text-gray-500 mt-1">
              This password will be used to confirm the update.
            </p>
          </div>  
          
          <div className="flex justify-between">

            {/* Push to books page if cancel */}
            <button
              type="button"
              aria-label="Cancel the edit"
              onClick={() => router.push("/books")}
              className="bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600 transition"
            >
              Cancel
            </button>

            {/* Update the book */}
            <button
              type="submit"
              aria-label="Update the book"
              className="bg-amber-600 text-white py-2 px-4 rounded-md hover:bg-amber-700 transition"
            >
              Update
            </button>
            
          </div>

        </form>
      </div>
    </main>
  );
};

export default EditBook;
