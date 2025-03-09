"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
// Book object type
interface Book {
  title: string;
  author: string;
  content: string;
  color: string;
}

const BookDetail = () => {
  const { id } = useParams(); // Get book ID from URL
  const [book, setBook] = useState<Book | null>(null); // Book object, need to handle when null cause accessing properties
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(`http://localhost:8000/books/api/${id}/`) // Fetch book object with id from url
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch book details"); // Throw error if fail to fetch
        }
        return res.json(); // JSON to object
      })
      .then((data) => setBook(data)) // Set book object
      .catch((err) => setError(err.message)); // Set error message
  }, []);

  if (!book) { // Conditional render, If book is null only display background image
    return (
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
      </main>
    );
  }

  return (
    // Display Book 'ID' detail
    <main className="relative min-h-screen p-10 flex flex-col items-center">
      <div className="inset-0 w-full h-full">
        {/* Background Image */}
        <Image
          src="https://images.squarespace-cdn.com/content/v1/59442018bebafb235d0aae1c/1602551093044-TYO6TJP1ZBQ3JKQYY2B6/Desmazieres-biblio-plongeante-sm.jpg"
          alt="Library Background"
          fill
          className="opacity-40 blur-md object-cover"
          priority
        />
      </div>

      {/* Book details container, get border color from book data */}
      <div
        className="relative w-full max-w-4xl p-8 bg-white text-black bg-opacity-70 rounded-lg shadow-xl border border-gray-700 z-10"
        style={{ borderColor: book.color, borderWidth: '12px' }}
      >
        
        {/* Error message*/}
        <p className="text-center text-red-500">{error}</p>

        {/* Navigation link, back to books page and go to edit page */}
        <div className="flex justify-between">
          <Link href="/books" className="text-gray-600 hover:text-gray-800 font-mono" aria-label="Go Back">
            &lt; Back
          </Link>
          <Link href={`/books/${id}/edit`} className="text-gray-600 hover:text-gray-800 font-mono" aria-label="Edit the book">
            Edit &gt;
          </Link>
        </div>

        {/* Book Content Breakword in-case the text is looooooooooooooog */}
        <div className="max-w-full break-words">
          <h1 className="text-4xl font-bold text-center mb-4 font-serif" aria-label="Book title">{book.title}</h1>
          <h2 className="text-lg text-center mb-6 italic font-sans" aria-label="Book author">By {book.author}</h2>
          <p className="leading-relaxed font-mono" aria-label="Book content">{book.content}</p>
        </div>
      </div>
    </main>
  );

};

export default BookDetail;
