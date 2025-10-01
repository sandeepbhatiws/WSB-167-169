'use client'
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';

export default function MyProfile() {

    const isLogin = useSelector((data) => {
        return data.login.value;
    })

    const router = useRouter();

    useEffect(() => {
        console.log(isLogin);
        if(isLogin == 0){
            router.push('/');
        }
    },[isLogin]);

  return (
    <div>
      My Profile
    </div>
  )
}
