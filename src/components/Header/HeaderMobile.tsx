import {Icon, Logo} from "@shared/ui";
import {FaAngleRight} from "react-icons/fa6";
import {Link} from "wouter";
import CategoryList from "@widgets/sidebar.tsx";
import {useAllCategories} from "@entities/category";

interface HeaderMobile {
	isOpen: boolean;
	closeModal: () => void;
}
const HeaderMobile = ({isOpen, closeModal}: HeaderMobile) => {
	const {allCategories} = useAllCategories();

	return (
		<>
			{isOpen && (
				<div
					id="default-modal"
					aria-hidden="true"
					className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-dvh max-h-full"
				>
					<div className="relative p-4 w-full max-w-2xl max-h-full">
						<div className="relative bg-white rounded-lg shadow h-dvh">
							<div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
								<Logo />
								<button
									onClick={closeModal}
									type="button"
									className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
									data-modal-hide="default-modal"
								>
									<svg
										className="w-3 h-3"
										aria-hidden="true"
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 14 14"
									>
										<path
											stroke="currentColor"
											stroke-linecap="round"
											stroke-linejoin="round"
											stroke-width="2"
											d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
										/>
									</svg>
								</button>
							</div>

							<div className="flex flex-col items-start p-4 md:p-5 border-b border-gray-200 rounded-b">
								<h3 className={"text-black font-medium"}>
									Каталог
								</h3>
								<div className={"w-full"}>
									<CategoryList
										allCategories={allCategories}
									/>
								</div>
							</div>

							<div className="p-4 md:p-5 space-y-4">
								<ul className="flex items-start gap-y-4 flex-col ">
									{[
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
											className="flex border-primary text-bold justify-between w-full"
										>
											<Link to={link}>{label}</Link>
											<FaAngleRight
												className={"text-sm"}
											/>
										</li>
									))}
								</ul>
							</div>

							<div className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b">
								<ul className="flex flex-col items-start gap-y-4 text-sm lg:gap-x-3 md:gap-6">
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
										<li className="flex items-center gap-x-4">
											<Icon className="text-black w-4 h-auto" />
											<span>{label}</span>
										</li>
									))}
								</ul>
							</div>
						</div>
					</div>
				</div>
			)}
		</>
	);
};

export default HeaderMobile;
