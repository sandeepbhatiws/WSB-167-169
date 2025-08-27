import React from 'react'

export default function Header() {

  var heading = 'Welcome To WsCube Tech';

  return (
    <>
        {/* <div>
        Welcome to WS
        </div>
        <div>
        Welcome to WS
        </div> */}


        <center className="header" style={{ backgroundColor : 'red', color : 'white' }}>
          <h1>{ heading }</h1>
        </center>
    </>
    
  )
}
