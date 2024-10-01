import {useQuery} from "@tanstack/react-query";

import {apiClient, Dto} from "@shared/api";
import {Product} from "@entities/product";

type GetProductDto = Dto<
	{
		id: number;
	},
	Product
>;

export const getProduct = (req: GetProductDto["req"]) =>
	apiClient.get<GetProductDto["res"]>(`/api/v1/products/${req.id}`);

export const useProduct = (req: GetProductDto["req"]) => {
	const {data, ...query} = useQuery({
		queryKey: ["products", req.id],
		queryFn: () => getProduct(req),
	});

	return {
		product: data?.data,
		...query,
	};
};
