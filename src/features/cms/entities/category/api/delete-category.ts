import {useMutation, useQueryClient} from "@tanstack/react-query";

import {Category} from "@entities/category";
import {apiClient, Dto} from "@shared/api";

export type DeleteCategoryDto = Dto<
    {
        id: number;
    },
    Category
>;

export const deleteCategory = (req: DeleteCategoryDto["req"]) =>
    apiClient.delete<DeleteCategoryDto["res"]>(`/api/v1/categories/${req.id}`);

export const useDeleteCategory = () => {
    const queryClient = useQueryClient();

    const {mutateAsync, ...mutation} = useMutation({
        mutationFn: deleteCategory,
        onSettled: async () => {
            await queryClient.invalidateQueries({
                queryKey: ["categories"],
            });
        },
    });

    return {
        deleteCategory: mutateAsync,
        ...mutation,
    };
};
