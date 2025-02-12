"use client";

import Link from "next/link";

const Enter = () => {
  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center text-center p-10">
      <div
        className="absolute inset-0 bg-cover bg-center filter blur-sm opacity-40 z-0"
        style={{
          backgroundImage:
            "url('https://substackcdn.com/image/fetch/f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fa859f04f-c4b2-46c4-95a1-ba57ba44d14a_2560x1535.jpeg')",
        }}
      />
      
      <div className="relative z-10 max-w-3xl bg-white bg-opacity-80 p-10 rounded-lg shadow-lg">
        <h1 className="text-5xl font-bold text-[#4a2c19] drop-shadow-lg font-serif mb-6">
          The Library of Babel
        </h1>
        
        <p className="text-lg text-gray-800 mb-6 font-sans ">
          The Library of Babel is an infinite archive of every possible book, 
          containing every combination of characters imaginable. Inspired by 
          Jorge Luis Borges' short story, this website allows you to create and 
          store your own books in a limitless virtual library.
        </p>

        <p className="text-lg text-gray-800 mb-8 font-sans ">
          Here in the library, you can anonymously add books, customize their appearance, and 
          set a password for the future you to edits. There are no accounts, no records. only your books 
          and the words you leave behind forever in the infinity.
        </p>

        <Link href="/books">
          <button className="bg-amber-700 text-white px-8 py-4 text-xl font-semibold rounded-lg shadow-lg border border-gray-900 
            hover:bg-amber-900 hover:shadow-2xl transition-all duration-300">
            Enter the Library
          </button>
        </Link>
      </div>
    </main>
  );
};

export default Enter;