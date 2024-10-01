import {ContentTemplate} from "@shared/ui";
import certificate_1 from "@shared/assets/certificate_1.png";
import certificate_2 from "@shared/assets/certificate_2.png";
import certificate_3 from "@shared/assets/certificate_3.png";
import certificate_4 from "@shared/assets/certificate_4.png";

interface Certificate {
	id: number;
	photoPath: string;
	description: string;
}

const certificates: Certificate[] = [
	{
		id: 1,
		photoPath: certificate_1,
		description:
			"Сертификат соответствия на металлическую мебель ПАКС-трейд",
	},
	{
		id: 2,
		photoPath: certificate_2,
		description:
			"Сертификат соответствия на металлическую мебель ПАКС-трейд",
	},
	{
		id: 3,
		photoPath: certificate_3,
		description:
			"Сертификат соответствия на металлическую мебель ПАКС-трейд",
	},
	{
		id: 4,
		photoPath: certificate_4,
		description:
			"Сертификат соответствия на металлическую мебель ПАКС-трейд",
	},
];
export const CertificatesPage: React.FC = () => {
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
			<div className="flex flex-col gap-8 mb-10">
				<h1 className="text-4xl text-primary font-semibold">
					Полезная информация
				</h1>

				<div className="flex flex-col gap-6">
					<p className="text-primary font-medium">
						На сегодняшний день компания "ПАКС-металл" по праву
						считается лидером среди российских производителей
						металлической мебели. Мы гарантируем качество
						выпускаемой нами продукции, будь то металлические шкафы
						для одежды, архивные шкафы, металлические стеллажи,
						бухгалтерские шкафы КБ, металлические взломостойкие и
						огнестойкие сейфы, сумочницы, верстаки и т.д. Качество
						всех наших изделий подтверждено сертификатами.
					</p>
				</div>
			</div>
			<div className="flex flex-wrap justify-center gap-x-5 gap-y-20 mt-6">
				{certificates.map((certificate) => (
					<div className="flex flex-col items-center justify-center  gap-y-2 max-w-[204px] max-h-[284px]">
						<img
							key={certificate.id}
							src={certificate.photoPath}
							alt={certificate.description}
							className="object-contain"
						/>
						<h5 className="text-sm text-primary text-center">
							{certificate.description}
						</h5>
					</div>
				))}
			</div>
		</ContentTemplate>
	);
};
