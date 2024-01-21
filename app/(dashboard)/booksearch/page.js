import SpecificBook from '@/components/SpecificBook'
import React from 'react'

//*************This is the Get Specific Book page let you search for a book by title and author************

const bookUrl = `${process.env.BOOK_API_KEY}`
function page() {
  return (
    <div>
      <div className='text-center text-lg px-20 py-10'>
         <p><span className='text-xl font-bold'>Get the specific book you are looking for 📖</span><br></br>
        Enter in the book name and author down below <br></br>👇</p>
       </div>
      <SpecificBook bookKey={bookUrl}/>
    </div>
  )
}

export default page