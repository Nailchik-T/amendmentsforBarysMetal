import {useMutation} from "@tanstack/react-query";

import {Category} from "@entities/category";
import {apiClient, Dto} from "@shared/api";

export type DeleteCategoryDto = Dto<
	{
		id: number;
	},
	Category
>;

export const deleteCategory = (req: DeleteCategoryDto["req"]) =>
	apiClient.delete<DeleteCategoryDto["res"]>(`/api/v1/categories/${req.id}`);

export const useDeleteCategory = () => {
	const {mutateAsync, ...mutation} = useMutation({
		mutationFn: deleteCategory,
	});

	return {
		deleteCategory: mutateAsync,
		...mutation,
	};
};
