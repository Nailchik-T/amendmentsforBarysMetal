import {useParams} from "wouter";

import {CmsTemplate} from "@features/cms";
import {Button} from "@shared/ui";
import {BACKEND_URL} from "@shared/config";
import {
	useDeleteSubcategory,
	useSubcategory,
} from "@features/cms/entities/subcategory";

export const SubcategoryPage: React.FC = () => {
	const {subcategoryId} = useParams() as {subcategoryId: string};

	const {subcategory} = useSubcategory({id: subcategoryId});
	const {deleteSubcategory} = useDeleteSubcategory();

	return (
		<CmsTemplate title="Редактирование категории">
			<form className="flex flex-col gap-2">
				<label className="flex gap-2">
					Название
					<input
						type="text"
						disabled
						value={subcategory?.name}
						className="border"
					/>
				</label>

				<span className="flex gap-2">
					Картинка
					<img
						src={`${BACKEND_URL}${subcategory?.photoPath}`}
						alt="Фотка"
					/>
				</span>

				<label className="flex gap-2">
					Категория
					<input
						type="text"
						value={subcategory?.categoryName}
						disabled
					/>
				</label>

				<div className="flex gap-2">
					<Button
						className="mt-2 w-fit"
						size="small"
						onClick={() => {
							if (subcategory)
								deleteSubcategory({id: subcategory.id});
						}}
						type="button"
					>
						Удалить
					</Button>
				</div>
			</form>
		</CmsTemplate>
	);
};
