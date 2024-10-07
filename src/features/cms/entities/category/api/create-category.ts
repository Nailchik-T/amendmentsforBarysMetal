import {useMutation, useQueryClient} from "@tanstack/react-query";

import {apiClient, Dto} from "@shared/api";
import {Category} from "@entities/category";

export type CreateCategoryDto = Dto<
    {
        name: string;
        file: File;
    },
    Category
>;

export const createCategory = (req: CreateCategoryDto["req"]) => {
    const formData = new FormData();

    formData.append("name", req.name);
    formData.append("file", req.file);

    return apiClient.post<CreateCategoryDto["res"]>(
        "/api/v1/categories",
        formData,
    );
};

export const useCreateCategory = () => {
    const queryClient = useQueryClient();

    const {mutateAsync, ...mutation} = useMutation({
        mutationFn: createCategory,
        onSettled: async () => {
            await queryClient.invalidateQueries({
                queryKey: ["categories"],
            });
        },
    });

    return {
        createCategory: mutateAsync,
        ...mutation,
    };
};
