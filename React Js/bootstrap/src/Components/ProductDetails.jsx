import React from 'react'
import { useParams } from 'react-router'

export default function ProductDetails() {

    const params = useParams();

    console.log(params.id);

  return (
    <>
      
    </>
  )
}
