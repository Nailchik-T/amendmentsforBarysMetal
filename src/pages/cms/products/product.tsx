import {useForm} from "react-hook-form";
import {useParams} from "wouter";

import {CmsTemplate} from "@features/cms";
import {Button} from "@shared/ui";
import {BACKEND_URL} from "@shared/config";
import {useDeleteProduct} from "@features/cms/entities/product";
import {useProduct} from "@entities/product";
import {useNavigate} from "react-router-dom";

export const ProductPage: React.FC = () => {
    const navigate = useNavigate();
    const {productId} = useParams() as {productId: string};

    const {product} = useProduct({id: Number(productId)});

    const {deleteProduct} = useDeleteProduct();

    const handleDeleteProduct = () => {
        deleteProduct({id: Number(productId)});
        navigate("/cms/products");
        alert("Продукт успешно удален!");
    };
    const {formState, handleSubmit, register} = useForm<{
        name: string;
        files: FileList | null;
    }>({
        values: {
            name: product?.name || "",
            files: null,
        },
    });

    return (
        <CmsTemplate title="Редактирование товара">
            <form
                onSubmit={handleSubmit(() => {
                    // editCategory()
                })}
                className="flex flex-col gap-2 items-start"
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
                    src={`${BACKEND_URL}${product?.photoPath}`}
                    className="h-40 object-contain rounded-lg"
                    alt="Фотка"
                />

                <div className="flex gap-2">
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
