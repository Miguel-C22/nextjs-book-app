"use client"
 import React from 'react';

 //************Delete Button that deletes a book from MongoDB***********

function DeleteBook({ bookId, onBookDeleted, saveDeleteHandle }) {

  const removeTopic = async () => {
    try {
      const res = await fetch(`http://localhost:3001/api/books?bookId=${bookId}`, {
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