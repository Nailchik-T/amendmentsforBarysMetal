import {cx} from "class-variance-authority";
import {useState} from "react";
import {useForm} from "react-hook-form";
import {Link, useLocation} from "wouter";

import {useCartStore} from "@entities/cart";
import {useCreateInquiry, useInquiryStore} from "@entities/inquiry";
import {
	Button,
	Container,
	Dialog,
	DialogContent,
	DialogTrigger,
	Icon,
	Input,
	Label,
	Logo,
} from "@shared/ui";
import HeaderMobile from "../components/Header/HeaderMobile.tsx";
import {RxHamburgerMenu} from "react-icons/rx";

export const Header: React.FC = () => {
	const [location] = useLocation();
	const [isOpen, setIsOpen] = useState(false);

	const openModal = () => setIsOpen(true);
	const closeModal = () => setIsOpen(false);
	const {cart} = useCartStore();
	const {sentInquiry, setSentInquiry} = useInquiryStore();

	const {createInquiry} = useCreateInquiry();

	const [isInquiryModalOpen, setIsInquiryModalOpen] = useState(false);

	const {register, handleSubmit} = useForm<{
		fullName: string;
		phone: string;
		comment?: string;
	}>();

	return (
		<>
			<HeaderMobile isOpen={isOpen} closeModal={closeModal} />
			<header className="bg-paper-primary shadow-md">
				<Container>
					<div className="flex flex-col">
						<div className="flex items-center justify-between py-4">
							<div className="flex items-center gap-3.5">
								<RxHamburgerMenu
									onClick={openModal}
									className={
										"text-2xl hidden md:block cursor-pointer"
									}
								/>

								<Logo />
							</div>
							<ul className="flex items-center gap-x-6 text-sm lg:gap-x-3 md:gap-6">
								{[
									{
										Icon: Icon.Location,
										label: "г. Алматы, ул. Назарбаева, 94",
									},
									{
										Icon: Icon.Phone,
										label: "+7 (747) 774 77 44",
									},
									{
										Icon: Icon.Mail,
										label: "dewsoul@gmail.com",
									},
								].map(({Icon, label}) => (
									<li className="flex items-center gap-x-4 md:hidden">
										<Icon className="text-primary w-4 h-auto" />
										<span>{label}</span>
									</li>
								))}
								<Link className={"hidden md:block"} to="/cart">
									<span className="relative">
										<Icon.Cart className="text-primary w-6 h-auto" />

										{!!cart.length && (
											<span className="absolute -right-4 -top-4 text-sm p-1 bg-primary text-primary-contrast rounded-full w-5 h-5 flex items-center justify-center">
												{cart.length}
											</span>
										)}
									</span>
								</Link>
								<li>
									<Dialog
										open={isInquiryModalOpen}
										onOpenChange={setIsInquiryModalOpen}
									>
										{!sentInquiry && (
											<DialogTrigger>
												<Button size="small">
													Оставить заявку
												</Button>
											</DialogTrigger>
										)}

										<DialogContent className="bg-paper-primary rounded-lg p-8">
											<form
												onSubmit={handleSubmit(
													(form) => {
														createInquiry({
															fullName:
																form.fullName,
															number: form.phone,
															comment:
																form.comment,
														});

														setSentInquiry(true);
														setIsInquiryModalOpen(
															false,
														);
													},
												)}
												className="flex flex-col gap-4"
											>
												<div className="flex flex-col gap-1">
													<Label htmlFor="fullName">
														ФИО
														<span className="text-[#f24e4e] font-bold">
															*
														</span>
													</Label>

													<Input
														id="fullName"
														placeholder="Введите ФИО"
														type="text"
														{...register(
															"fullName",
															{
																required: true,
															},
														)}
													/>
												</div>

												<div className="flex flex-col gap-1">
													<Label htmlFor="phone">
														Номер телефона
														<span className="text-[#f24e4e] font-bold">
															*
														</span>
													</Label>

													<Input
														id="phone"
														placeholder="Введите номер"
														type="text"
														{...register("phone", {
															required: true,
														})}
													/>
												</div>

												<div className="flex flex-col gap-1">
													<Label htmlFor="comment">
														Комментарий к заказу
													</Label>

													<Input
														id="comment"
														placeholder="Введите комментарий"
														type="text"
														{...register(
															"comment",
															{
																required: true,
															},
														)}
													/>
												</div>

												<Button
													type="submit"
													className="mt-4"
												>
													Отправить
												</Button>
											</form>
										</DialogContent>
									</Dialog>
								</li>
							</ul>
						</div>

						<div className="w-full h-px bg-paper-contrast/40" />

						<div className="flex items-center justify-between py-8 md:hidden">
							<div />

							<nav>
								<ul className="flex items-center gap-x-6 lg:gap-x-3 ">
									{[
										{link: "/", label: "Главная"},
										{link: "/about", label: "О нас"},
										{
											link: "/order-n-delivery",
											label: "Оплата и доставка",
										},
										{
											link: "/terms",
											label: "Полезная информация",
										},
										{
											link: "/certificates",
											label: "Сертификаты",
										},
									].map(({label, link}, idx) => (
										<li
											key={idx}
											className={cx("pb-1", {
												"border-b-2 border-primary text-primary font-semibold":
													link === location,
											})}
										>
											<Link to={link}>{label}</Link>
										</li>
									))}
								</ul>
							</nav>

							<div className="flex items-center gap-x-8">
								{/* <button>
                                <Icon.Loupe className="text-primary w-5 h-auto" />
                            </button> */}

								<Link to="/cart">
									<span className="relative">
										<Icon.Cart className="text-primary w-6 h-auto" />

										{!!cart.length && (
											<span className="absolute -right-4 -top-4 text-sm p-1 bg-primary text-primary-contrast rounded-full w-5 h-5 flex items-center justify-center">
												{cart.length}
											</span>
										)}
									</span>
								</Link>
							</div>
						</div>
					</div>
				</Container>
			</header>
		</>
	);
};
