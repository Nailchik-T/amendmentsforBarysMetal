import {useParams} from "wouter";

import {CmsTemplate} from "@features/cms";
import {Button} from "@shared/ui";
import {BACKEND_URL} from "@shared/config";
import {
    useDeleteSubcategory,
    useSubcategory,
} from "@features/cms/entities/subcategory";
import {useNavigate} from "react-router-dom";

export const SubcategoryPage: React.FC = () => {
    const navigate = useNavigate();

    const {subcategoryId} = useParams() as {subcategoryId: string};

    const {subcategory} = useSubcategory({id: subcategoryId});
    const {deleteSubcategory} = useDeleteSubcategory();
    const handleDeleteSubcategory = () => {
        alert("Подкатегория успешна удалена!");
        navigate("/cms/subcategories");
    };
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
                        className={"w-72 h-5/6"}
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
                            if (subcategory) {
                                deleteSubcategory({id: subcategory.id});
                                handleDeleteSubcategory();
                            }
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
