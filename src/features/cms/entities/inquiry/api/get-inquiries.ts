import {useQuery} from "@tanstack/react-query";

import {Inquiry} from "@entities/inquiry";
import {apiClient, Dto} from "@shared/api";

export type GetInquiriesDto = Dto<void, Inquiry[]>;

export const getInquiries = () =>
	apiClient.get<GetInquiriesDto["res"]>("/api/v1/application");

export const useInquiries = () => {
	const {data, ...query} = useQuery({
		queryKey: ["inquiries"],
		queryFn: () => getInquiries(),
	});

	return {
		inquiries: data?.data,
		...query,
	};
};
