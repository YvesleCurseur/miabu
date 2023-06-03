"use client";

import { useState } from 'react';
import ImageToText from '@/components/ImageToText';
import InputField from '@/components/InputField';

const CreateTopic = () => {
  const handleImagefromText = (text) => {
    console.log('Text', text);
  }

  return (
    <section className='w-full max-w-full flex-start flex-col'>
      <div className='mt-10 w-full max-w-2xl flex flex-col gap-7'>
        <form action="/send-data-here" method="post">
          <label htmlFor="title" className="block text-xl font-medium text-gray-700">
            Titre
          </label>
          <input
            id="title"
            name="title"
            type="text"
            autoComplete="title"
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            // onChange={(e) => setPassword(e.target.value)}
          />
          <div className="mt-5">
            <ImageToText onImagefromText={handleImagefromText}/>
          </div>
          <div className="mt-5 flex justify-end">
            <button type="submit" className="w-1/2 px-3 py-2 text-white bg-rose-600 hover:bg-rose-700">Soumettre</button>
          </div>
        </form>
      </div>
    </section>
  )
}

export default CreateTopic;
