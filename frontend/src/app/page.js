"use client";

import Image from 'next/image'
import Sidebar from '@/components/Sidebar';
import { useEffect, useState } from 'react'
import Feed from '@/components/Feed';
import { getHelloWorld } from './api/hello-world/route';
import Head from 'next/head';

export default function Home() {
  
  return (
    <>
    <div className='flex'>
      {/* <Sidebar /> */}
      <section className="w-full flex-center flex-col">
        <h1 className="head_text text-center">
          Partager vos épreuves.
          <br className="max-md:hidden"/>
        </h1>
        <p className="desc text-center">Vous avez la possibilié de partager et de télécharger vos épreuves</p>
        {/* <Feed /> */}
      </section>
    </div>
    </> 
  )
}
