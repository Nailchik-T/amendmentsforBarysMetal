import {create} from "zustand";
import {persist, createJSONStorage} from "zustand/middleware";

import {Product} from "@entities/product";

import {CartItem} from "./types";

export const useCartStore = create(
	persist<{
		cart: CartItem[];
		addProduct: (product: Product, quantity?: number) => void;
		removeProduct: (id: Product["id"]) => void;
		incrementQuantity: (id: Product["id"]) => void;
		decrementQuantity: (id: Product["id"]) => void;
		orderedItemsId: Product["id"][];
		setOrderedItemsId: (ids: Product["id"][]) => void;
		reset: () => void;
	}>(
		(set) => ({
			cart: [],
			orderedItemsId: [],
			addProduct: (product, quantity = 1) =>
				set((store) => ({
					cart: [...store.cart, {product, quantity}],
				})),
			removeProduct: (id) =>
				set((store) => ({
					cart: store.cart.filter((i) => i.product.id !== id),
				})),
			incrementQuantity: (id) =>
				set((store) => ({
					cart: store.cart.map((item) =>
						item.product.id === id
							? {
									...item,
									quantity: item.quantity + 1,
								}
							: item,
					),
				})),
			decrementQuantity: (id) =>
				set((store) => ({
					cart: store.cart.map((item) =>
						item.product.id === id
							? {
									...item,
									quantity: Math.max(item.quantity - 1, 1),
								}
							: item,
					),
				})),
			setOrderedItemsId: (ids) => set({orderedItemsId: ids}),
			reset: () =>
				set({
					cart: [],
					orderedItemsId: [],
				}),
		}),
		{
			name: "cart",
			storage: createJSONStorage(() => localStorage),
		},
	),
);
