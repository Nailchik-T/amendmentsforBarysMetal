import {ContentTemplate} from "@shared/ui";

export const ListPage: React.FC = () => {
	return (
		<ContentTemplate
			breadcrumbs={[
				{
					label: "Главная",
					link: "/",
				},
				{
					label: "Что-то",
					link: "/list",
				},
			]}
		>
			asdfadsfasdf
		</ContentTemplate>
	);
};
