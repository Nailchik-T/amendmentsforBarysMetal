import {useQuery} from "@tanstack/react-query";

import {Subcategory} from "@entities/subcategory";
import {apiClient, Dto} from "@shared/api";
import {Category} from "@entities/category";

export type GetSubcategoryDto = Dto<
	{
		id: string;
	},
	Subcategory & {
		categoryId: Category["id"];
		categoryName: Category["name"];
	}
>;

export const getSubcategory = (req: GetSubcategoryDto["req"]) =>
	apiClient.get<GetSubcategoryDto["res"]>(`/api/v1/subcategories/${req.id}`);

export const useSubcategory = (req: GetSubcategoryDto["req"]) => {
	const {data, ...query} = useQuery({
		queryKey: ["subcategories", req.id],
		queryFn: () => getSubcategory(req),
	});

	return {
		subcategory: data?.data,
		...query,
	};
};
