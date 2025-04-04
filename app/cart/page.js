"use client";
import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/useCart";
import { cn } from "@/lib/utils";
import { Minus, Plus, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { CheckoutButton } from "@/components/CheckoutButton"; 

const CartPage = () => {
  const { items, removeItem, increaseQuantity, decreaseQuantity, clearCart } =
    useCart();
  const [isLoading, setIsLoading] = useState(false);

  const cartTotal = items.reduce(
    (total, { product, quantity }) => total + product.price * quantity,
    0
  );

  return (
    <div>
      <div className="mx-auto max-w-2xl px-4 pb-24 pt-16 sm:px-6 lg:max-w-7xl lg:px-8">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Carrinho de Compras
        </h1>

        <div className="mt-12 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16">
          <div
            className={cn("lg:col-span-7", {
              "rounded-lg border-2 border-dashed border-zinc-200 p-12":
                items.length === 0,
            })}
          >
            <h2 className="sr-only">Itens no carrinho</h2>

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
                    alt="Carrinho de compras vazio"
                  />
                </div>

                <h3 className="font-semibold text-2xl">Seu carrinho está vazio</h3>

                <p className="text-muted-foreground text-center">Ops!</p>
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
                          alt="Imagem do produto"
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
                            R${(product.price * quantity).toFixed(2)} BRL
                          </p>
                        </div>

                        <div className="mt-4 sm:mt-0 sm:pr-9 w-20">
                          <div className="absolute right-0 top-0">
                            <Button
                              aria-label="Aumentar quantidade"
                              onClick={() => increaseQuantity(product.id)}
                              variant="ghost"
                            >
                              <Plus className="h-5 w-5" aria-hidden="true" />
                            </Button>
                          </div>

                          <div className="absolute right-0 top-10">
                            <Button
                              aria-label="Diminuir quantidade"
                              onClick={() => decreaseQuantity(product.id)}
                              variant="ghost"
                            >
                              <Minus className="h-5 w-5" aria-hidden="true" />
                            </Button>
                          </div>

                          <div className="absolute right-0 top-20">
                            <Button
                              aria-label="Remover produto"
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
              Resumo do Pedido
            </h2>

            <div className="mt-6 space-y-4">
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-600 dark:text-gray-50">
                  Subtotal
                </p>
                <p className="text-sm font-medium text-gray-900 dark:text-gray-50">
                  R${cartTotal.toFixed(2)} BRL
                </p>
              </div>

              {/* <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                <div className="flex items-center text-sm text-muted-foreground">
                  <span>Taxa de transação</span>
                </div>

                <div className="text-sm font-medium text-gray-900 dark:text-gray-50">
                  R$1,00 BRL
                </div>
              </div> */}

              <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                <div className="text-base font-medium text-gray-900 dark:text-gray-50">
                  Total do Pedido
                </div>

                <div className="text-base font-medium text-gray-900 dark:text-gray-50">
                  R${(cartTotal ).toFixed(2)} BRL
                </div>
              </div>
            </div>

            <div className="mt-6">
              {/* Substitua o Button pelo CheckoutButton */}
              <CheckoutButton
                cartItems={items.map((item) => ({
                  title: item.product.title,
                  price: item.product.price,
                  quantity: item.quantity,
                }))}
              />
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default CartPage;