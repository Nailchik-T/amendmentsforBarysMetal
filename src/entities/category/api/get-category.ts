import {useQuery} from "@tanstack/react-query";

import {Category} from "@entities/category";
import {apiClient, Dto} from "@shared/api";
import {Subcategory} from "@entities/subcategory";
import {Product} from "@entities/product";

export type GetCategoryDto = Dto<
	{
		id: Category["id"];
	},
	Category & {
		subCategories: Subcategory[];
		products: Product[];
	}
>;

export const getCategory = (req: GetCategoryDto["req"]) =>
	apiClient.get<GetCategoryDto["res"]>(`/api/v1/categories/${req.id}/`);

export const useCategory = (req: GetCategoryDto["req"]) => {
	const {data, ...query} = useQuery({
		queryKey: ["categories", req.id],
		queryFn: () => getCategory(req),
		enabled: !!req.id,
	});

	return {
		category: data?.data,
		...query,
	};
};
