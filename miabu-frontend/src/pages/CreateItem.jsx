import React, { useState } from "react";
import { ImageToText } from "../components";

const CreateItem = () => {

    const [file, setFile] = useState(null);
    const [error, setError] = useState("");
    const allowedExtensions = ["jpeg", "jpg", "png", "gif"];

    const handleFileChange = (event) => {

        const file = event.target.files[0];

        if (file && allowedExtensions.includes(file.name.split(".").pop())) {
          setFile(URL.createObjectURL(file));
          setError("");
        } else {
          setFile(null);
          setError("Veuillez sélectionner une image jpeg, png ou gif.");
        }

    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // Faire quelque chose avec le fichier sélectionné
    };

    const handleRemoveFile = () => {
        setFile(null);
        setError("");
        document.getElementById("image-input").value = "";
    };

    return (
        <main className="mt-24 ml-2 mr-80">
            <div className='p-5 m-5 bg-white border-solid rounded-md shadow-sm'>
                Posez une question
            </div>

            <div className='p-5 m-5 bg-white border-solid rounded-md shadow-sm'>
                <ImageToText />
            </div>

        </main>
    )
}

export default CreateItem