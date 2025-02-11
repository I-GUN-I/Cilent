"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation"; // Import useParams for accessing route parameters

const EditBook = () => {
  const router = useRouter();
  const { id } = useParams(); // Use useParams to access the route parameters
  const [book, setBook] = useState<any>(null);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [content, setContent] = useState("");
  const [color, setColor] = useState("#ff5733");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true); // Track loading state

  useEffect(() => {
    if (!id) return; // Return if no id is found

    setLoading(true);
    fetch(`http://localhost:8000/books/api/${id}/`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch book details");
        }
        return res.json();
      })
      .then((data) => {
        setBook(data);
        setTitle(data.title);
        setAuthor(data.author);
        setContent(data.content);
        setColor(data.color);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const updatedBook = { title, author, content, color, password };

    try {
      const res = await fetch(`http://localhost:8000/books/api/${id}/`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedBook),
      });

      if (!res.ok) {
        throw new Error("Failed to update book");
      }

      router.push(`/books/${id}`); // Redirect to the book detail page after update
    } catch (err: any) {
      setError(err.message);
    }
  };

  // Show a loading message while fetching the book details
  if (loading) {
    return <div>Loading...</div>;
  }

  if (!book) {
    return <div>No book found.</div>;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="bg-white p-8 shadow-lg rounded-lg max-w-lg w-full">
        <h2 className="text-2xl font-bold text-center mb-6">Edit Book</h2>
        {error && <p className="text-red-500 text-center">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700">Title</label>
            <input
              type="text"
              className="w-full p-2 border rounded-md"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-gray-700">Author</label>
            <input
              type="text"
              className="w-full p-2 border rounded-md"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-gray-700">Content</label>
            <textarea
              className="w-full p-2 border rounded-md"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
            ></textarea>
          </div>

          <div>
            <label className="block text-gray-700">Book Cover Color</label>
            <input
              type="color"
              className="w-full h-10 rounded-md"
              value={color}
              onChange={(e) => setColor(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              className="w-full p-2 border rounded-md"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <p className="text-xs text-gray-500">This password will be used to confirm the update.</p>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
          >
            Update Book
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditBook;
