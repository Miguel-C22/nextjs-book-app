'use client'

//****************Grabs all the saved books from MongoDB and displays them for the user**************

import React, { useState, useEffect } from 'react';
import DeleteBook from './DeleteBook';
import useModel from '@/customHooks/modal';

const SavedBooks = () => {
  const [books, setBooks] = useState([]);
  const {modal, setModal} = useModel()
 
  
  const fetchData = async () => {
    try {
      const res = await fetch('http://localhost:3001/api/books', {
        cache: 'no-store',
      });

      if (!res.ok) {
        throw new Error('Failed to fetch books');
      }

      const result = await res.json();
      setBooks(result.books);
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []); // Empty dependency array ensures this effect runs once when the component mounts

  const handleBookDeleted = () => {
    fetchData(); // Refresh the list of books after deletion
  };

  return (
    <div className='flex flex-wrap justify-center  gap-20 px-8 mt-12'>
      {books.map((book, index) => (
        <div key={index} className='flex flex-col justify-center w-40'>
          {book.title.length < 25 ? <div>{book.title}</div> : <div>{book.title.slice(0, -20)}...</div>}
          <img
            onClick={() =>  setModal(index)}
            className="object-cover h-45 w-30"
            src={!book.boolean || book.boolean  ? book.image : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbJk-qCpmshndFRatcLSOB8GsyboaySnGpeS2GvkZsQShaZpccKqkkK4MkBRGbIVOBnzw&usqp=CAU'}
            alt={`Book cover ${index}`}
          />
          <div className='flex flex-col w-auto gap-2 mt-5'>
           <DeleteBook bookId={book.bookId} onBookDeleted={handleBookDeleted}/>
          </div>
          {modal === index ?<>
                <div className='fixed inset-0 bg-black bg-opacity-50 z-10'></div>
                <div className='fixed inset-0 flex items-center justify-center z-20'>
                  <div className="modal-box max-w-3xl pb-48 relative">
                    <button className='absolute top-0 right-0 mt-4 mr-4 btn btn-error' onClick={() => setModal(null)}>close</button>
                    <p className="text-xl font-bold">{book.title}</p>
                    <p className="pt-4 text-lg"><span className='font-bold text-lg'>Author:</span> {!book.author ? "N/A" : book.author}</p>
                    <div>
                      <p className="py-4"><span className='font-bold text-lg '>Description: </span>{!book.description ? "N/A" : book.description}</p>
                    </div>
                  </div>
                </div>
              </> : ""}
        </div>
      ))}
    </div>
  );
};

export default SavedBooks;