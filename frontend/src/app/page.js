"use client";

import Image from 'next/image'
import Sidebar from '@/components/Sidebar';
import { useEffect, useState } from 'react'
import Feed from '@/components/Feed';
import { getHelloWorld } from './api/hello-world/route';

export default function Home() {

  const [message, setMessage] = useState('');

  useEffect(() => {
    getHelloWorld().then((response) => {
      setMessage(response.message);
    })
  }, []);
  
  return (
    <div className='flex'>
      <Sidebar />
      {message ?
        <h1 className='text-[250px] font-bold'>{message}</h1>
        : 
        <h1 className='text-[250px] font-bold'>Loading...</h1>
      }
      <Feed />
    </div> 
  )
}
