"use client";
import { useCart } from "@/hooks/useCart";
import { ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import CartItem from "./CartItem";
import { Button } from "./ui/button";
import { ScrollArea } from "./ui/scroll-area";
import { Separator } from "./ui/separator";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";

const Cart = () => {
  const { items } = useCart();
  const itemCount = items.length;

  const cartTotal = items.reduce(
    (total, { product, quantity }) => total + product.price * quantity,
    0
  );

  const fee = 0; // Taxa de transação

  return (
    <Sheet>
      <SheetTrigger className="group -m-2 flex items-center p-2">
        <ShoppingCart aria-hidden="true" className="h-6 w-6 flex-shrink-0" />
        <span className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-400">
          {itemCount}
        </span>
      </SheetTrigger>

      <SheetContent className="flex w-full flex-col pr-0 sm:max-w-lg">
        <SheetHeader className="space-y-2.5 pr-6">
          <SheetTitle>Carrinho ({itemCount})</SheetTitle>
        </SheetHeader>

        {itemCount > 0 ? (
          <>
            <div className="flex flex-col w-full pr-6">
              <ScrollArea>
                {items.map(({ product, quantity }) => (
                  <CartItem
                    product={product}
                    quantity={quantity}
                    key={product.id}
                  />
                ))}
              </ScrollArea>
            </div>

            <div className="space-y-4 pr-6">
              <Separator />

              <div className="space-y-1.5 text-sm">
                <div className="flex">
                  <span className="flex-1">Frete</span>
                  <span>Grátis</span>
                </div>

                {/* <div className="flex">
                  <span className="flex-1">Taxa de transação</span>
                  <span>R${fee.toFixed(2).replace(".", ",")} BRL</span>
                </div> */}

                <div className="flex">
                  <span className="flex-1">Total</span>
                  <span>
                    R${(cartTotal + fee).toFixed(2).replace(".", ",")} BRL
                  </span>
                </div>
              </div>

              <SheetFooter>
                <SheetTrigger asChild>
                  <Link href="/cart">
                    <Button className="w-full">Finalizar compra</Button>
                  </Link>
                </SheetTrigger>
              </SheetFooter>
            </div>
          </>
        ) : (
          <div className="flex h-full flex-col items-center justify-center space-y-1">
            <div
              className="relative mb-4 h-60 w-60 text-muted-foreground"
              aria-hidden="true"
            >
              <Image
                src="/empty-cart.svg"
                fill
                alt="Imagem de carrinho vazio"
              />
            </div>

            <div className="text-xl font-semibold">Seu carrinho está vazio</div>

            <SheetTrigger asChild>
              <Link href="/">
                <Button variant="link" size="sm">
                  Adicione itens ao carrinho para finalizar a compra
                </Button>
              </Link>
            </SheetTrigger>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default Cart;