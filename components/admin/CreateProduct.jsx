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
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    // Validação dos campos
    if (!title || !description || !price || !image) {
      setErrorMsg("Todos os campos são obrigatórios.");
      setTimeout(() => setErrorMsg(""), 4000);
      return;
    }

    setLoading(true); // Ativa o estado de carregamento

    try {
      const response = await fetch("/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          description,
          price: parseFloat(price), // Converte o preço para número
          image,
        }),
      });

      if (!response.ok) {
        throw new Error(`Erro HTTP! status: ${response.status}`);
      }

      const data = await response.json();

      if (data.error) {
        setErrorMsg(data.error);
        setTimeout(() => setErrorMsg(""), 4000);
      } else {
        // Limpa os campos após o cadastro bem-sucedido
        setTitle("");
        setDescription("");
        setImage("");
        setPrice("");

        // Recarrega a página para atualizar a lista de produtos
        window.location.reload();
      }
    } catch (error) {
      console.error("Ocorreu um erro durante a operação:", error);
      setErrorMsg("Erro ao cadastrar o produto. Tente novamente.");
      setTimeout(() => setErrorMsg(""), 4000);
    } finally {
      setLoading(false); // Desativa o estado de carregamento
    }
  };

  return (
    <section
      className="min-h-screen flex items-center justify-center"
      style={{ backgroundColor: "rgb(255 239 239)" }} // Cor de fundo personalizada
    >
      <div className="w-full max-w-2xl p-8 bg-white rounded-lg shadow-lg dark:bg-gray-700">
        <h1 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-8">
          Cadastrar Produto
        </h1>

        {errorMsg && (
          <div
            className="p-4 mb-6 text-sm text-red-800 bg-red-50 rounded-lg dark:bg-red-200 dark:text-red-800"
            role="alert"
          >
            <span className="font-medium">Erro:</span> {errorMsg}
          </div>
        )}

        <div className="space-y-6">
          <div>
            <Label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2"
            >
              Título do Produto
            </Label>
            <Input
              type="text"
              name="title"
              id="title"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:text-white"
              placeholder="Digite o título do produto"
              required
            />
          </div>

          <div>
            <Label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2"
            >
              Descrição
            </Label>
            <Input
              type="text"
              name="description"
              id="description"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:text-white"
              placeholder="Digite a descrição do produto"
              required
            />
          </div>

          <div>
            <Label
              htmlFor="price"
              className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2"
            >
              Preço
            </Label>
            <Input
              type="number"
              name="price"
              id="price"
              value={price}
              onChange={(event) => setPrice(event.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:text-white"
              placeholder="Digite o preço do produto"
              required
            />
          </div>

          <div>
            <Label
              htmlFor="image"
              className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2"
            >
              URL da Imagem
            </Label>
            <Input
              type="text"
              name="image"
              id="image"
              value={image}
              onChange={(event) => setImage(event.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:text-white"
              placeholder="Cole a URL da imagem do produto"
              required
            />
          </div>

          <Button
            onClick={handleSubmit}
            className="w-full p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:outline-none disabled:bg-blue-400 dark:bg-purple-600 dark:hover:bg-purple-700"
            disabled={loading} // Desabilita o botão durante o carregamento
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                <span className="ml-2">Cadastrando...</span>
              </div>
            ) : (
              "Cadastrar Produto"
            )}
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CreateProduct;