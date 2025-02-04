"use client";
import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/useCart";
import { cn } from "@/lib/utils";
import { Minus, Plus, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react"; // Importe o useState para gerenciar o estado de carregamento

const CartPage = () => {
  const { items, removeItem, increaseQuantity, decreaseQuantity, clearCart } =
    useCart();
  const [isLoading, setIsLoading] = useState(false); // Estado para controlar o carregamento

  const cartTotal = items.reduce(
    (total, { product, quantity }) => total + product.price * quantity,
    0
  );

  // Função para processar o checkout
  const handleCheckout = async () => {
    setIsLoading(true); // Ativa o estado de carregamento

    try {
      // Formata os itens do carrinho para o formato esperado pela API do Mercado Pago
      const formattedItems = items.map(({ product, quantity }) => ({
        name: product.title,
        price: product.price,
        quantity: quantity,
      }));

      // Dados do comprador (você pode coletar isso de um formulário ou usar um valor fixo para testes)
      const payer = {
        email: "cliente@example.com", // Substitua pelo e-mail do cliente
      };

      // Envia os dados para a API de pagamento
      const response = await fetch("/api/payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ items: formattedItems, payer }),
      });

      const data = await response.json();

      // Redireciona o usuário para a página de pagamento do Mercado Pago
      if (data.id) {
        window.location.href = `https://www.mercadopago.com.br/checkout/v1/redirect?pref_id=${data.id}`;
      } else {
        console.error("Erro ao criar o pagamento:", data);
      }
    } catch (error) {
      console.error("Erro durante o checkout:", error);
    } finally {
      setIsLoading(false); // Desativa o estado de carregamento
    }
  };

  return (
    <div>
      <div className="mx-auto max-w-2xl px-4 pb-24 pt-16 sm:px-6 lg:max-w-7xl lg:px-8">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Shopping Cart
        </h1>

        <div className="mt-12 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16">
          <div
            className={cn("lg:col-span-7", {
              "rounded-lg border-2 border-dashed border-zinc-200 p-12":
                items.length === 0,
            })}
          >
            <h2 className="sr-only">Items no carrinho</h2>

            {items.length === 0 ? (
              <div className="flex flex-col h-full items-center justify-center space-y-1">
                <div
                  aria-hidden="true"
                  className="relative mb-4 h-40 w-40 text-muted-foreground"
                >
                  <Image
                    src="/empty-cart.svg"
                    fill
                    loading="eager"
                    alt="Empty shopping cart"
                  />
                </div>

                <h3 className="font-semibold text-2xl">Seu carrinho está vazio</h3>

                <p className="text-muted-foreground text-center">opss</p>
              </div>
            ) : null}

            <ul
              className={cn({
                "divide-y divide-gray-200 border-b border-t border-gray-200":
                  items.length > 0,
              })}
            >
              {items.map(({ product, quantity }) => {
                return (
                  <li key={product.id} className="flex py-6 sm:py-10">
                    <div className="flex-shrink-0">
                      <div className="relative h-24 w-24">
                        <Image
                          fill
                          src={product.image}
                          alt="product image"
                          className="h-full w-full rounded-md object-cover object-center sm:h-48 sm:w-48"
                        />
                      </div>
                    </div>

                    <div className="ml-4 flex flex-1 flex-col justify-between sm:ml-6">
                      <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
                        <div>
                          <div className="flex justify-between">
                            <h3 className="text-sm">
                              <Link
                                href={`/${product.slug}`}
                                className="font-medium text-gray-700 dark:text-gray-50 dark:hover:text-gray-200 hover:text-gray-800"
                              >
                                {product.title}{" "}
                                {quantity > 1 ? `(${quantity})` : null}
                              </Link>
                            </h3>
                          </div>

                          <p className="mt-1 text-sm font-medium text-gray-900 dark:text-gray-50">
                            ${product.price * quantity} USD
                          </p>
                        </div>

                        <div className="mt-4 sm:mt-0 sm:pr-9 w-20">
                          <div className="absolute right-0 top-0">
                            <Button
                              aria-label="Remove product"
                              onClick={() => increaseQuantity(product.id)}
                              variant="ghost"
                            >
                              <Plus className="h-5 w-5" aria-hidden="true" />
                            </Button>
                          </div>

                          <div className="absolute right-0 top-10">
                            <Button
                              aria-label="Remove product"
                              onClick={() => decreaseQuantity(product.id)}
                              variant="ghost"
                            >
                              <Minus className="h-5 w-5" aria-hidden="true" />
                            </Button>
                          </div>

                          <div className="absolute right-0 top-20">
                            <Button
                              aria-label="Remove product"
                              onClick={() => removeItem(product.id)}
                              variant="ghost"
                            >
                              <X className="h-5 w-5" aria-hidden="true" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>

          <section className="mt-16 rounded-lg bg-gray-50 dark:bg-zinc-800 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8">
            <h2 className="text-lg font-medium text-gray-900 dark:text-gray-50">
              Order Summary
            </h2>

            <div className="mt-6 space-y-4">
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-600 dark:text-gray-50">
                  Subtotal
                </p>
                <p className="text-sm font-medium text-gray-900 dark:text-gray-50">
                  ${cartTotal} USD
                </p>
              </div>

              <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                <div className="flex items-center text-sm text-muted-foreground">
                  <span>Flat Transaction Fee</span>
                </div>

                <div className="text-sm font-medium text-gray-900 dark:text-gray-50">
                  $1 USD
                </div>
              </div>

              <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                <div className="text-base font-medium text-gray-900 dark:text-gray-50">
                  Order Total
                </div>

                <div className="text-base font-medium text-gray-900 dark:text-gray-50">
                  ${cartTotal + 1} BRL
                </div>
              </div>
            </div>

            <div className="mt-6">
              <Button
                disabled={items.length === 0 || isLoading} // Desabilita o botão se o carrinho estiver vazio ou estiver carregando
                className="w-full"
                size="lg"
                onClick={handleCheckout} // Adiciona a função de checkout ao botão
              >
                {isLoading ? "Processando..." : "Checkout"} {/* Altera o texto do botão durante o carregamento */}
              </Button>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default CartPage;