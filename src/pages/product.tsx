import {useState} from "react";
import * as RXTabs from "@radix-ui/react-tabs";
import {Link, useParams} from "wouter";

import {Button, ContentTemplate} from "@shared/ui";
import kaspi from "@shared/assets/kaspi.png";
import {useProduct} from "@entities/product";
import {BACKEND_URL} from "@shared/config";
import {format} from "@shared/lib/format";
import {useCartStore} from "@entities/cart";
import {Branch} from "@shared/lib/branch";

enum ProductTab {
	CHARACTERISTICS,
}

export const ProductPage: React.FC = () => {
	const {productId} = useParams() as {productId: string};

	const {product} = useProduct({
		id: Number(productId),
	});

	const {cart, addProduct} = useCartStore();

	const [quantity, setQuantity] = useState(1);

	if (!product) return null;

	const cartItem = cart.find((i) => i.product.id === product.id);

	const inCart = !!cartItem;

	return (
		<ContentTemplate
			breadcrumbs={[
				{
					label: "Главная",
					link: "/",
				},
				{
					label: "Каталог",
					link: "/catalogue",
				},
				{
					label: product.name,
					link: `/products/${product?.id}`,
				},
			]}
		>
			<div className="flex flex-col gap-6 ">
				<div className="flex gap-12 flex-wrap sm:items-center justify-center">
					<img
						src={`${BACKEND_URL}${product.photoPath}`}
						alt="Фотка"
						className="max-w-72 max-h-72"
					/>

					<div className="flex flex-col gap-8">
						<h1 className="text-3xl font-semibold text-primary">
							{product.name}
						</h1>
						Производитель: Paks Metal
						<div className="flex flex-col gap-6">
							<div className="flex flex-col gap-2">
								{product.properties.map((property) => (
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

							<span className="text-primary font-bold text-xl">
								{format.number(product.price)} тг
							</span>

							{!inCart && (
								<div className="flex items-center gap-4">
									<button
										onClick={() => {
											setQuantity(
												Math.max(quantity - 1, 1),
											);
										}}
										className="bg-[#aec1ff] text-primary-contrast text-3xl leading-[0] aspect-square rounded-lg p-2"
									>
										−
									</button>

									<span className="text-lg font-medium">
										{quantity}
									</span>

									<button
										onClick={() => {
											setQuantity(quantity + 1);
										}}
										className="bg-[#aec1ff] text-primary-contrast text-3xl leading-[0] aspect-square rounded-lg p-2"
									>
										+
									</button>
								</div>
							)}

							<div className="flex flex-col gap-3">
								<div className="flex gap-2">
									<Branch if={inCart}>
										<Link to="/cart">
											<Button className="py-3 text-sm border-primary border bg-transparent text-primary">
												Уже в корзине (
												{cartItem?.quantity})
											</Button>
										</Link>

										<Button
											onClick={() => {
												addProduct(product, quantity);
											}}
											className="py-3 text-sm"
										>
											В корзину
										</Button>
									</Branch>

									{/* <button className="aspect-square h-full p-3 border border-primary rounded-lg">
                                        <Icon.Cart className="w-full h-auto text-primary" />
                                    </button> */}
								</div>

								<a
									href={product.kaspi}
									target="_blank"
									className="w-fit"
								>
									<Button className="inline-flex items-center gap-4 bg-transparent border rounded-lg py-2 px-6 border-[#f14635] text-paper-contrast">
										<img
											src={kaspi}
											alt="Каспи"
											className="w-7 h-auto"
										/>

										<div className="flex flex-col justify-between items-start">
											<span className="font-semibold text-sm">
												В рассрочку
											</span>
										</div>
									</Button>
								</a>
							</div>
						</div>
					</div>
				</div>

				<RXTabs.Root
					defaultValue={String(ProductTab.CHARACTERISTICS)}
					className="flex flex-col gap-4"
				>
					<RXTabs.List>
						<RXTabs.Trigger
							value={String(ProductTab.CHARACTERISTICS)}
							className="px-4 py-2 border-b-2 border-primary text-primary text-lg font-semibold"
						>
							Характеристики
						</RXTabs.Trigger>
					</RXTabs.List>

					<RXTabs.Content value={String(ProductTab.CHARACTERISTICS)}>
						<p className="text-sm">{product?.description}</p>
					</RXTabs.Content>
				</RXTabs.Root>
			</div>
		</ContentTemplate>
	);
};
