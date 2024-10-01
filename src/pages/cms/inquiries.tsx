import {CmsTemplate} from "@features/cms";
import {useInquiries} from "@features/cms/entities/inquiry";

export const InquiriesPage: React.FC = () => {
	const {inquiries} = useInquiries();

	return <CmsTemplate title="Заявки">


		<div className="flex flex-wrap gap-3.5">
			{inquiries ? inquiries.map((inquiries) => (
				<div key={inquiries.id} className="flex items-center justify-between  w-64 bg-gray-100 rounded-2xl p-4">
					<div className="flex items-center gap-x-3">
						<div>
							<h6 className="block font-sans text-base font-semibold leading-relaxed tracking-normal text-blue-gray-900 antialiased">
								{inquiries.fullName}
							</h6>
							<p className="block font-sans text-sm font-light leading-normal text-gray-700 antialiased">
								{inquiries.number}
							</p>
						</div>
					</div>
					<h6 className="block font-sans text-base font-semibold leading-relaxed tracking-normal text-blue-gray-900 antialiased">
						{inquiries.comment}
					</h6>
				</div>
			)) : 'Заявок нету'}
		</div>

	</CmsTemplate>;
};
