"use client"
 import React from 'react';

 //************Delete Button that deletes a book from MongoDB***********

function DeleteBook({ bookId, onBookDeleted, saveDeleteHandle }) {

  const removeTopic = async () => {
    try {
      const res = await fetch(`https://nextjs-book-p1pmkgvkr-miguels-projects-6109f807.vercel.app/api/books?bookId=${bookId}`, {
        method: "DELETE"
      });

      if (res.ok) {
        onBookDeleted();
      } else {
        console.error('Failed to delete book');
      }
    } catch (error) {
      console.error('Error deleting book:', error);
    }
    if(!onBookDeleted){
      saveDeleteHandle();
    }

  };
  return (
    <button className='btn btn-error' onClick={removeTopic}>
      Remove
    </button>
  );
}

export default DeleteBook;