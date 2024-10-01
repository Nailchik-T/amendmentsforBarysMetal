import {useMutation} from "@tanstack/react-query";

import {apiClient, Dto} from "@shared/api";
import {Category, Subcategory} from "@entities/category";

export type EditSubcategoryDto = Dto<
	{
		id: number;
		updated: {
			name: string;
			file: File;
			categoryId: Category["id"];
		};
	},
	Subcategory
>;

export const editSubcategory = (req: EditSubcategoryDto["req"]) => {
	const formData = new FormData();

	formData.append("name", req.updated.name);
	formData.append("file", req.updated.file);
	formData.append("categoryId", String(req.updated.categoryId));

	return apiClient.put<EditSubcategoryDto["res"]>(
		`/api/v1/subcategories/${req.id}`,
		formData,
	);
};

export const useEditSubcategory = () => {
	const {mutateAsync, ...mutation} = useMutation({
		mutationFn: editSubcategory,
	});

	return {
		editSubcategory: mutateAsync,
		...mutation,
	};
};
