'use client'

//*************This Displays random books right away to the use on the home page******************

import React from 'react';
import axios from 'axios';
import DeleteBook from './DeleteBook';
import AddBook from './AddBook';
import useBookIds from '@/customHooks/savedBookId';
import useModel from '@/customHooks/modal';

function DisplayBooks({ bookKey }) {
  const [books, setBooks] = React.useState([]);
  const {bookIds, fetchData} = useBookIds()
  const {modal, setModal} = useModel()
  

  React.useEffect(() => {
    axios.get(`https://www.googleapis.com/books/v1/volumes?q=books&startIndex=0&maxResults=40&orderBy=newest&printType=books&key=${bookKey}`)
      .then(function (response) {
        const fetchedBooks = response.data.items.map(item => ({
          title: item.volumeInfo.title,
          author: item.volumeInfo.authors,
          image: item.volumeInfo.imageLinks.thumbnail,
          // readingModeImage: item.volumeInfo.readingModes.image,
          description: item.volumeInfo.description,
          boolean: item.volumeInfo.readingModes.image,
          id: item.id
        }));
        setBooks(fetchedBooks);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [bookKey]);

  const saveDeleteHandle = () => {
    fetchData()
  }

  return (
    <div className='flex flex-wrap justify-center  gap-20 px-8'>
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
            {bookIds.includes(book.id) ? <DeleteBook bookId={book.id} saveDeleteHandle={saveDeleteHandle}/> : <AddBook book={book}  saveDeleteHandle={saveDeleteHandle}/>  }
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
}

export default DisplayBooks;