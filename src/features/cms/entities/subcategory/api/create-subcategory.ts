import {useMutation, useQueryClient} from "@tanstack/react-query";

import {apiClient, Dto} from "@shared/api";
import {Category} from "@entities/category";
import {Subcategory} from "@entities/subcategory";

export type CreateSubcategoryDto = Dto<
    {
        name: string;
        file: File;
        categoryId: Category["id"];
    },
    Subcategory
>;

export const createSubcategory = ({
    file,
    ...req
}: CreateSubcategoryDto["req"]) => {
    const formData = new FormData();

    formData.append("file", file);

    return apiClient.post<CreateSubcategoryDto["res"]>(
        "/api/v1/subcategories",
        formData,
        {
            params: req,
        },
    );
};

export const useCreateSubcategory = () => {
    const queryClient = useQueryClient();

    const {mutateAsync, ...mutation} = useMutation({
        mutationFn: createSubcategory,
        onSettled: async () => {
            await queryClient.invalidateQueries({
                queryKey: ["subcategories"],
            });
        },
    });

    return {
        createSubcategory: mutateAsync,
        ...mutation,
    };
};
