import {create} from "zustand";

export const useInquiryStore = create<{
	sentInquiry: boolean;
	setSentInquiry: (did: boolean) => void;
}>((set) => ({
	sentInquiry: false,
	setSentInquiry: (did) => set({sentInquiry: did}),
}));
