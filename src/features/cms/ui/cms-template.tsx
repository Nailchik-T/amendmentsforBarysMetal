import {Link, useLocation} from "wouter";

import {Button} from "@shared/ui";
import {cx} from "class-variance-authority";

interface CmsTemplateProps extends React.PropsWithChildren {
	title?: string;
	create?: string;
}

export const CmsTemplate: React.FC<CmsTemplateProps> = ({
	children,
	title,
	create,
}) => {
	const [location] = useLocation();

	return (
		<div className="flex h-screen">
			<aside className="w-[280px] h-full p-8 bg-paper-secondary font-medium text-lg flex flex-col gap-12">
				<h2 className="text-primary text-2xl font-semibold">Админка</h2>

				<ul className="flex flex-col gap-2">
					{[
						{
							label: "Главная",
							link: "~/cms",
						},
						{
							label: "Категории",
							link: "~/cms/categories",
						},
						{
							label: "Подкатегории",
							link: "~/cms/subcategories",
						},
						{
							label: "Товары",
							link: "~/cms/products",
						},
						{
							label: "Заявки",
							link: "~/cms/inquiries",
						},
						{
							label: "Заказы",
							link: "~/cms/orders",
						},
					].map(({label, link}) => (
						<Link
							href={link}
							className={cx({
								"text-primary font-semibold underline underline-offset-2":
									location.startsWith(link.slice(1)),
							})}
						>
							{label}
						</Link>
					))}
				</ul>
			</aside>

			<main className="flex flex-col flex-1 h-full relative p-8">
				{create && (
					<Link to={`${location}create`}>
						<Button className="absolute right-8 top-8">
							{create}
						</Button>
					</Link>
				)}

				{title && (
					<h1 className="text-4xl text-primary font-bold mb-16">
						{title}
					</h1>
				)}

				{children}
			</main>
		</div>
	);
};
