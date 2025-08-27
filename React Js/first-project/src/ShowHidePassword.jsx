import React, { useState } from 'react'

export default function ShowHidePassword() {

    const [status, setStatus] = useState(1);

    const showPassword = () => {
        setStatus(!status);
    }

  return (
    <>

        <center>
            <input type={ status ? 'password' : 'text' }/>
        </center>
        <center>
            <button onClick={ showPassword } >{ status ? 'Show Password' : 'Hide Password' } </button>
        </center>
    </>
  )
}
