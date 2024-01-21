import { SignIn } from '@clerk/nextjs'
import React from 'react'

//***********Custom sign In page**********

function SignInPage() {
  return (
    <div className='min-h-screen flex justify-center items-center'>
        <SignIn />
    </div>
    
  )
}

export default SignInPage