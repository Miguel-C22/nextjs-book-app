import { UserButton, currentUser, auth } from '@clerk/nextjs'
import React from 'react'

//**************This is the user photo on the top right on the navigation**************
const Account = async () => {
    const user  = await currentUser()
    const {userId} = auth()
  return (
    <div className=''>
        <UserButton afterSignOutUrl='/'/>
        {/* <p>{user.emailAddresses[0].emailAddress}</p> */}
    </div>
  )
}

export default Account