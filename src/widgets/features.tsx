import {Icon} from "@shared/ui";

export const Features: React.FC = () => {
	const features = [
		"Откройте мир организации и порядка с металлическими стеллажами!",
		"Мы предлагаем ПП выбор размеров и конфигураций стеллажей, чтобы удовлетворить потребности самых разных клиентов.",
		"Вы можете выбрать стеллажи с различными глубинами и высотами, а также выбрать оптимальное количество полок и расстояние между ними.",
	];

	return (
		<div className="flex flex-col gap-6">
			<h3 className="font-semibold text-3xl">Преимущества заказа</h3>

			<div className="flex flex-col gap-4">
				{features.map((feature, idx) => (
					<div key={idx} className="flex items-center gap-4">
						<div className="bg-primary/40 w-5 h-5 rounded-full relative inline-flex">
							<Icon.Check className="w- h-auto absolute right-0 top-0.5 text-primary" />
						</div>

						<span className="inline-flex flex-1">{feature}</span>
					</div>
				))}
			</div>
		</div>
	);
};
