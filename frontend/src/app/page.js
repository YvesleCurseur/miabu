"use client";

import { useEffect, useState } from 'react'

import Sidebar from '@/components/Sidebar';
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
      {/* <Sidebar /> */}
      <section className="w-full flex-center flex-col">
        <h1 className="head_text text-center">
          Partagez vos anciens 
          <br className="max-md:hidden"/>
          {/* <span className="orange_gradient">AI</span> */}
        </h1>
        <h1 className="head_text text-center">
          sujets d'examens nationaux
          <br className="max-md:hidden"/>
          {/* <span className="orange_gradient">AI</span> */}
        </h1>
        <p className="desc text-center">Vous avez la possibilié de partager, rechercher et de télécharger vos anciens sujets d'examens nationaux Togolais</p>
        
        <Feed />
        
      </section>
    </div> 
  )
}
