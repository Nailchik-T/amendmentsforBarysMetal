import {Link} from "wouter";

import {CmsTemplate} from "@features/cms";
import {useAllCategories} from "@entities/category";

export const HomePage: React.FC = () => {
	const {allCategories} = useAllCategories();

	return (
		<CmsTemplate title="Категории" create="Создать категорию">
			<div className="flex flex-wrap -m-2">
				{allCategories?.map((category) => (
					<div className="p-2">
						<Link to={`/${category.id}`}>
							<span className="rounded-md border border-paper-contrast/25 bg-paper-secondary p-4">
								{category.name}
							</span>
						</Link>
					</div>
				))}
			</div>
		</CmsTemplate>
	);
};
