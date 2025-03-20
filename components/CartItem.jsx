import { useCart } from "@/hooks/useCart";
import { X } from "lucide-react";
import Image from "next/image";

const CartItem = ({ product, quantity }) => {
  const { removeItem } = useCart();

  return (
    <div className="space-y-3 py-2 ">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center space-x-4">
          <div className="relative aspect-square h-16 w-16 min-w-fit overflow-hidden rounded ">
            <Image
              src={product.image}
              alt={product.title}
              fill
              className="absolute object-cover rounded-lg"
            />
          </div>

          <div className="flex flex-col self-start">
            <span className="line-clamp-1 text-sm font-medium mb-1">
              {product.title} {quantity > 1 ? `(${quantity})` : null}
            </span>

            <div className="mt-4 text-xs text-muted-foreground">
              <div>
                <button
                  onClick={() => removeItem(product.id)}
                  className="flex items-center gap-0.5"
                >
                  <X className="w-3 h-4" />
                </button>
                <span className="sr-only">Remove</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col space-y-1 font-medium">
          <span className="ml-auto line-clamp-1 text-sm">
            ${product.price * quantity} BRL
          </span>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
