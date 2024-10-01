import {useQuery} from "@tanstack/react-query";

import {apiClient, Dto} from "@shared/api";
import {Product} from "@entities/product";

type GetAllProductsDto = Dto<void, Product[]>;

export const getAllProducts = () =>
	apiClient.get<GetAllProductsDto["res"]>("/api/v1/products");

export const useAllProducts = () => {
	const {data, ...query} = useQuery({
		queryKey: ["all-products"],
		queryFn: getAllProducts,
	});

	return {
		allProducts: data?.data,
		...query,
	};
};
