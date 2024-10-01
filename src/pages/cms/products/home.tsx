import {Link} from "wouter";

import {CmsTemplate} from "@features/cms";
import {useAllProducts} from "@entities/product";

export const HomePage: React.FC = () => {
	const {allProducts} = useAllProducts();

	return (
		<CmsTemplate title="Товары" create="Создать товар">
			<div className="flex flex-wrap gap-10">
				{allProducts?.map((product) => (
					<Link to={`/${product.id}`}>
						<span className="rounded-mg p-4 bg-paper-secondary">
							{product.name}
						</span>
					</Link>
				))}
			</div>
		</CmsTemplate>
	);
};
