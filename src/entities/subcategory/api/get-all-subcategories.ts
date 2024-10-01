import {useQuery} from "@tanstack/react-query";

import {apiClient, Dto} from "@shared/api";
import {Subcategory} from "@entities/subcategory";

type GetAllSubcategoriesDto = Dto<void, Subcategory[]>;

export const getAllSubcategories = () =>
	apiClient.get<GetAllSubcategoriesDto["res"]>("/api/v1/subcategories");

export const useAllSubcategories = () => {
	const {data, ...query} = useQuery({
		queryKey: ["subcategories"],
		queryFn: getAllSubcategories,
	});

	return {
		allSubcategories: data?.data,
		...query,
	};
};
