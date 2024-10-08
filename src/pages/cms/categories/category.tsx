import {useForm} from "react-hook-form";
import {useParams} from "wouter";

import {useCategory} from "@entities/category";
import {CmsTemplate} from "@features/cms";
import {useDeleteCategory} from "@features/cms/entities/category";
import {BACKEND_URL} from "@shared/config";
import {Button} from "@shared/ui";
import {useNavigate} from "react-router-dom";

export const CategoryPage: React.FC = () => {
    const navigate = useNavigate();
    const {categoryId} = useParams() as {categoryId: number};

    const {category} = useCategory({id: categoryId});
    const {deleteCategory} = useDeleteCategory();

    const handleDeleteProduct = () => {
        deleteCategory({id: Number(categoryId)});
        navigate("/cms/categories");
        alert("Категория успешна удалена!");
    };

    const {formState, handleSubmit, register} = useForm<{
        name: string;
        files: FileList | null;
    }>({
        values: {
            name: category?.name || "",
            files: null,
        },
    });

    return (
        <CmsTemplate title="Редактирование категории">
            <form
                onSubmit={handleSubmit(() => {
                    // editCategory()
                })}
                className="flex flex-col gap-2"
            >
                <label className="flex gap-2">
                    Название
                    <input
                        type="text"
                        {...register("name", {
                            required: true,
                        })}
                        className="border"
                    />
                </label>

                <label className="flex gap-2">
                    Картинка
                    <input
                        type="file"
                        {...register("files", {
                            required: true,
                        })}
                    />
                </label>

                <img
                    className={"w-72 h-5/6"}
                    src={`${BACKEND_URL}${category?.photoPath}`}
                    alt="Фотка"
                />

                <div className="flex gap-2">
                    <Button
                        className="mt-2 w-fit"
                        size="small"
                        disabled={!formState.isValid}
                    >
                        Редактировать
                    </Button>

                    <Button
                        onClick={handleDeleteProduct}
                        className="mt-2 w-fit"
                        size="small"
                    >
                        Удалить
                    </Button>
                </div>
            </form>
        </CmsTemplate>
    );
};
