import {useAllCategories} from "@entities/category";
import {BACKEND_URL} from "@shared/config.ts";
import {ContentTemplate} from "@shared/ui";
import {Link} from "wouter";

export const Categories = () => {
    const {allCategories} = useAllCategories();
    return (
        <ContentTemplate
            breadcrumbs={[
                {
                    label: "Главная",
                    link: "/",
                },
                {
                    label: "Категории",
                    link: "/categories",
                },
            ]}
        >
            <div className="flex flex-wrap mt-16 -m-4">
                {allCategories?.map((category, idx) => (
                    <Link
                        key={idx}
                        to={`catalogue?categoryId=${category.id}`}
                        className="w-1/3 p-4 lg:w-1/2 sm:w-full "
                    >
                        <div className="w-full flex flex-col items-center border border-paper-contrast/25 rounded-lg gap-y-4 p-6">
                            <div className="flex justify-center items-center gap-x-2">
                                <img
                                    key={category.id}
                                    src={`${BACKEND_URL}${category.photoPath}`}
                                    alt={category.name}
                                    className="w-full h-40 object-contain rounded-lg"
                                />
                            </div>

                            <h5 className="text-lg font-semibold text-paper-contrast">
                                {category.name}
                            </h5>
                        </div>
                    </Link>
                ))}
            </div>
        </ContentTemplate>
    );
};
