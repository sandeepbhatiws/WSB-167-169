"use client"
import ProductDetail from '@/app/Components/ProductDetail';
import ProductLisitng from '@/app/Components/ProductLisitng'
import { useParams } from 'next/navigation'
import React from 'react'

export default function page() {

  const params = useParams();

  console.log(params);

  return (
    <>
      {
        params.category.length == 2
        ?
          <ProductDetail id={params.category[1]}/>
        :
          <ProductLisitng/>
      }
      
    </>
  )
}
