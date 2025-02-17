"use client";
import React, { useEffect, useState, useMemo } from "react";
import Image from "next/image";
import BookCard from "@/components/BookCard";
import Link from "next/link";

interface Book {
  id: number;
  title: string;
  author: string;
  color: string;
}

const Library = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState<string>("");

  useEffect(() => {
    fetch("http://localhost:8000/books/api/")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch books");
        return res.json();
      })
      .then((data) => setBooks(data))
      .catch((err) => setError(err.message));
  }, []);

  const filteredBooks = useMemo(() => {
    return books.filter((book) =>
      book.title.toLowerCase().includes(search.toLowerCase()) ||
      book.author.toLowerCase().includes(search.toLowerCase())
    );
  }, [books, search]);

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

      <h1 className="text-4xl text-[#4a2c29] font-bold text-center mb-8 tracking-wide drop-shadow-lg font-serif border-b border-gray-700 pb-4">
        The Library of Babel
      </h1>

      <div className="mb-6 w-full max-w-sm z-20 opacity-30">
        <input
          type="text"
          placeholder="Search"
          className="w-full p-2 bg-white text-black rounded-md border border-gray-400 focus:outline-none focus:ring-2 focus:ring-black"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6 justify-center bg-stone-200 p-8 rounded-lg shadow-2xl border border-gray-800">
        <Link
          href="/books/create"
          className="relative w-40 h-56 rounded-md shadow-xl border-2 border-dashed border-gray-900 flex flex-col justify-center items-center text-gray-500 hover:bg-yellow-300 hover:border-gray-400 transition font-serif z-10"
        >
          <span className="text-6xl">+</span>
          <p className="mt-2 text-sm">Add Your Book</p>
        </Link>
        {filteredBooks.map((book) => (
          <Link key={book.id} href={`/books/${book.id}`}>
            <BookCard title={book.title} author={book.author} color={book.color} />
          </Link>
        ))}
      </div>
      <p className="text-center text-red-500 mt-5">{error}</p>
    </main>
  );
};

export default Library;
