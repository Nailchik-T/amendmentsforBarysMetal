import {useMutation} from "@tanstack/react-query";

import {apiClient, Dto} from "@shared/api";
import {Subcategory} from "@entities/category";

export type DeleteSubcategoryDto = Dto<
	{
		id: number;
	},
	Subcategory
>;

export const deleteSubcategory = (req: DeleteSubcategoryDto["req"]) =>
	apiClient.delete<DeleteSubcategoryDto["res"]>(
		`/api/v1/subcategories/${req.id}`,
	);

export const useDeleteSubcategory = () => {
	const {mutateAsync, ...mutation} = useMutation({
		mutationFn: deleteSubcategory,
	});

	return {
		deleteSubcategory: mutateAsync,
		...mutation,
	};
};
