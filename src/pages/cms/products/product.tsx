import {useForm} from "react-hook-form";
import {useParams} from "wouter";

import {CmsTemplate} from "@features/cms";
import {Button} from "@shared/ui";
import {BACKEND_URL} from "@shared/config";
import {useDeleteProduct, useEditProduct} from "@features/cms/entities/product";
import {useProduct} from "@entities/product";

export const ProductPage: React.FC = () => {
	const {productId} = useParams() as {productId: string};

	const {product} = useProduct({id: Number(productId)});

	const {editProduct} = useEditProduct();
	const {deleteProduct} = useDeleteProduct();

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

				<img src={`${BACKEND_URL}${product?.photoPath}`} alt="Фотка" />

				<div className="flex gap-2">
					<Button
						className="mt-2 w-fit"
						size="small"
						disabled={!formState.isValid}
					>
						Редактировать
					</Button>

					<Button className="mt-2 w-fit" size="small">
						Удалить
					</Button>
				</div>
			</form>
		</CmsTemplate>
	);
};
