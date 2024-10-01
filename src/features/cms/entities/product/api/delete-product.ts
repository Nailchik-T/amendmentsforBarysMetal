import {useMutation} from "@tanstack/react-query";

import {apiClient, Dto} from "@shared/api";
import {Product} from "@entities/product";

export type DeleteProductDto = Dto<
	{
		id: number;
	},
	Product
>;

export const deleteProduct = (req: DeleteProductDto["req"]) =>
	apiClient.delete<DeleteProductDto["res"]>(`/api/v1/products/${req.id}`);

export const useDeleteProduct = () => {
	const {mutateAsync, ...mutation} = useMutation({
		mutationFn: deleteProduct,
	});

	return {
		deleteProduct: mutateAsync,
		...mutation,
	};
};
