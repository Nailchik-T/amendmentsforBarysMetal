import {useMutation} from "@tanstack/react-query";

import {apiClient, Dto} from "@shared/api";
import {Category} from "@entities/category";
import {Subcategory} from "@entities/subcategory";

export type CreateProductDto = Dto<
    {
        name: string;
        price: number;
        file: File;
        categoryId: Category["id"];
        subCategoryId?: Subcategory["id"] | null;
        description: string;
        kaspi: string;
        productProperties: Array<{
            key: string;
            value: string;
        }>;
    },
    Category
>;

export const createProduct = ({
    file,
    productProperties,
    ...req
}: CreateProductDto["req"]) => {
    const formData = new FormData();

    formData.append("file", file);

    Object.keys(req).forEach((key) => {
        formData.append(key, req[key]);
    });

    formData.append("productProperties", JSON.stringify(productProperties));

    return apiClient.post<CreateProductDto["res"]>(
        "/api/v1/products",
        formData,
    );
};

export const useCreateProduct = () => {
    const {mutateAsync, ...mutation} = useMutation({
        mutationFn: createProduct,
    });

    return {
        createProduct: mutateAsync,
        ...mutation,
    };
};
