import {Link} from "wouter";
import {FaAngleDown} from "react-icons/fa6";
import {FaAngleUp} from "react-icons/fa6";

import {Category, useAllCategories} from "@entities/category";
import {useState} from "react";

interface ICategoryProps {
	allCategories: Category[];
}

const CategoryList: React.FC<ICategoryProps> = ({allCategories}) => {
	// Состояние для управления открытыми подкатегориями
	const [openSubCategories, setOpenSubCategories] = useState<{
		[key: number]: boolean;
	}>({});

	// Функция для переключения видимости подкатегорий
	const toggleSubCategories = (categoryId: number) => {
		setOpenSubCategories((prev) => ({
			...prev,
			[categoryId]: !prev[categoryId],
		}));
	};

	return (
		<ul className="flex flex-col mt-6 gap-y-5 w-full">
			{allCategories?.map((category) => (
				<li key={category.id}>
					<div className="flex items-center justify-between md:w-full">
						<Link to={`/catalogue?categoryId=${category.id}`}>
							{category.name}
						</Link>
						{/* Если есть подкатегории, отображаем стрелку */}
						{category.subCategories?.length > 0 && (
							<button
								onClick={() => toggleSubCategories(category.id)}
								className="focus:outline-none"
							>
								{openSubCategories[category.id] ? (
									<FaAngleUp
										className={
											"text-gray-400 md:text-black md:text-sm text"
										}
									/>
								) : (
									<FaAngleDown
										className={
											"text-gray-400 md:text-black md:text-sm text"
										}
									/>
								)}
							</button>
						)}
					</div>

					{openSubCategories[category.id] && (
						<ul className="pl-4 mt-2 flex flex-col gap-y-3 ">
							{category.subCategories.map((subCategory) => (
								<li key={subCategory.id}>
									<Link
										to={`/catalogue?categoryId=${category.id}&subcategoryId=${subCategory.id}`}
									>
										{subCategory.name}
									</Link>
								</li>
							))}
						</ul>
					)}
				</li>
			))}
		</ul>
	);
};

export default CategoryList;

export const Sidebar: React.FC = () => {
	const {allCategories} = useAllCategories();

	return (
		<aside className="w-[320px] h-min flex-col gap-y-8 bg-paper-secondary rounded-lg p-5 sticky top-6 xl:max-w-[200px] sm:hidden	">
			<h3 className="border-b border-b-paper-contrast/55 text-paper-contrast text-2xl pb-4 font-semibold">
				Каталог
			</h3>

			<ul className="flex flex-col mt-6 gap-y-5">
				<CategoryList allCategories={allCategories} />
			</ul>
		</aside>
	);
};
