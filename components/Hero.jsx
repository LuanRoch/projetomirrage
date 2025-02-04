import React from "react";

const Hero = () => {
    return (
        <div className="relative w-full h-[500px] flex items-center justify-center text-center bg-cover bg-center">
            
            {/* Sobreposição para melhorar a legibilidade */}
            <div className="absolute inset-0 bg-black bg-opacity-40"></div>

            {/* Conteúdo do Header */}
            <div className="relative z-10 max-w-3xl px-6 space-y-6 text-white">
                <h1 className="text-4xl sm:text-5xl font-bold">
                    <span className="text-pink-300">Micael</span> & <span className="text-pink-300">Agata</span>
                </h1>
                <p className="text-lg sm:text-xl leading-relaxed">
                    Olá, familiares e amigos! Estamos muito felizes em compartilhar 
                    este momento tão especial das nossas vidas com vocês. 
                    A presença de todos no nosso grande dia já é o maior presente, 
                    mas criamos uma lista de serviços simbólicos que representam os 
                    sonhos e planos que queremos realizar juntos.
                </p>
                <p className="text-lg sm:text-xl leading-relaxed">
                    Agradecemos de coração por fazerem parte deste novo capítulo das nossas vidas.
                </p>
                <p className="text-lg font-bold text-pink-300">
                    Com amor, Micael e Agata
                </p>
            </div>
        </div>
    );
};

export default Hero;
