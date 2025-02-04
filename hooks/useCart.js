import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export const useCart = create()(
  persist(
    (set) => ({
      items: [],
      addItem: (product) => {
        set((state) => {
          const isAddedBefore = state.items.find(
            (item) => item.product.id === product.id
          );

          if (isAddedBefore) {
            const index = state.items.findIndex(
              (item) => item.product.id === isAddedBefore.product.id
            );

            state.items[index] = {
              product: isAddedBefore.product,
              quantity: isAddedBefore.quantity + 1,
            };

            return {
              items: [...state.items],
            };
          } else {
            return { items: [...state.items, { product, quantity: 1 }] };
          }
        });
      },
      removeItem: (id) =>
        set((state) => ({
          items: state.items.filter((item) => item.product.id !== id),
        })),
      increaseQuantity: (id) => {
        set((state) => {
          const cartItem = state.items.find((item) => item.product.id === id);

          if (cartItem) {
            const index = state.items.findIndex(
              (item) => item.product.id === cartItem.product.id
            );

            state.items[index] = {
              product: cartItem.product,
              quantity: cartItem.quantity + 1,
            };
          }

          return { items: [...state.items] };
        });
      },
      decreaseQuantity: (id) => {
        set((state) => {
          const cartItem = state.items.find((item) => item.product.id === id);

          if (cartItem) {
            const index = state.items.findIndex(
              (item) => item.product.id === cartItem.product.id
            );

            if (cartItem.quantity > 1) {
              state.items[index] = {
                product: cartItem.product,
                quantity: cartItem.quantity - 1,
              };
            } else {
              state.items.splice(index, 1);
            }
          }

          return { items: [...state.items] };
        });
      },
      clearCart: () => set({ items: [] }),
    }),
    {
      name: "cart-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
