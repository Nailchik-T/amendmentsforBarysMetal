import {useQuery} from "@tanstack/react-query";

import {Category} from "@entities/category";
import {Product} from "@entities/product";
import {Subcategory} from "@entities/subcategory";
import {apiClient, Dto} from "@shared/api";

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
        // Уникальный ключ, зависящий от параметров запроса
        queryKey: ["products", req],
        queryFn: () => getProducts(req),
    });
    return {subcatalogue: data?.data, ...query};
};
