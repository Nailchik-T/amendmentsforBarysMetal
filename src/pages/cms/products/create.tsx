import {useForm} from "react-hook-form";

import {CmsTemplate} from "@features/cms";
import {Button} from "@shared/ui";
import {useCreateProduct} from "@features/cms/entities/product";
import {Category, useAllCategories, useCategory} from "@entities/category";
import {Subcategory} from "@entities/subcategory";

export const CreatePage: React.FC = () => {
    const {formState, handleSubmit, register, watch} = useForm<{
        name: string;
        price: number;
        files: FileList;
        categoryId: Category["id"];
        subcategoryId: Subcategory["id"] | null;
        description: string;
        kaspi: string;
        property1: {
            key: string;
            value: string;
        };
        property2: {
            key: string;
            value: string;
        };
        property3: {
            key: string;
            value: string;
        };
        property4: {
            key: string;
            value: string;
        };
        property5: {
            key: string;
            value: string;
        };
    }>({});

    const [categoryId] = watch(["categoryId"]);

    const {createProduct} = useCreateProduct();

    const {allCategories} = useAllCategories();

    const {category} = useCategory({
        id: categoryId,
    });

    return (
        <CmsTemplate title="Создание товара">
            <form
                onSubmit={handleSubmit((form) => {
                    createProduct({
                        name: form.name,
                        price: form.price,
                        description: form.description,
                        file: form.files[0],
                        categoryId: Number(form.categoryId),
                        subCategoryId: Number(form.subcategoryId)
                            ? Number(form.subcategoryId)
                            : null,
                        productProperties: [
                            form.property1,
                            form.property2,
                            form.property3,
                            form.property4,
                            form.property5,
                        ],
                        kaspi: form.kaspi,
                    });
                    alert("Продукт успешно создан!");
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
                    Описание
                    <textarea
                        {...register("description", {
                            required: true,
                        })}
                        className="border"
                    />
                </label>

                <label className="flex gap-2">
                    Цена
                    <input
                        type="number"
                        {...register("price", {
                            required: true,
                        })}
                        min={0}
                        className="border"
                    />
                </label>

                <label className="flex gap-2">
                    Ссылка на товар на Kaspi.kz
                    <input
                        type="text"
                        {...register("kaspi", {
                            required: true,
                        })}
                        className="border"
                    />
                </label>

                <label className="flex gap-2">
                    Категория
                    <select {...register("categoryId")} className="border">
                        <option value="" disabled selected>
                            Выберите
                        </option>

                        {allCategories?.map((c) => (
                            <option value={c.id} key={c.id}>
                                {c.name}
                            </option>
                        ))}
                    </select>
                </label>

                <label className="flex gap-2">
                    Подкатегория
                    <select {...register("subcategoryId")} className="border">
                        <option value="" disabled selected>
                            Выберите
                        </option>

                        {category?.subCategories.map((sc) => (
                            <option value={sc.id}>{sc.name}</option>
                        ))}
                    </select>
                </label>

                <div className="flex gap-2">
                    Свойство 1*
                    <input
                        type="text"
                        className="border"
                        {...register("property1.key")}
                    />
                    <input
                        type="text"
                        className="border"
                        {...register("property1.value")}
                    />
                </div>

                <div className="flex gap-2">
                    Свойство 2
                    <input
                        type="text"
                        className="border"
                        {...register("property2.key")}
                    />
                    <input
                        type="text"
                        className="border"
                        {...register("property2.value")}
                    />
                </div>

                <div className="flex gap-2">
                    Свойство 3
                    <input
                        type="text"
                        className="border"
                        {...register("property3.key")}
                    />
                    <input
                        type="text"
                        className="border"
                        {...register("property3.value")}
                    />
                </div>

                <div className="flex gap-2">
                    Свойство 4
                    <input
                        type="text"
                        className="border"
                        {...register("property4.key")}
                    />
                    <input
                        type="text"
                        className="border"
                        {...register("property4.value")}
                    />
                </div>

                <div className="flex gap-2">
                    Свойство 5
                    <input
                        type="text"
                        className="border"
                        {...register("property5.key")}
                    />
                    <input
                        type="text"
                        className="border"
                        {...register("property5.value")}
                    />
                </div>

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
