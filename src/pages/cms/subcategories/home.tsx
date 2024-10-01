import {Link} from "wouter";

import {CmsTemplate} from "@features/cms";
import {useAllSubcategories} from "@entities/subcategory";

export const HomePage: React.FC = () => {
	const {allSubcategories} = useAllSubcategories();

	return (
		<CmsTemplate title="Подкатегории" create="Создать товар">
			<div className="flex flex-wrap -m-4">
				{allSubcategories?.map((subcategory) => (
					<Link to={`/${subcategory.id}`}>
						<span className="rounded-mg p-4 bg-paper-secondary">
							{subcategory.name}
						</span>
					</Link>
				))}
			</div>
		</CmsTemplate>
	);
};
