import { SignUp } from '@clerk/nextjs'
import React from 'react'

//*******Custom sign up page*********

function SignUpPage() {
  return (
    <div className='min-h-screen flex justify-center items-center'>
        <SignUp />
    </div>
  )
}

export default SignUpPage