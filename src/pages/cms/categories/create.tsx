import {useForm} from "react-hook-form";

import {CmsTemplate} from "@features/cms";
import {Button} from "@shared/ui";
import {useCreateCategory} from "@features/cms/entities/category";
import {useNavigate} from "react-router-dom";

export const CreatePage: React.FC = () => {
    const navigate = useNavigate();
    const {createCategory} = useCreateCategory();

    const {formState, handleSubmit, register} = useForm<{
        name: string;
        files: FileList;
    }>({});

    return (
        <CmsTemplate title="Создание категории">
            <form
                onSubmit={handleSubmit((form) => {
                    createCategory({
                        name: form.name,
                        file: form.files[0],
                    }).then(() => {
                        alert("Категория успешна создана!");
                        navigate("/cms/categories");
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
