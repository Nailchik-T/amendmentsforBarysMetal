import {Product} from "@entities/product";

export interface CartItem {
	product: Product;
	quantity: number;
}
