'use client'

//************This component let you search for any book by name and author and will display the book ***********

import React from 'react'
import axios from 'axios';
import DeleteBook from './DeleteBook';
import AddBook from './AddBook';
import useBookIds from '@/customHooks/savedBookId';
import useModel from '@/customHooks/modal';

function SpecificBook({bookKey}) {
    const [userTitle, setTitle] = React.useState("")
    const [userAuthor, setAuthor] = React.useState("")
    const [books, setBooks] = React.useState([]);
    const [toggle, setToggle ] = React.useState(false)
    const {modal, setModal} = useModel()
    const {bookIds, fetchData} = useBookIds()

     const handleSubmit = (e) =>{
       e.preventDefault()
       axios.get(`https://www.googleapis.com/books/v1/volumes?q=${userTitle}+inauthor:${userAuthor}&key=${bookKey}&maxResults=40`)
       .then(function (response) {
           const books = response.data.items.map(item => ({
               title: item.volumeInfo.title,
               author: item.volumeInfo.authors,
               description: item.volumeInfo.description,
               image: item.volumeInfo.imageLinks.thumbnail,
               boolean: item.volumeInfo.readingModes.image,
               id: item.id
             }));
           setBooks(books);
           setToggle(true)

       })
       .catch(function (error) {
           console.log(error);
           alert('Book Not found...')
       })
       .finally(function () {
       });
     }

     function clearForm(){
       setToggle(false)
       setTitle("")
       setAuthor("")
       setBooks(null)
     }
     const saveDeleteHandle = () => {
      fetchData()
    }
     return (
     <div className='flex flex-col items-center gap-20 py-10'>

       <form onSubmit={handleSubmit} className="join">
         <div className="flex flex-col md:flex-row items-center md:items-start w-full md:w-auto mx-2 md:mx-20">
           <input className="input input-bordered join-item w-full md:flex-grow" type="text" placeholder='Title...'  required value={userTitle} onChange={(e) => setTitle(e.target.value)} />
           <input className="input input-bordered join-item w-full md:flex-grow" type="text" placeholder='Author...' required value={userAuthor} onChange={(e) => setAuthor(e.target.value)} />
           <button className="btn join-item btn btn-active w-full md:w-auto md:flex-shrink-0 mt-0 md:mt-0 md:ml-0">Search</button>
           {toggle ? <button className='btn join-item btn btn-error w-full md:w-auto md:flex-shrink-0 mt-0 md:mt-0 md:ml-0' onClick={clearForm}>clear</button> : ""}
         </div>
       </form>
       {books ? 
       <div className='flex flex-wrap justify-center gap-20 px-8'>
         {books.map((book, index) => (
           <div key={index} className='flex flex-col w-40'>
             {book.title.length < 50 ? <div>{book.title}</div> : <div>{book.title.slice(0, -100)}...</div>}
             <img
               onClick={() => setModal(index) +  console.log(book)}
               className="object-cover h-50 w-30"
               src={!book.boolean || book.boolean ? book.image : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbJk-qCpmshndFRatcLSOB8GsyboaySnGpeS2GvkZsQShaZpccKqkkK4MkBRGbIVOBnzw&usqp=CAU'}
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
                   <p className="pt-4 text-lg"><span className='font-bold text-lg'>Author:</span> {book.author}</p>
                   <div className="modal-action">
                   <p className="py-4"><span className='font-bold text-lg'>Description:</span> {book.description}</p>
                   </div>
                 </div>
               </div>
             </> : ""}
           </div>
          ))}
          </div> : "" }
   </div>
 )
}


export default SpecificBook