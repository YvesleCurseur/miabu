"use client";

import { useState, useEffect } from 'react';

const PopUp = ({ type, title, message, onClose, duration = 15000, closeButtonContent }) => {
  const [show, setShow] = useState(false);

  console.log(type, title)
  
  useEffect(() => {
    setShow(true);
    const timer = setTimeout(() => {
      setShow(false);
      onClose();
    }, duration);
    return () => clearTimeout(timer);
  }, []);

  let bgColor, textColor, svgColor;
  switch (type) {
    case 'success':
      bgColor = 'bg-green-50';
      textColor = 'text-green-800';
      svgColor = 'text-green-600';
      break;
    case 'error':
      bgColor = 'bg-red-50';
      textColor = 'text-red-800';
      svgColor = 'text-red-600';
      break;
    case 'warning':
      bgColor = 'bg-yellow-50';
      textColor = 'text-yellow-800';
      svgColor = 'text-yellow-600';
      break;
    default:
      bgColor = 'bg-gray-50';
      textColor = 'text-gray-800';
      svgColor = 'text-gray-600';
      break;
  }

  return (
    <>
      {show && (
        <div className={`fixed top-4 right-4 mx-2 mt-12 p-4 max-w-4xl flex space-x-2 shadow rounded ${bgColor} text-sm`}>
          <h3 className={`whitespace-nowrap font-semibold ${textColor}`}>{title}</h3>
          <p className={`font-medium antialiased ${textColor}`}>{message}</p>
          <button
            type="button"
            className={`group absolute -top-2 -right-2 w-6 h-6 inline-flex justify-center items-center rounded-full ${bgColor} hover:bg-opacity-80`}
            onClick={() => {
              setShow(false);
              onClose();
            }}
          >
            {/* Utilisez closeButtonContent pour afficher le contenu personnalisé du bouton de fermeture */}
            {closeButtonContent ? (
              closeButtonContent
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className={`w-4 h-4 ${svgColor} group-hover:text-white`}
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            )}
          </button>
        </div>
      )}
    </>
  );
};

export default PopUp;
