import {useMutation} from "@tanstack/react-query";

import {apiClient, Dto} from "@shared/api";

import {Inquiry} from "../types";

export type CreateInquiryDto = Dto<
	{
		fullName: string;
		number: string;
		comment?: string;
	},
	Inquiry
>;

export const createInquiry = (req: CreateInquiryDto["req"]) =>
	apiClient.post<CreateInquiryDto["res"]>("/api/v1/application", req);

export const useCreateInquiry = () => {
	const {mutateAsync, ...mutation} = useMutation({
		mutationFn: createInquiry,
	});

	return {
		createInquiry: mutateAsync,
		...mutation,
	};
};
