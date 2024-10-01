import {useMutation} from "@tanstack/react-query";

import {Product} from "@entities/product";
import {apiClient, Dto} from "@shared/api";

import {DeliveryOption, Order, PaymentOption} from "../types";

export type CreateOrderDto = Dto<
	{
		deliveryMethod: DeliveryOption;
		paymentMethod: PaymentOption;
		productIds: Product["id"][];
		deliveryAddress: string;
		deliveryFloor: number;
		deliveryComment?: string;
		recipientFullName: string;
		recipientPhone: string;
		recipientEmail?: string;
		recipientCompany?: string;
		recipientComment?: string;
	},
	Order
>;

export const createOrder = (req: CreateOrderDto["req"]) =>
	apiClient.post<CreateOrderDto["res"]>("/api/v1/orders", req);

export const useCreateOrder = () => {
	const {mutateAsync, ...mutation} = useMutation({
		mutationFn: createOrder,
	});

	return {
		createOrder: mutateAsync,
		...mutation,
	};
};
