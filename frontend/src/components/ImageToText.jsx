"use client";

import { useState, useEffect } from "react";
import { createWorker }  from 'tesseract.js'

import ReactQuill from "react-quill";
import EditorToolbar, { modules, formats } from "./EditorToolbar";
import "react-quill/dist/quill.snow.css";
// import "./TextEditor.css";


/* 
Fonctionnalité
- On ne peut que retranscrire une image à la fois 
- Poster une épreuve vous pouvez mettre le recto et le verso
- Permettre l'insertion d'image dans le textarea
- Poster une question une seule image
*/

const ImageToText = () => {
  const [files, setFiles] = useState([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [textResult, setTextResult] = useState("");

  /* Ajout d'image */
  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
  
    const allowedTypes = [
      "image/jpeg", 
      "image/png", 
      "application/pdf", 
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

    const imagesContainer = document.getElementById('imagePrint');
    if (!imagesContainer) {
        setError("Aucune image à transcrire");
        return;
    }
    setIsLoading(true)
    const worker = await createWorker()
    await worker.load()
    await worker.loadLanguage('eng')
    await worker.initialize('eng')

    const { data: { text } } = await worker.recognize(imagesContainer.src);
    console.log(text)

    setTextResult(text)
    setIsLoading(false)
    
    }

  return (

    <div className="container mx-auto p-4">

      <div className="mb-4">
        <label
          htmlFor="inputImage"
          className="text-sm w-full px-4 py-2 text-white bg-rose-600 hover:bg-rose-700"
          style={{cursor:"pointer"}}
        >
          {files.length > 0 ? "Ajouter d'autres images" : "Ajouter une image"}
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

      <button 
        id="retranscribe-btn" 
        className="text-sm w-full px-4 py-2 mb-2 text-blue-500 bg-gray-200 hover:bg-gray-300"
        onClick={getTextFromImage}
        disabled={isLoading}
      >
        {isLoading ? "Loading..." : "Retranscrire"}
      </button>

            <EditorToolbar 
              toolbarId={'t1'}
            />
            <ReactQuill
              placeholder="Le texte de l'image s'afichera ici, vous pouvez le modifier à votre guise"
              modules={modules('t1')}
              formats={formats}
              className="w-full h-60"
              id="outputText"
              value={textResult || ""}
              onChange={(content) => setTextResult(content)}
            />

      {error && (
        <div className="bg-red-500 text-white px-4 py-2 rounded-md mb-4">
          {error}
        </div>
      )}

      <div className="flex flex-wrap -mx-2">
        {files.map((file, index) => (
          <div key={index} className="relative w-32 h-32 mx-2 my-2 mb-5">
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
            ) : file.type === "application/pdf" ? (
              <div>
                <div 
                  className="w-32 h-32 bg-gray-200 rounded-md flex items-center justify-center"
                >
                  <span className="text-4xl text-gray-400">
                    <i className="far fa-file-pdf"></i>
                  </span>
                </div>
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
      <div
        className="absolute top-0 right-0 cursor-pointer text-red-500"
        onClick={() => handleRemoveFile(index)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
        </div>
        </div>
        ))}
      </div>
  </div>
  );
};

export default ImageToText;