import {DeliveryOption} from "@entities/order";
import {BACKEND_URL} from "@shared/config.ts";
import {format} from "@shared/lib/format.tsx";
import {ContentTemplate} from "@shared/ui";
import {useEffect, useState} from "react";
import {BlankForm} from "@pages/order.tsx";

// export const OrderSuccess: React.FC = () => {
// 	return (
// 		<ContentTemplate
// 			breadcrumbs={[
// 				{
// 					label: "Главная",
// 					link: "/",
// 				},
// 				{
// 					label: "Оформление заказа",
// 					link: "/about",
// 				},
// 			]}
// 		>
// 			<div className="flex flex-col gap-8">
// 				<h1 className="text-3xl text-primary font-semibold">
// 					Спасибо за заказ
// 				</h1>
//
// 				<div className="flex flex-col gap-6">
// 					<p>
// 						<span className="font-semibold">
// 							Благодарим за Ваш заказ!
// 						</span>{" "}
// 						В ближайшее время наши специалисты свяжутся с Вами для
// 						уточнения деталей заказа. Если заказ сделан в нерабочее
// 						время, то мы перезвоним в первый рабочий день.
// 					</p>
//
// 					<ul className="flex flex-col">
// 						<li className="inline-flex items-center gap-2">
// 							<span>Номер Вашего заказа: </span>
// 							<span className="font-semibold">1</span>
// 						</li>
//
// 						<li className="inline-flex items-center gap-2">
// 							<span>Дата заказа: </span>
// 							<span className="font-semibold">1</span>
// 						</li>
//
// 						<li className="inline-flex items-center gap-2">
// 							<span>Доставка: </span>
// 							<span className="font-semibold">бесплатно</span>
// 						</li>
//
// 						<li className="inline-flex items-center gap-2">
// 							<span>Сумма к оплате: </span>
// 							<span className="font-semibold">₸</span>
// 						</li>
// 					</ul>
//
// 					<Button className="w-fit" size="small">
// 						Распечатать бланк заказа
// 					</Button>
// 				</div>
// 			</div>
// 		</ContentTemplate>
// 	);
// };

// Форматирование даты в удобочитаемый вид

const InfoSection: React.FC<{
	title: string;
	properties: Array<{
		name: string;
		value: string;
	}>;
}> = ({title, properties}) => {
	return (
		<div className="flex flex-col rounded-lg border border-paper-contrast/25 text-paper-contrast/70 p-8 relative">
			<span className="absolute left-8 top-0 -translate-y-1/2 z-10 bg-paper-primary px-4">
				{title}
			</span>

			<div className="flex flex-col gap-4">
				{properties.map((property) => (
					<div className="flex items-center gap-2">
						<span className="w-52 text-paper-contrast/70">
							{property.name}
						</span>

						<span className="font-semibold">{property.value}</span>
					</div>
				))}
			</div>
		</div>
	);
};

export const OrderSuccess = () => {
	const [orderData, setOrderData] = useState<BlankForm | null>(null);

	useEffect(() => {
		const storedData = localStorage.getItem("orderData");
		if (storedData) {
			const parsedData = JSON.parse(storedData);
			setOrderData(parsedData);
			localStorage.removeItem("orderData");
		}
	}, []);

	if (!orderData) {
		return (
			<ContentTemplate
				breadcrumbs={[
					{
						label: "Главная",
						link: "/",
					},
					{
						label: "Оформление заказа",
						link: "/about",
					},
				]}
			>
				<div>Ошибка: нет данных о заказе.</div>
			</ContentTemplate>
		);
	}

	const {recipient, order, delivery, items} = orderData;
	const total = items
		.map((i) => i.product.price * i.quantity)
		.reduce((prev, total) => prev + total, 0);

	const date = new Date(order.createdAt);
	const year = date.getFullYear();
	const month = date.getMonth() + 1; // Месяцы начинаются с 0
	const day = date.getDate();
	const hours = date.getHours();
	const minutes = date.getMinutes();
	const seconds = date.getSeconds();

	// Форматируем строку
	const formattedDate = `${day}.${month}.${year} ${hours}:${minutes}:${seconds}`;

	return (
		<ContentTemplate
			className={"overflow-scroll"}
			breadcrumbs={[
				{
					label: "Главная",
					link: "/",
				},
				{
					label: "Оформление заказа",
					link: "/about",
				},
			]}
		>
			<div className="flex flex-col gap-12">
				<h1 className="text-3xl text-primary font-semibold">
					Ваш заказ
				</h1>

				<div className="flex flex-col gap-8">
					<InfoSection
						title="Личные данные"
						properties={[
							{
								name: "ФИО",
								value: recipient.fullName,
							},
							{
								name: "Телефон",
								value: recipient.phone,
							},
							{
								name: "Почта",
								value: recipient.email || "—",
							},
							{
								name: "Компания",
								value: recipient.company || "—",
							},
						]}
					/>

					<InfoSection
						title="Cведения о заказе"
						properties={[
							{
								name: "Номер заказа",
								value: order.id.toString() || "_",
							},
							{
								name: "Статус заказа",
								value: "Новый",
							},
							{
								name: "Создан",
								value: formattedDate,
							},
						]}
					/>

					<InfoSection
						title="Cведения о доставке"
						properties={[
							{
								name: "Доставка",
								value: {
									[DeliveryOption.DELIVERY]: "Доставка",
									[DeliveryOption.PICKUP]: "Самовывоз",
								}[delivery.method],
							},
							{
								name: "Стоимость",
								value: "Бесплатно",
							},
						]}
					/>

					<div className="flex flex-col border border-paper-contrast/25 rounded-xl min-w-[520px]">
						<div className="overflow-hidden">
							<div className="flex items-center text-center py-6 border-b border-paper-contrast/10">
								<div className="w-[30%]">Название</div>

								<div className="w-[20%]">Цена, ₸</div>

								<div className="w-[20%]">Со скидкой, ₸</div>

								<div className="w-[10%]">Кол-во</div>

								<div className="w-[20%]">Сумма, ₸</div>
							</div>

							<div className="flex flex-col ">
								{items.map((item) => (
									<div
										key={item.product.id}
										className="flex items-center py-6 border-b border-paper-contrast/10"
									>
										<div className="w-[30%] inline-flex justify-center px-4">
											<div className="flex items-center gap-3">
												<img
													src={`${BACKEND_URL}${item.product.photoPath}`}
													alt="Фотка"
													className="max-w-12 max-h-12"
												/>

												<span className="text-primary font-semibold line-clamp-2">
													{item.product.name}
												</span>
											</div>
										</div>

										<div className="w-[20%] text-center">
											<span>
												{format.number(
													item.product.price,
												)}{" "}
												₸
											</span>
										</div>

										<div className="w-[20%] text-center">
											<span>
												{format.number(
													item.product.price,
												)}{" "}
												₸
											</span>
										</div>

										<div className="w-[10%] text-center">
											<span>{item.quantity}</span>
										</div>

										<div className="w-[20%] text-center">
											<span>
												{format.number(
													item.product.price *
														item.quantity,
												)}{" "}
												₸
											</span>
										</div>
									</div>
								))}
							</div>
						</div>

						<div className="flex items-center justify-between font-semibold p-6">
							<span>Итого</span>

							<span>{format.number(total)} ₸</span>
						</div>
					</div>
				</div>
			</div>
		</ContentTemplate>
	);
};
