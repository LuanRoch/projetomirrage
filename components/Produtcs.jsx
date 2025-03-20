"use client";

import { useEffect, useState } from "react";
import ProductItem from "./ProductItem";

const Products = () => {
  const [products, setProducts] = useState([]);

  const getProducts = async () => {
    try {
      const response = await fetch("/api/products");

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setProducts(data.products);
      return data;
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <section className="py-12 #FFE5E4 rounded-md ">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold font-nunito text-center mb-8">
          <span className="text-[#fca29e]">
            Lista de Presentes
          </span>
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