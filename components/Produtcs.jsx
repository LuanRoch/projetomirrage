"use client";

import { useEffect, useState } from "react";
import ProductItem from "./ProductItem";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getProducts = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch("/api/products", {
        next: { revalidate: 60 } // Opcional: cache com revalidação após 60 segundos
      });
  
      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(
          errorData?.message || 
          errorData?.error || 
          `Erro ao buscar produtos: ${response.status} ${response.statusText}`
        );
      }
  
      const result = await response.json();
  
      // Tratamento para diferentes formatos de resposta
      let productsData = [];
      
      if (Array.isArray(result)) {
        productsData = result;
      } else if (result?.data && Array.isArray(result.data)) {
        productsData = result.data;
      } else if (result?.products && Array.isArray(result.products)) {
        productsData = result.products;
      } else {
        throw new Error("Formato de dados inesperado da API");
      }
  
      if (productsData.length === 0) {
        console.warn("A API retornou uma lista vazia de produtos");
      }
  
      setProducts(productsData);
      
    } catch (error) {
      console.error("Falha ao carregar produtos:", error);
      setError(error.message);
      
      // Opcional: Mostrar feedback visual temporário
      setTimeout(() => setError(null), 5000);
      
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  if (loading) {
    return (
      <section className="py-12 #FFE5E4 rounded-md">
        <div className="container mx-auto px-4 text-center">
          <p>Carregando produtos...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-12 #FFE5E4 rounded-md">
        <div className="container mx-auto px-4 text-center text-red-500">
          <p>Erro ao carregar produtos: {error}</p>
        </div>
      </section>
    );
  }

  if (!products || products.length === 0) {
    return (
      <section className="py-12 #FFE5E4 rounded-md">
        <div className="container mx-auto px-4 text-center">
          <p>Nenhum produto disponível no momento.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 #FFE5E4 rounded-md">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold font-nunito text-center mb-8">
          <span className="text-[#fca29e]">Lista de Presentes</span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductItem key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Products;