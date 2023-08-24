"use client";

import { useState, useEffect } from "react";
import { createWorker }  from 'tesseract.js'

import CloseSvg from "../../public/icons/CloseSvg";
import PopUp from "./PopUp";

import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";

const ReactQuill = dynamic(() => import("react-quill"), { 
  ssr: false,
  loading: () => <p>Chargement ...</p>,
});

const modules = {
  toolbar: [
    [{ header: '1' }, { header: '2' }, { header: '3' }, { font: [] }],
    [{ size: [] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [
      { list: 'ordered' },
      { list: 'bullet' },
      { indent: '-1' },
      { indent: '+1' },
    ],
    ['link', 'image', 'video'],
    ['clean'],
  ],
  clipboard: {
    // toggle to add extra line breaks when pasting HTML:
    matchVisual: false,
  },
}


const ImageToText = (props) => {
  const [files, setFiles] = useState([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [textResult, setTextResult] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  /* Ajout d'image */
  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
  
    const allowedTypes = [
      "image/jpeg", 
      "image/png", 
      "application/msword", 
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];
  
    const filteredFiles = selectedFiles.filter((file) =>
      allowedTypes.includes(file.type)
    );
  
    const invalidFiles = selectedFiles.filter((file) =>
      !allowedTypes.includes(file.type)
    );
  
    if (invalidFiles.length > 0) {
      setError("Le fichier doit être de type JPEG, PNG, GIF, PDF, DOC ou TXT");
      setShowPopup(true);
      return;
    }
  
    const newFiles = [...files, ...filteredFiles];
  
    setFiles(newFiles);
    setError("");
  };  
  
  const handleRemoveFile = (index) => {
    const newFiles = [...files];
    newFiles.splice(index, 1);
    setFiles(newFiles);
  };

  useEffect(() => {
    const handleUnload = (e) => {
      if (files.length > 0) {
        e.preventDefault();
        e.returnValue = '';
      }
    };

    window.addEventListener('beforeunload', handleUnload);

    return () => {
      window.removeEventListener('beforeunload', handleUnload);
    };
  }, [files]);

  /* Image to text */
  const getTextFromImage = async () => {
    // Vérifie s'il y a des fichiers à traiter
    if (files.length === 0) {
      setShowPopup(true);
      setError("Aucune image à transcrire");
      return;
    }
    // Indique que le chargement est en cours
    setIsLoading(true);
    // Récupère le premier fichier de la liste
    const file = files[0];
    // Crée un worker pour le traitement de l'image
    const worker = await createWorker();
    await worker.load();
    // Charge la langue française pour la reconnaissance de texte
    await worker.loadLanguage('fra');
    // Initialise le worker avec la langue française
    await worker.initialize('fra');
    // Utilise le worker pour reconnaître le texte dans l'image
    const { data: { text } } = await worker.recognize(file);
    console.log(text);
    // Met à jour le résultat du texte
    setTextResult(text);
    // Appelle la fonction fournie pour traiter le texte
    props.onImageFromText(text);
    // Indique que le fichier image a été utilisé
    props.onImageUsed(file);
    // Termine le chargement
    setIsLoading(false);
  }
  

    props.onImageUsed(files)
    props.onImageFromText(textResult)

  return (

    <>
      {/* Ajouter une image */}
      <div className="mb-4">
      <p className="border p-4 mb-4 border-gray-200 hover:bg-white cursor-help">
          <u><strong>Étape 2</strong></u>: Ajouter des images ou un document Word<br/><br/>

          En cliquant sur le bouton ci-dessous, vous pouvez ajouter plusieurs images simultanément, dans les formats acceptés tels que JPEG, PNG ou un document Word unique.
      </p>


        <label
          htmlFor="inputImage"
          className="text-sm w-full px-3 py-2 text-white bg-rose-500 hover:bg-rose-600"
          style={{cursor:"pointer"}}
        >
          Ajouter un fichier
        </label>
        <input
          type="file"
          id="inputImage"
          accept="image/jpeg, image/png, image/gif, application/pdf, application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document"
          multiple
          className="hidden"
          onChange={handleFileChange}
        />
      </div>

      {/* Affichage des images ajoutées */}
      <div className="flex flex-wrap -mx-2">
        {files.map((file, index) => (
          <div key={index} className="relative w-32 h-32 mx-2 my-2 mb-5">
            {/* Affichage de l'image ou de l'icône de fichier selon le type */}
            {file.type.startsWith("image/") ? (
              <div>
                <img 
                  id="imagePrint"
                  src={URL.createObjectURL(file)} 
                  alt="Image preview" 
                  className="w-32 h-32 object-cover rounded-md images-container" 
                />
                <p className="text-sm truncate">{file.name}</p>
              </div>
            ) : file.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ? (
              <div>
                <div 
                  className="w-32 h-32 bg-gray-200 rounded-md flex items-center justify-center"
                >
                  <span className="text-4xl text-gray-400">
                    <i className="far fa-file-word"></i>
                  </span>
                </div>
                <p className="text-sm truncate">{file.name}</p>
              </div>
            ) : file.type === "application/msword" ? (
              <div>
                <div 
                  className="w-32 h-32 bg-gray-200 rounded-md flex items-center justify-center"
                >
                  <span className="text-4xl text-gray-400">
                    <i className="far fa-file-word"></i>
                  </span>
                </div>
                <p className="text-sm truncate">{file.name}</p>
              </div>
            ) : (
              null
            )}
            {/* Bouton de suppression de l'image */}
            <div
              className="absolute top-0 right-0 cursor-pointer text-blue-500"
              onClick={() => handleRemoveFile(index)}
            >
              <CloseSvg />
            </div>
          </div>
        ))}
      </div>

      <p className="border p-4 mb-4 border-gray-200 hover:bg-white cursor-help">
          <u><strong>Étape 3</strong></u>: (facultative) De l'image au texte
          <br/>
          <br/>
          Une fois que vous avez ajouté votre image, utilisez la fonctionnalité "Retranscrire" pour obtenir le texte contenu dans l'image. Elle permet d'extraire facilement le texte d'une image téléchargée. Veuillez noter que cette option sera désactivée si vous avez sélectionné plus d'une image ou un document Word.
      </p>

      {/* Bouton "Retranscrire" */}
      {console.log(files)}
      <button 
        id="retranscribe-btn" 
        className="text-sm w-full px-3 py-2 mb-2 text-blue-500 bg-gray-200 hover:bg-gray-300"
        type="button"
        onClick={getTextFromImage}
        disabled={isLoading || files.length > 1 || (files.length === 1 && files[0]?.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document")} 
        >
        {files.length > 1
          ? "Désactiver"
          : isLoading
          ? "Chargement..."
          : "Retranscrire"}
      </button>
      
      <p className="border p-4 mb-4 border-gray-200 hover:bg-white cursor-help">
        <u><strong>Étape 4</strong></u>: (facultative) Texte retranscrit de l'image 
        <br/>
        <br/>
        Le texte de l'image retranscrit s'affichera ici. Vous pouvez le modifier à votre guise en utilisant l'éditeur de texte ci-dessus. Cela vous permet de corriger ou d'améliorer le texte extrait si nécessaire.
      </p>

      {/* Éditeur de texte */}
      <ReactQuill
        placeholder="Le texte de l'image s'affichera ici, vous pouvez le modifier à votre guise"
        modules={modules}
        className="w-full h-auto bg-white border-gray-300 shadow-sm placeholder-gray-400 focus:outline-none focus:ring-rose-600 focus:border-rose-600 preserve-indent"
        id="outputText"
        value={textResult || ""}
        onChange={(value) => setTextResult(value)}
      />
      
      {/* Affichage du message d'erreur */}
      {showPopup && error && (
        <PopUp 
          type="error"
          title="Erreur |"
          message={error}
          onClose={() => setShowPopup(false)}
          duration={4000} // Le popup sera affiché pendant 4 secondes
        />
      )}
    </>
  );
};

export default ImageToText;