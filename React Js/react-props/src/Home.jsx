import React from 'react'
import Header from './Header'
import Description from './Description';

export default function Home() {

    var title = "Welcome to WS";
    var description = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem nobis sapiente beatae quibusdam quasi sint? Cumque laboriosam praesentium, consequatur repellendus est hic amet ipsam quis sed ullam iste minima harum?";

    var numbers = [54,43,56,32,14];

  return (
    <>
      {/* <Header htitle={title} description={description}/> */}

      <Header htitle={title} description={description}>
        <Description/>
      </Header>


      {
        numbers.map((value,index) => {
            return(
                <div key={index}>
                    {value}
                </div>
            )
        })
      }
    </>
  )
}
