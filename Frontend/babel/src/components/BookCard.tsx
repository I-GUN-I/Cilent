import React from "react";
//Props
interface BookProps {
  title: string;
  author: string;
  color: string;
}

const BookCard: React.FC<BookProps> = ({ title, author, color }) => {
  return (
    // Make each card look like a book, will hidden the overflowed text
    <div
      className="relative w-40 h-56 rounded-md shadow-xl border border-gray-700 p-4 flex flex-col justify-between overflow-hidden bg-opacity-90"
      style={{ backgroundColor: color, borderRadius: '4px', boxShadow: '0px 4px 10px rgba(0,0,0,0.8)' }}
    >
      <h3 className="text-shadow text-shadow-y-sm text-shadow-blur-2 text-lg text-white font-bold drop-shadow-xl tracking-wide font-serif">{title}</h3>
      <p className="text-shadow text-shadow-y-md text-shadow-blur-2 text-sm text-white font-medium italic drop-shadow-xl font-serif">by {author}</p>
      
      {/* Book spine effect */}
      <div className="absolute -left-2 top-1 w-3 h-full bg-gray-900 opacity-40 rounded-l-md"></div>
    </div>
  );
};

export default BookCard;