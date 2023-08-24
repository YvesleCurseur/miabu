"use client";

import { useState, useEffect } from 'react';

import ImageToText from '@/components/ImageToText';
import InputField from '@/components/InputField';
import MetaTags from '@/components/MetaTags';
import PopUp from '@/components/PopUp';
import Loading from '@/components/Loading';

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
  const [mediaFile, setMediaFile] = useState([]);
  const [images, setImages] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  // Callback function to receive content from child component
  const handleContentChange = (text) => {
    setContent(text);
  };

  // Callback function to receive image data from child component
  const handleImageChange = (data) => {
    // Vérifier si l'objet data est une liste non vide
    if (Array.isArray(data) && data.length > 0) {
      const fileType = data[0].type;
      console.log(fileType);
  
      // Vérifier si le fichier est un document Word
      const isWordDocument =
        fileType === "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
  
      // Vérifier si le fichier est une image JPEG ou PNG
      const isImage = fileType === "image/jpeg" || fileType === "image/png";
  
      if (isWordDocument) {
        setMediaFile(data); // Définir le fichier média en tant que document Word
        setImages(null); // Réinitialiser les images
      } else if (isImage) {
        setImages(data); // Définir les images
        setMediaFile(null); // Réinitialiser le fichier média
      } else {
        // Le type de fichier n'est pas pris en charge, gérer ce cas d'erreur ici
        console.log("Type de fichier non pris en charge");
      }
    } else {
      // Le paramètre data est vide ou n'est pas une liste, gérer ce cas d'erreur ici
      console.log("Données non valides");
    }
  
    console.log(mediaFile);
  };
  

  const handleSubmit = async (e) => {
    setIsLoading(true);

    e.preventDefault();

    // Créer un nouvel objet FormData
    const formData = new FormData();
    // Ajouter les champs et leurs valeurs
    formData.append('title', title);
    formData.append('content', content);
    formData.append('author', author);
    formData.append('status', 'draft');
    if (mediaFile) {
      formData.append('media', mediaFile[0]);
    }
    // Append each image file individually
    if (images && Array.isArray(images)) {
      images.forEach((file) => {
      formData.append(`images`, file);
    });
    }

    for (const pair of formData.entries()) {
      console.log(pair[0] + ':', pair[1]);
    }

    // Envoyer la requête vers l'URL appropriée
    createEvaluation(formData).then((response) => {
      console.log(response)
      setShowPopup(true)
      setIsLoading(false)
      router.push('/success')
    }).catch((error) => {
      setIsLoading(false)
      setError(true)
      setShowPopup(true)
    })

  };

  // useEffect(() => {
  //   if (!session) router.push('/')
  // }, [])
  
  return (
<>
  <MetaTags 
    title="Création | MiabuSUSU" 
    description="Partagez une épreuve" 
  />
  <section className='w-full max-w-full flex-start flex-col'>
    <div className='mt-10 w-full max-w-2xl flex flex-col gap-7'>
      <form onSubmit={handleSubmit}>
        {/* Champ de saisie pour le titre */}
        <p className='border p-4 mb-4 border-gray-200 hover:bg-white cursor-help'>
            <u><strong>Étape 1</strong></u>: Entrez un titre pour votre épreuve
            <br/>
            <br/>
            Lors de cette étape, veuillez choisir un titre clair et informatif pour votre épreuve, qui sera affiché aux autres utilisateurs. Ce titre aidera les participants potentiels à comprendre de quoi traite l'épreuve. Choisissez un titre attrayant et concis pour susciter l'intérêt des participants !
            <br/>
            <br/>
            <strong>Ex: Bac 2015 Philosophie Série A4, D, C Session (Normale ou Malade)</strong> 
        </p>

        <InputField
          name="title"
          type="text"
          label="Titre"
          value={title}
          required
          onChange={(e) => setTitle(e.target.value)}
        />

        {/* Affichage du message de réussite après soumission */}
        {showPopup && (
          <PopUp
            type={error ? "error" : ""}
            title={error ? "Erreur |" : ""}
            message={error ? "Erreur du téléchargement de l\'épreuve ! Veuillez vérifier si vous avez inscrit un titre, une image ou un fichier correct pour l'enregistrement." : ""}
            onClose={() => setShowPopup(false)}
            duration={5000} // Le popup sera affiché pendant 4 secondes
          />
        )}

        {/* Importer une image pour le contenu */}

        <div className="mt-5">
          <ImageToText 
            onImageFromText={handleContentChange} 
            onImageUsed={handleImageChange}
          />
        </div>

        <p className="border p-4 mt-4 border-gray-200 hover:bg-white cursor-help">
          <u><strong>Étape finale</strong></u>: Soumission
          <br/>
          <br/>
          Après avoir effectué toutes les étapes nécessaires, cliquez sur ce bouton de soumission ci-dessous pour valider votre action. Le bouton sera désactivé pendant le chargement pour éviter les doublons. 
        </p>
        {/* Bouton de soumission */}
        <div className="mt-5 flex justify-end">
          <button
            type='submit'
            className="text-sm w-1/2 px-3 py-2 mb-5 text-white bg-rose-500 hover:bg-rose-600"
            // onClick={handleSubmit}
            disabled={isLoading} // Désactiver le bouton pendant le chargement
          >
            {isLoading ? "Soumission..." : "Soumettre" }
          </button>
        </div>
      </form>
    </div>
  </section>
</>

  )
}

export default CreateTopic;
