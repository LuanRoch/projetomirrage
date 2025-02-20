import React from "react";

const Footer = () => {
  return (
    <footer className="bg-[#f58f8a] text-white py-8">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Seção principal do rodapé */}
          <div className="text-center md:text-left">
            <h3 className="text-2xl font-bold">Projeto Marriage</h3>
            <p className="mt-2 text-sm">
              Torne seu momento especial mais organizado e inesquecível.
            </p>
          </div>
          {/* Links rápidos */}
          <ul className="flex flex-wrap justify-center md:justify-end space-x-6 mt-6 md:mt-0">
            <li>
              <a href="#" className="text-white hover:underline">
                Sobre nós
              </a>
            </li>
            <li>
              <a href="#" className="text-white hover:underline">
                Termos e Condições
              </a>
            </li>
            <li>
              <a href="#" className="text-white hover:underline">
                Suporte
              </a>
            </li>
          </ul>
        </div>

        {/* Copyright */}
        <div className="mt-8 border-t border-white/50 pt-4 text-center text-sm">
          © {new Date().getFullYear()} Projeto Marriage. Todos os direitos reservados.
        </div>
      </div>
    </footer>
  );
};

export default Footer;