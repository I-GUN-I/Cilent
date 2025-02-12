"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

interface Book {
  id: number;
  title: string;
  author: string;
  content: string;
  color: string;
}

const BookDetail = () => {
  const { id } = useParams(); // Get book ID from URL
  const [book, setBook] = useState<Book | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    fetch(`http://localhost:8000/books/api/${id}/`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch book details");
        }
        return res.json();
      })
      .then((data) => setBook(data))
      .catch((err) => setError(err.message));
  }, [id]);


  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  if (!book) {
    return (
      <main className="min-h-screen p-10 flex flex-col items-center">
        {/* Background image */}
        <div
          className="absolute inset-0 bg-cover bg-center filter blur-md opacity-40 z-0"
          style={{
            backgroundImage:
              "url('https://images.squarespace-cdn.com/content/v1/59442018bebafb235d0aae1c/1602551093044-TYO6TJP1ZBQ3JKQYY2B6/Desmazieres-biblio-plongeante-sm.jpg')",
          }}
        />
      </main>
    );
  }

  return (
    <main className="min-h-screen p-10 flex flex-col items-center">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center filter blur-md opacity-40 z-0"
        style={{
          backgroundImage:
            "url('https://images.squarespace-cdn.com/content/v1/59442018bebafb235d0aae1c/1602551093044-TYO6TJP1ZBQ3JKQYY2B6/Desmazieres-biblio-plongeante-sm.jpg')",
        }}
      />

      {/* Book details container */}
      <div
        className="relative w-full max-w-3xl p-8 bg-white text-black bg-opacity-70 rounded-lg shadow-xl border border-gray-700 z-10"
        style={{ borderColor: book.color, borderWidth: '12px' }}
      >
        {/* Navigation links */}
        <div className="flex justify-between">
          <Link href="/books" className="text-gray-600 hover:text-gray-800 font-mono">
            &lt; Back
          </Link>
          <Link href={`/books/${id}/edit`} className="text-gray-600 hover:text-gray-800 font-mono">
            Edit &gt;
          </Link>
        </div>

        <h1 className="text-4xl font-bold text-center mb-4 font-serif">{book.title}</h1>
        <h2 className="text-lg text-center mb-6 italic font-sans">By {book.author}</h2>
        <p className="leading-relaxed font-mono">{book.content}</p>
      </div>
    </main>
  );

};

export default BookDetail;
