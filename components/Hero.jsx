import React from "react";

const Hero = () => {
  const backgroundImage = "/image/MAH.jpg"; // Altere para o caminho da imagem

  return (
    <div
      className="relative w-full h-[800px] flex items-center justify-center text-center bg-cover bg-center overflow-hidden"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      {/* Sobreposição escura para efeito de escurecimento */}
      <div className="absolute inset-0 bg-black opacity-50"></div>

      {/* Efeito de zoom suave */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 ease-in-out hover:scale-105"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      ></div>

      {/* Conteúdo do Header */}
      <div className="relative z-10 max-w-3xl px-6 space-y-6 text-white">
        <h1 className="text-4xl sm:text-5xl font-bold font-great-vibes">
          <span className="text-pink-300">Micael</span> &{" "}
          <span className="text-pink-300">Agata</span>
        </h1>
        <p className="text-lg sm:text-xl">Celebrando o amor e a união</p>
      </div>
    </div>
  );
};

export default Hero;