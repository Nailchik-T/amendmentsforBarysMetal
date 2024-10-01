import {useQuery} from "@tanstack/react-query";

import {Order} from "@entities/order";
import {apiClient, Dto} from "@shared/api";

export type GetOrdersDto = Dto<void, Order[]>;

export const getOrders = () =>
	apiClient.get<GetOrdersDto["res"]>("/api/v1/orders");

export const useOrders = () => {
	const {data, ...query} = useQuery({
		queryKey: ["orders"],
		queryFn: () => getOrders(),
	});

	return {
		orders: data?.data,
		...query,
	};
};
