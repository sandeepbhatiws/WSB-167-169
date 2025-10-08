"use client";
import React, { useEffect, useState } from 'react'
import HomeProducts from './HomeProducts'
import axios from 'axios';
import { toast } from 'react-toastify';

export default function Home({menProducts, womenProducts}) {

    console.log(process.env.NEXT_PUBLIC_BASE_URL);

  return (
    <>
      <HomeProducts title='Celebration wear for Men' description="Welcome to Bagtesh Fashion Buy Indian Men's Ethnic suits, Tuxedos, Sherwanis, Nehru jacket, Jodhpurs pants, Blazers, Shirts and much more." products = {menProducts}/>
      <HomeProducts title='Celebration wear for Women' description="Beautiful collection of Lehenga cholis, Sarees, Salwar suits for engagement, wedding and other ethnic occasions." products={womenProducts}/>
    </>
  )
}
