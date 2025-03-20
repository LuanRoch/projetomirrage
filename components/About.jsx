import React from "react";
import Image from "next/image";
import Link from "next/link";

const About = () => {
  return (
    <section className="py-12 #FFE5E4">
      <div className="container mx-auto px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
  
          <div className="text-center md:text-left">
            <h2 className="text-3xl font-bold text-gray-900 mb-6"></h2>
            <p className="text-lg text-gray-600 mb-4 font-nunito">
              Olá, familiares e amigos!
            </p>
            <p className="text-lg text-gray-600 mb-4 font-nunito">
              Estamos muito felizes em compartilhar este momento tão especial das
              nossas vidas com cada um de vocês. A presença de todos no nosso
              grande dia já é o maior presente que poderíamos receber, mas, para
              aqueles que desejam nos presentear de uma forma única, criamos uma
              lista de serviços simbólicos que representam os sonhos e planos que
              queremos realizar juntos.
            </p>
            <p className="text-lg text-gray-600 mb-4 font-nunito">
              Cada item da nossa lista foi pensado com muito carinho e reflete
              momentos que desejamos viver e conquistas que queremos compartilhar.
              Ao escolher um desses serviços, vocês estarão nos presenteando com
              algo que vai fazer parte da nossa história e nos lembrar de vocês
              com muito amor.
            </p>
            <p className="text-lg text-gray-600 font-nunito">
              Agradecemos de coração por fazerem parte deste novo capítulo das
              nossas vidas. Com amor,
              <br />
              Micael e Agata
            </p>
          </div>

          
          <div className="flex justify-center md:justify-end">
            <div className="relative w-full h-96 md:w-96 md:h-96 rounded-lg overflow-hidden shadow-lg">
              <Image
                src="/image/IMG-20250222-WA0230.jpg"
                alt="Foto de casamento dos noivos"
                layout="fill"
                objectFit="cover"
                className="rounded-lg"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
