"use client";

import { useState, useEffect } from "react";
import { createWorker }  from 'tesseract.js'

import CloseSvg from "../../public/icons/CloseSvg";

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

    if (files.length === 0) {
      setError("Aucune image à transcrire");
      return;
    }

    setIsLoading(true)

    const file = files[0];

    const worker = await createWorker()
    await worker.load()
    await worker.loadLanguage('fra')
    await worker.initialize('fra');

    // await worker.setParameters({
    //   tessedit_create_hocr: 1 
    // });

    const { data: { text } } = await worker.recognize(file);
    console.log(text)
        
    // const { data: { lines } } = await worker.recognize(file);

    // let formattedText = '';
  
    // for (let i = 0; i < lines.length; i++) {
    //   const line = lines[i];
  
    //   const indentation = line.bbox.x0; // Indentation relative par rapport à la position de l'image entière
    //   const spaces = ' '.repeat(indentation); // Création d'une chaîne d'espaces correspondant à l'indentation
  
    //   formattedText += spaces + line.text + '\n'; // Ajout des espaces à chaque ligne de texte avec un retour à la ligne
    // }
  
    setTextResult(text);
    props.onImageFromText(text);
    props.onImageUsed(file)
    setIsLoading(false)

    }

    props.onImageFromText(textResult)

  return (

    <>
      <div className="mb-4">
        <label
          htmlFor="inputImage"
          className="text-sm w-full px-3 py-2 text-white bg-rose-500 hover:bg-rose-600"
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
        className="text-sm w-full px-3 py-2 mb-2 text-blue-500 bg-gray-200 hover:bg-gray-300"
        type="button"
        onClick={getTextFromImage}
        disabled={files.length > 1}
      >
        {files.length > 1
          ? "Désactiver"
          : isLoading
          ? "Chargement..."
          : "Retranscrire"}
      </button>

      <ReactQuill
        placeholder="Le texte de l'image s'afichera ici, vous pouvez le modifiez à votre guise"
        modules={modules}
        className="w-full h-auto bg-white border-gray-300 shadow-sm placeholder-gray-400 focus:outline-none focus:ring-rose-600 focus:border-rose-600 preserve-indent"
        id="outputText"
        value={textResult || ""}
        onChange={(value) => setTextResult(value)}
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
              className="absolute top-0 right-0 cursor-pointer text-blue-500"
              onClick={() => handleRemoveFile(index)}
            >
              Effacer
              <CloseSvg />
            </div>
        </div>
        ))}
      </div>
    </>
  );
};

export default ImageToText;