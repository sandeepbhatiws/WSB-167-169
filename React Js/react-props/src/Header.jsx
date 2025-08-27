import React from 'react'

// Method 1
// export default function Header(data) {

//     console.log(data.htitle);


//   return (
//     // <>
//     //   <center>
//     //     <h1>{ data.htitle }</h1>
//     //     <p>{ data.description }</p>
//     //   </center>
//     // </>
//   )
// }

// Method 2
export default function Header({ htitle, description, children }) {
  return (
    <>
      <center>
        <h1>{ htitle }</h1>
        <p>{ description }</p>

        <p>{children}</p>
      </center>
    </>
  )
}
