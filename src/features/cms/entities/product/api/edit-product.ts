import {useMutation} from "@tanstack/react-query";

import {apiClient, Dto} from "@shared/api";
import {Category} from "@entities/category";

export type EditProductDto = Dto<
	{
		id: number;
		updated: {
			name: string;
			price: string;
			file: File;
		};
	},
	Category
>;

export const editProduct = (req: EditProductDto["req"]) => {
	const formData = new FormData();

	formData.append("name", req.updated.name);
	formData.append("file", req.updated.file);

	return apiClient.put<EditProductDto["res"]>(
		`/api/v1/products/${req.id}`,
		formData,
	);
};

export const useEditProduct = () => {
	const {mutateAsync, ...mutation} = useMutation({
		mutationFn: editProduct,
	});

	return {
		editProduct: mutateAsync,
		...mutation,
	};
};
