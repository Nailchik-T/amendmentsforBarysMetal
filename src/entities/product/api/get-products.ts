import {useQuery} from "@tanstack/react-query";

import {apiClient, Dto} from "@shared/api";
import {Product} from "@entities/product";
import {Category} from "@entities/category";
import {Subcategory} from "@entities/subcategory";

type GetProductsDto = Dto<
	{
		categoryId: Category["id"];
		subcategoryId: Subcategory["id"];
	},
	{
		categoryId: string;
		categoryName: string;
		subCategoryId: string;
		subCategoryName: string;
		products: Product[];
	}
>;

export const getProducts = (req: GetProductsDto["req"]) =>
	apiClient.get<GetProductsDto["res"]>(
		`/api/v1/categories/category/${req.categoryId}/subcategory/${req.subcategoryId}`,
	);

export const useProducts = (req: GetProductsDto["req"]) => {
	const {data, ...query} = useQuery({
		queryKey: ["products"],
		queryFn: () => getProducts(req),
	});

	return {
		subcatalogue: data?.data,
		...query,
	};
};
