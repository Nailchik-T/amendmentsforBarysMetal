import {Container, Icon} from "@shared/ui";
import {Link} from "wouter";

export const Footer: React.FC = () => {
	return (
		<footer className="bg-primary py-20">
			<Container>
				<div className="flex justify-between text-primary-contrast md:flex-col md:gap-10">
					<div />

					<ul className="flex flex-col gap-y-4">
						<li>
							<Link to="/catalogue">Каталог</Link>
						</li>

						<li>
							<Link to="/delivery">Оплата и доставка</Link>
						</li>

						<li>
							<Link to="/terms">Полезная информация</Link>
						</li>

						<li>
							<Link to="/certificates">Сертификаты</Link>
						</li>
					</ul>

					<ul className="flex flex-col gap-y-4">
						<li>
							<Link to="/about">О нас</Link>
						</li>

						<li>
							<Link to="/categories">Категории</Link>
						</li>

						<li>
							<Link to="/popular">Популярные</Link>
						</li>

						<li>
							<Link to="/popular">Часто покупают</Link>
						</li>
					</ul>

					<ul className="flex flex-col gap-y-4">
						<li className="flex gap-x-2">
							<Icon.Location className="w-4 h-auto" />
							<span>г. Алматы, ул. Назарбаева, 94</span>
						</li>

						<li className="flex gap-x-2">
							<Icon.Phone className="w-4 h-auto" />
							<span>+7 (747) 774 77 44</span>
						</li>

						<li className="flex gap-x-2">
							<Icon.Mail className="w-4 h-auto" />
							<span>dewsoul@gmail.com</span>
						</li>
					</ul>
				</div>
			</Container>
		</footer>
	);
};
