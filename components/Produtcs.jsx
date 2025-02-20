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
    <div className="bg-white mt-4 grid gap-12 md:w-1/2 sm:grid-cols-1 lg:grid-cols-1 rounded-xl  p-4">
    {products.map((product) => {
      return <ProductItem key={product.id} product={product} />;
    })}
  </div>
  );
};

export default Products;
