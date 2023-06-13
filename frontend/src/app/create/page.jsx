"use client";

import { useState, useEffect } from 'react';

import ImageToText from '@/components/ImageToText';
import InputField from '@/components/InputField';
import MetaTags from '@/components/MetaTags';

import FormData from 'form-data';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';

import { createEvaluation } from '../api/assessment/route';
import { useSession } from 'next-auth/react';


const CreateTopic = () => {
  const router = useRouter();
  
  const { data: session } = useSession();
  const author = (Number(Cookies.get('ID_MIABU')) || 0);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [year, setYear] = useState('');
  const [establishmentName, setEstablishmentName] = useState('');
  const [establishmentDescription, setEstablishmentDescription] = useState('');
  const [establishmentLocation, setEstablishmentLocation] = useState('');
  const [levelName, setLevelName] = useState('');
  const [courseName, setCourseName] = useState('');
  const [domainName, setDomainName] = useState('');
  // const [mediaFile, setMediaFile] = useState('');
  const [image, setImage] = useState('');

  const currentYear = new Date().getFullYear();
  const startYear = 2000;
  const yearRange = Array.from({ length: currentYear - startYear + 1 }, (_, index) => {
    const yearStart = startYear + index;
    const yearEnd = yearStart + 1;
    return `${yearStart}-${yearEnd}`;
  });

  // Callback function to receive content from child component
  const handleContentChange = (text) => {
    setContent(text);
  };

  // Callback function to receive image data from child component
  const handleImageChange = (data) => {
    setImage(data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Créer un nouvel objet FormData
    const formData = new FormData();
  
    // Ajouter les champs et leurs valeurs
    formData.append('title', title);
    formData.append('content', content);
    formData.append('author', author);
    formData.append('status', 'draft');
    formData.append('year', year);
    // formData.append('establishment.name', establishmentName);
    // formData.append('establishment.description', establishmentDescription);
    // formData.append('establishment.location', establishmentLocation);
    // formData.append('level.name', levelName);
    // formData.append('course.name', courseName);
    // formData.append('domain.name', domainName);
    // formData.append('media', mediaFile); 
    formData.append('image', image);

    for (const pair of formData.entries()) {
      console.log(pair[0] + ':', pair[1]);
    }
  
    // Envoyer la requête vers l'URL appropriée
    createEvaluation(formData).then((response) => {
      console.log(response);
      router.push('/success');
    })
  
    // Traiter la réponse
    // ...
  };

  useEffect(() => {
    if (!session) router.push('/')
  }, [])
  
  return (
    <>
      <MetaTags 
        title="Création | MiabuSUSU" 
        description="Partagez une épreuve" 
      />

      <section className='w-full max-w-full flex-start flex-col'>
        <div className='mt-10 w-full max-w-2xl flex flex-col gap-7'>
        <form onSubmit={handleSubmit}>
          <InputField
            name="title"
            type="text"
            label="Titre"
            value={title}
            required
            onChange={(e) => setTitle(e.target.value)}
          />

          <select
            name="year"
            value={year}
            required
            onChange={(e) => setYear(e.target.value)}
            className="block mt-5 px-4 py-2 mb-2 text-gray-800 bg-white border border-gray-300 focus:outline-none focus:border-red-500"
          >
            <option value="">Sélectionnez une année</option>
            {yearRange.map((yearOption) => (
              <option key={yearOption} value={yearOption}>
                {yearOption}
              </option>
            ))}
          </select>

          {/* <InputField
            name="establishment.name"
            type="text"
            label="Nom de l'établissement"
            value={establishmentName}
            required
            onChange={(e) => setEstablishmentName(e.target.value)}
          />

          <InputField
            name="establishment.description"
            type="text"
            label="Description de l'établissement"
            value={establishmentDescription}
            required
            onChange={(e) => setEstablishmentDescription(e.target.value)}
          />

          <InputField
            name="establishment.location"
            type="text"
            label="Emplacement de l'établissement"
            value={establishmentLocation}
            required
            onChange={(e) => setEstablishmentLocation(e.target.value)}
          />

          <InputField
            name="level.name"
            type="text"
            label="Niveau"
            value={levelName}
            required
            onChange={(e) => setLevelName(e.target.value)}
          />

          <InputField
            name="course.name"
            type="text"
            label="Cours"
            value={courseName}
            required
            onChange={(e) => setCourseName(e.target.value)}
          />

          <InputField
            name="domain.name"
            type="text"
            label="Domaine"
            value={domainName}
            required
            onChange={(e) => setDomainName(e.target.value)}
          /> */}

          <div className="mt-5">
            <ImageToText 
              onImageFromText={handleContentChange} 
              onImageUsed={handleImageChange}
            />
          </div>

          <div className="mt-5 flex justify-end">
            <button type='submit' className="w-1/2 px-3 py-2 text-white bg-rose-600 hover:bg-rose-700">
              Soumettre
            </button>
          </div>
        </form>

        </div>
      </section>
      
    </>
  )
}

export default CreateTopic;
