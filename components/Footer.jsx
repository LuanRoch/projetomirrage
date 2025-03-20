import React from "react";

const Footer = () => {
  return (
    <footer className="bg-[#fca29e] text-white py-8 w-full">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          
          <div className="text-center md:text-left mb-6 md:mb-0">
            <h3 className="text-2xl font-nunito text-center">Micael e Agata</h3>
            <p className="mt-2 text-sm">
              Torne seu momento especial mais organizado e inesquecível.
            </p>
          </div>
          
          <ul className="flex flex-wrap justify-center md:justify-end space-x-6">
            <li>
              <a href="#" className="text-white hover:underline">
                Data: 19/04/2025
              </a>
            </li>
            {/* <li>
              <a href="#" className="text-white hover:underline">
                
              </a>
            </li>
            <li>
              <a href="#" className="text-white hover:underline">
                
              </a>
            </li> */}
          </ul>
        </div>

        {/* Copyright */}
        <div className="font-nunito mt-8 border-t border-white/50 pt-4 text-center text-sm">
          © {new Date().getFullYear()} Projeto Marriage. Todos os direitos reservados.
        </div>
      </div>
    </footer>
  );
};

export default Footer;