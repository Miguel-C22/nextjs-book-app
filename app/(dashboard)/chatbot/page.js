import ChatBot from '@/components/ChatBot'
import React from 'react'

//**********Chat Bot Page**********

function page() {
  return (
    <div className='flex flex-col items-center px-20 py-10'>
        <div className='mb-12 text-center'>
            <p>⚠️Please use these keywords since our Chatbot is only answering to specific questions that our book related⚠️</p>
            <p>keywords: [book, novel, author, reading, literature, manga, magazines]</p>
        </div>
        <ChatBot />
    </div>
  )
}

export default page