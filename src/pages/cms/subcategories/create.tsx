import {useForm} from "react-hook-form";

import {CmsTemplate} from "@features/cms";
import {Button} from "@shared/ui";
import {Category, useAllCategories} from "@entities/category";
import {useCreateSubcategory} from "@features/cms/entities/subcategory";
import {useNavigate} from "react-router-dom";

export const CreatePage: React.FC = () => {
    const navigate = useNavigate();
    const {formState, handleSubmit, register} = useForm<{
        name: string;
        files: FileList;
        categoryId: Category["id"];
    }>({});

    const {createSubcategory} = useCreateSubcategory();

    const {allCategories} = useAllCategories();

    return (
        <CmsTemplate title="Создание подкатегории">
            <form
                onSubmit={handleSubmit((form) => {
                    createSubcategory({
                        name: form.name,
                        file: form.files[0],
                        categoryId: Number(form.categoryId),
                    }).then(() => {
                        alert("Подкатегория успешна создана!");
                        navigate("/cms/subcategories");
                    });
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

                <label className="flex gap-2">
                    Категория
                    <select
                        {...register("categoryId", {
                            required: true,
                        })}
                        className="border"
                        defaultValue=""
                    >
                        <option value="" disabled>
                            Выберите категорию
                        </option>
                        {allCategories?.map((c) => (
                            <option value={c.id} key={c.id}>
                                {c.name}
                            </option>
                        ))}
                    </select>
                </label>

                <Button
                    className="mt-2 w-fit"
                    size="small"
                    disabled={!formState.isValid}
                >
                    Создать
                </Button>
            </form>
        </CmsTemplate>
    );
};
