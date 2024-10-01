import {useMutation} from "@tanstack/react-query";

import {apiClient, Dto} from "@shared/api";
import {Category} from "@entities/category";

export type EditCategoryDto = Dto<
	{
		id: number;
		updated: {
			name: string;
			file: File;
		};
	},
	Category
>;

export const editCategory = (req: EditCategoryDto["req"]) => {
	const formData = new FormData();

	formData.append("name", req.updated.name);
	formData.append("file", req.updated.file);

	return apiClient.put<EditCategoryDto["res"]>(
		`/api/v1/categories/${req.id}`,
		formData,
	);
};

export const useEditCategory = () => {
	const {mutateAsync, ...mutation} = useMutation({
		mutationFn: editCategory,
	});

	return {
		editCategory: mutateAsync,
		...mutation,
	};
};
