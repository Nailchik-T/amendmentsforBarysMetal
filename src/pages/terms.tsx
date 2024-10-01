import {ContentTemplate, Icon} from "@shared/ui";

export const TermsPage: React.FC = () => {
	return (
		<ContentTemplate
			breadcrumbs={[
				{
					label: "Главная",
					link: "/",
				},
				{
					label: "Полезная информация",
					link: "/terms",
				},
			]}
		>
			<div className="flex flex-col gap-8">
				<h1 className="text-4xl text-primary font-semibold">
					Полезная информация
				</h1>

				<div className="flex flex-col gap-6">
					<div className="flex items-center gap-2">
						<div className="bg-primary/40 w-5 h-5 rounded-full relative inline-flex">
							<Icon.Check className="w- h-auto absolute right-0 top-0.5 text-primary" />
						</div>

						<h4 className="font-semibold text-primary text-lg">
							Инструкции по сборке
						</h4>
					</div>

					<p className="text-primary font-medium">
						Видео инструкции по сборке металлической мебели позволят
						Вам самостоятельно разобрать или собрать металлический
						шкаф, стеллаж, гардеробную систему или верстак.
						Наглядные и доступные инструкции по сборке мебели
						пригодятся в случае переезда или перестановки в офисе
						или на производстве.
					</p>

					<div className="flex flex-col gap-1">
						<a
							href="https://www.youtube.com/watch?v=_RMZHfHnxsU&pp=ygUU0LjQvdGB0YLRgNGD0LrRhtC40Y8%3D"
							className="inline-flex items-center underline underline-offset-2 font-medium gap-2"
						>
							<Icon.Attachment className="text-[#eaa700] w-4 h-auto" />

							<span>
								Видео-инструкция по сборке Гардеробных Систем
							</span>
						</a>

						<a
							href="https://www.youtube.com/watch?v=_RMZHfHnxsU&pp=ygUU0LjQvdGB0YLRgNGD0LrRhtC40Y8%3D"
							className="inline-flex items-center underline underline-offset-2 font-medium gap-2"
						>
							<Icon.Attachment className="text-[#eaa700] w-4 h-auto" />

							<span>
								Видео-инструкция по сборке Гардеробных Систем
							</span>
						</a>

						<a
							href="https://www.youtube.com/watch?v=_RMZHfHnxsU&pp=ygUU0LjQvdGB0YLRgNGD0LrRhtC40Y8%3D"
							className="inline-flex items-center underline underline-offset-2 font-medium gap-2"
						>
							<Icon.Attachment className="text-[#eaa700] w-4 h-auto" />

							<span>
								Видео-инструкция по сборке Гардеробных Систем
							</span>
						</a>
					</div>
				</div>
			</div>
		</ContentTemplate>
	);
};
