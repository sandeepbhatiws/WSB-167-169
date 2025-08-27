import React, { useState } from 'react'
import Header from './Header'

export default function Home() {

    var status = 1;

    // var counter = 0;

    var [counter, setCounter] = useState(0);  // [], 'Hello', ''

    var count = () => {
        counter++;
        setCounter(counter);
        console.log(counter);
    }

  return (
    <>
      <Header/>

      <center style={{ display : `${ (status) ? 'none' : '' }` }}>
        <button onClick={ count }>Click ME ({ counter })</button>
      </center>

        {/* {
            status == 1
            ?
            'Status is Active'
            :
            'Status is Inactive'
        } */}

    </>
  )
}
