"use client";
import React, { useEffect, useState, useMemo } from "react";
import Image from "next/image";
import BookCard from "@/components/BookCard";
import Link from "next/link";

// For book object type
interface Book {
  id: number;
  title: string;
  author: string;
  color: string;
}

const Library = () => {
  // Book hold array of book object with empty array as default
  const [books, setBooks] = useState<Book[]>([]);
  // Error hold error string with Null as default
  const [error, setError] = useState<string | null>(null);
  // Search hold string input from user with empty as default
  const [search, setSearch] = useState<string>("");

  useEffect(() => {
    // Get books json then turn it to object and set any error to be display if it happend
    fetch("http://localhost:8000/books/api/")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch books"); //Throw error if fail to fetch
        return res.json();
      })
      .then((data) => setBooks(data))
      .catch((err) => setError(err.message));
  }, []); // Run once when mounted

  // Filter books by search input
  const filteredBooks = useMemo(() => {
    return books.filter((book) =>
      book.title.toLowerCase().includes(search.toLowerCase()) ||
      book.author.toLowerCase().includes(search.toLowerCase())
    );
  }, [books, search]); // useMemo will recalculates when books or search change, no re-rendering

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

      {/* Title of the web */}
      <h1 className="text-4xl text-[#4a2c29] font-bold text-center mb-8 tracking-wide drop-shadow-lg font-serif border-b border-gray-700 pb-4">
        The Library of Babel
      </h1>

      {/* Search bar */}
      <div className="mb-6 w-full max-w-sm z-20 opacity-30">
        <input
          type="text"
          placeholder="Search"
          aria-label="Search books"
          className="w-full p-2 bg-white text-black rounded-md border border-gray-400 focus:outline-none focus:ring-2 focus:ring-black"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Display book cards which also are Link, first one will be a create card that will send user to create page 
          the rest will be book card that if click will send user to that book detail page*/}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6 justify-center bg-stone-200 p-8 rounded-lg shadow-2xl border border-gray-800">
        {/* The create card*/}
        <Link
          href="/books/create"
          className="relative w-40 h-56 rounded-md shadow-xl border-2 border-dashed border-gray-900 flex flex-col justify-center items-center text-gray-500 hover:bg-yellow-300 hover:border-gray-400 transition font-serif z-10"
          aria-label="Add books"
        >
          <span className="text-6xl">+</span>
          <p className="mt-2 text-sm">Add Your Book</p>
        </Link>

        {/* Make book card for each book in filteredBooks array and prefetch the detail page*/}
        {filteredBooks.map((book) => (
          <Link key={book.id} href={`/books/${book.id}` } prefetch={true}> 
            <BookCard title={book.title} author={book.author} color={book.color} />
          </Link>
        ))}
      </div>

      {/* Display error in red text */}
      <p className="text-center text-red-500 mt-5">{error}</p>
    </main>
  );
};

export default Library;
