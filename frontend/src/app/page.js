"use client";

import Image from 'next/image'
import Sidebar from '@/components/Sidebar';
import { useEffect, useState } from 'react'

export default function Home() {

  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch('http://127.0.0.1:8000/v1/hello-world/')
      .then((response) => response.json())
      .then((data) => setMessage(data.message))
      .catch((error) => console.error(error));
  }, []);

  
  return (
    <div className='flex'>
      <Sidebar />
      <h1 className='text-[250px] font-bold'>{message}</h1>
    </div> 
  )
}
