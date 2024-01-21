"use client"
import React from 'react'

//*********The is a custom hook that opens and closes the modal when the user clicks on any book*******

const useModal = () => {

    const [modal, setModal] = React.useState(null)
     
     React.useEffect(() => {
      modal !== null ? document.body.classList.add('overflow-hidden') : document.body.classList.remove('overflow-hidden')
      return () => {
        document.body.classList.remove('overflow-hidden');
      };
    }, [modal]);

  return {modal, setModal}
}

export default useModal