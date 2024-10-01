import {useState} from "react";
import {Link, useSearch} from "wouter";

import {useCartStore} from "@entities/cart";
import {Category, useCategory} from "@entities/category";
import {Product, useProducts} from "@entities/product";
import {Subcategory} from "@entities/subcategory";
import {BACKEND_URL} from "@shared/config";
import {Branch} from "@shared/lib/branch";
import {qs} from "@shared/lib/querystring";
import {
	Button,
	ContentTemplate,
	Icon,
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@shared/ui";
import {Features} from "@widgets/features";

export const CataloguePage: React.FC = () => {
	const search = useSearch();

	const {categoryId, subcategoryId} = qs<{
		categoryId: string;
		subcategoryId: string;
	}>(search);

	if (subcategoryId)
		return (
			<SubcategoryCatalogue
				categoryId={Number(categoryId)}
				subcategoryId={Number(subcategoryId)}
			/>
		);

	return <CategoryCatalogue categoryId={Number(categoryId)} />;
};

const SubcategoriesList: React.FC<{
	category: Category;
	subcategories: Subcategory[];
}> = ({category, subcategories}) => {
	return (
		<div className="flex flex-wrap gap-8 sm:justify-center ">
			{subcategories.map((subcategory, idx) => (
				<Link
					key={idx}
					to={`/catalogue?categoryId=${category.id}&subcategoryId=${subcategory.id}`}
					className={'w-[360px]'}
				>
					<div className="min-w-[320px] max-h-[320px] h-full flex flex-col justify-between items-center border border-paper-contrast/25 rounded-lg gap-y-4 p-6">
						<div className="flex justify-center items-center gap-x-2 min-w-[320px]">
							{Array.from({length: 3}).map((_, idx) => (
								<img
									key={idx}
									src={`${BACKEND_URL}${subcategory.photoPath}`}
									alt="Фотка"
									className="w-1/3 object-contain"
								/>
							))}
						</div>

						<h5 className="text-lg font-semibold text-paper-contrast">
							{subcategory.name}
						</h5>
					</div>
				</Link>
			))}
		</div>
	);
};

const SubcategoryCatalogue: React.FC<{
	categoryId: number;
	subcategoryId: number;
}> = ({categoryId, subcategoryId}) => {
	const {category} = useCategory({
		id: categoryId,
	});

	const {subcatalogue} = useProducts({
		categoryId,
		subcategoryId,
	});

	if (!category || !subcatalogue) return null;

	const subcategory = category.subCategories.find(
		(sc) => sc.id === subcategoryId,
	)!;

	return (
		<ContentTemplate
			breadcrumbs={[
				{label: "Главная", link: "/"},
				{
					label: category.name,
					link: `/catalogue?categoryId=${categoryId}`,
				},
				{
					label: subcategory.name,
					link: `/catalogue?categoryId=${categoryId}&subcategoryId=${subcategory.id}`,
				},
			]}
			className="flex flex-col gap-4"
		>
			<div className="flex flex-col gap-8">
				<Features />

				<h2 className="font-semibold text-3xl">{subcategory.name}</h2>
			</div>

			<ProductsList products={subcatalogue.products} />
		</ContentTemplate>
	);
};

const CategoryCatalogue: React.FC<{
	categoryId: number;
}> = ({categoryId}) => {
	const {category} = useCategory({id: categoryId});

	if (!category) return null;

	const showSubcategories = !!category.subCategories.length;

	return (
		<ContentTemplate
			breadcrumbs={[
				{label: "Главная", link: "/"},
				{
					label: category.name,
					link: `/catalogue?categoryId=${categoryId}`,
				},
			]}
			className="flex flex-col gap-4"
		>
			<Branch if={showSubcategories}>
				<div className="flex flex-col gap-8">
					<h2 className="font-semibold text-3xl">{category?.name}</h2>

					<SubcategoriesList
						category={category}
						subcategories={category.subCategories}
					/>
				</div>

				<>
					<div className="flex flex-col gap-8">
						<Features />

						<h2 className="font-semibold text-3xl">
							{category?.name}
						</h2>
					</div>

					<ProductsList products={category.products} />
				</>
			</Branch>
		</ContentTemplate>
	);
};

type SortMethod = "expensive" | "inexpensive";

const ProductsList: React.FC<{
	products: Product[];
}> = ({products}) => {
	const {cart, addProduct} = useCartStore();

	const [sortMethod, setSortMethod] = useState<SortMethod>("inexpensive");

	const sortProducts = () => {
		const dupe = [...products];

		let sorted = [] as Product[];

		if (sortMethod === "expensive")
			sorted = dupe.sort((a, b) => a.price - b.price);
		else if (sortMethod === "inexpensive")
			sorted = dupe.sort((a, b) => b.price - a.price);

		return sorted;
	};

	return (
		<div className="flex flex-col gap-4">
			<div className="flex justify-between">
				<div />

				<div className="flex items-center gap-4">
					<span>Сортировать</span>

					<Select
						defaultValue={sortMethod}
						onValueChange={(value) => {
							setSortMethod(value as SortMethod);
						}}
					>
						<SelectTrigger>
							<SelectValue placeholder="Выберите метод" />
						</SelectTrigger>

						<SelectContent>
							<SelectGroup>
								<SelectItem value="expensive">
									по возрастанию цены
								</SelectItem>

								<SelectItem value="inexpensive">
									по убыванию цены
								</SelectItem>
							</SelectGroup>
						</SelectContent>
					</Select>
				</div>
			</div>

			<div className="flex flex-wrap gap-10 -m-2 justify-center">
				{sortProducts().map((product) => {
					const isInCart = cart.some(
						(i) => i.product.id === product.id,
					);

					return (
						<Link
							key={product.id}
							to={`/products/${product.id}`}
							className="w-[270px]"
						>
							<div className="flex flex-col h-full gap-4 bg-paper-primary shadow-even-md rounded-lg p-4 ">
								<div className="w-full h-52">
									<img
										src={`${BACKEND_URL}${product.photoPath}`}
										alt="Фотка"
										className="mx-auto max-w-full max-h-full"
									/>
								</div>

								<div className="flex flex-col gap-3 flex-1">
									<h5 className="font-semibold text-base line-clamp-3 h-20">
										{product.name}
									</h5>

									<span className="font-bold text-lg text-primary line-clamp-1">
										{product.price} тг
									</span>

									<div className="flex flex-col gap-1 text-sm min-h-16 overflow-hidden flex-1">
										{product?.properties
											.slice(0, 3)
											.map((property) => (
												<div
													key={property.key}
													className="inline overflow-hidden text-ellipsis whitespace-nowrap"
												>
													<span className="text-paper-contrast/70">
														{property.key}:{" "}
													</span>

													<span className="font-medium">
														{property.value}
													</span>
												</div>
											))}
									</div>

									<div className="flex justify-between gap-4">
										<Branch if={isInCart}>
											<Link
												to="/cart"
												className="flex w-full"
											>
												<Button className="p-0 w-full text-sm border-primary border bg-transparent text-primary">
													Уже в корзине
												</Button>
											</Link>

											<Button
												onClick={(event) => {
													event.preventDefault();
													event.stopPropagation();

													addProduct(product);
												}}
												className="w-full p-0 text-sm"
											>
												В корзину
											</Button>
										</Branch>

										<Link to="/cart">
											<button className="p-3 border border-primary rounded-lg">
												<Icon.Cart className="w-5 h-auto text-primary" />
											</button>
										</Link>
									</div>
								</div>
							</div>
						</Link>
					);
				})}
			</div>
		</div>
	);
};
