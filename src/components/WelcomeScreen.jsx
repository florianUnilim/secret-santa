import React, { useState } from 'react';
import Snowfall from 'react-snowfall';

export function WelcomeScreen({ onStart }) {
  const [isAnimating, setIsAnimating] = useState(false);

  const handleClick = () => {
    setIsAnimating(true);
    setTimeout(() => {
      onStart();
    }, 500); // Correspond à la durée de l'animation
  };
  return (
    <div className="flex flex-col relative text-center items-center justify-center h-screen z-50 bg-gradient-to-l from-red-500 to-red-700">
       <Snowfall />
      <div className="bg-white p-8 rounded-lg shadow-lg m-3">
        <h1 className="text-5xl font-bold text-primary mb-4 font-base">Secret Santa</h1>
        <p className="text-lg mb-6">Organisez facilement votre échange de cadeaux entre amis ou collègues.</p>
        <button 
          onClick={handleClick}  
          className="bg-red-500 text-white text-lg px-8 py-3 rounded-full shadow-lg transform transition-transform duration-300 hover:scale-105 active:scale-95"
        >
          Commencer
        </button>
      </div>
      <img src="./perenoel.png" alt="pere noel" className="absolute bottom-0 z-10 w-4/5"/>
    </div>
  );
}