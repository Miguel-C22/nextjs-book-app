import React from 'react'
import Books from "@/components/Home"

//************Main home page once users are signed in this is the home page they are directed to every time************

const bookUrl = `${process.env.BOOK_API_KEY}`
function page() {
  return (
    <div>
      <div className='text-center text-lg px-20 py-10'>
          <p><span className='text-xl font-bold'>Welcome!🖐️</span><br></br>
          This is a Book App made with Next.js, Tailwind and DaisyUI and much more.<br></br>
          This application lets you search for any book you can think of 🤔 If you need any help or more info on a specific book feel free to chat with our ChatBot 🤖</p>
      </div>
        <Books bookKey={bookUrl}/>
    </div>
  )
}

export default page