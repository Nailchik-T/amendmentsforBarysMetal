import {useQuery} from "@tanstack/react-query";

import {apiClient, Dto} from "@shared/api";
import {Category} from "@entities/category";

type GetAllCategoriesDto = Dto<void, Category[]>;

export const getAllCategories = () =>
	apiClient.get<GetAllCategoriesDto["res"]>("/api/v1/categories");

export const useAllCategories = () => {
	const {data, ...query} = useQuery({
		queryKey: ["categories"],
		queryFn: getAllCategories,
	});

	return {
		allCategories: data? data.data : [],
		...query,
	};
};
