"use client"
import React from 'react';

//*************save a book to MongoDB Button************

function AddBook({ book, saveDeleteHandle}) {
  const handleSaveBook = async (book) => {
    try {
      // Send the recently added book to the server
      const res = await fetch('https://nextjs-book-app.vercel.app/api/books', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: book.title,
          author: book.author.join(', '),
          image: book.image,
          description: book.description,
          boolean: book.boolean,
          bookId: book.id,
        }),
      });

      if (!res.ok) {
        throw new Error('Failed to add book');
      }
      saveDeleteHandle();
      
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <button className='btn btn btn-success ' onClick={() => handleSaveBook(book)}>
      save
    </button>
  );
}

export default AddBook;