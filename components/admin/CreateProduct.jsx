"use client";

import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

const CreateProduct = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [price, setPrice] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async () => {
    try {
      const response = await fetch("/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          description,
          price,
          image,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (data.error) {
        setErrorMsg(data.error);

        setTimeout(() => {
          setErrorMsg("");
        }, 4000);
      } else {
        window.location.reload();
      }

      return data;
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
    }
  };

  return (
    <section>
      <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16">
        <h1 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
          Listar produto
        </h1>

        {errorMsg ? (
          <div
            className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50"
            role="alert"
          >
            <span className="font-medium">Error:</span>
            {errorMsg}
          </div>
        ) : undefined}

        <div>
          <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
            <div className="sm:col-span-2">
              <Label
                htmlFor="title"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Titulo do presente
              </Label>

              <Input
                type="text"
                name="title"
                id="title"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                className="input"
                placeholder="Title"
                required
              />
            </div>

            <div className="sm:col-span-2">
              <Label
                htmlFor="description"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Descrição
              </Label>

              <Input
                type="text"
                name="description"
                id="description"
                value={description}
                onChange={(event) => setDescription(event.target.value)}
                className="input"
                placeholder="Description"
                required
              />
            </div>

            <div className="sm:col-span-2">
              <Label
                htmlFor="price"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Preço
              </Label>

              <Input
                type="number"
                name="price"
                id="price"
                value={price}
                onChange={(event) => setPrice(event.target.value)}
                className="input"
                placeholder="Price"
                required
              />
            </div>

            <div className="sm:col-span-2">
              <Label
                htmlFor="image"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Imagem
              </Label>

              <Input
                type="text"
                name="image"
                id="image"
                value={image}
                onChange={(event) => setImage(event.target.value)}
                className="input"
                placeholder="Image"
                required
              />
            </div>
          </div>

          <Button onClick={handleSubmit} className="btn mt-6">
            Listar produto
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CreateProduct;
