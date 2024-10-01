export interface Order {
	id: number;
}

export enum DeliveryOption {
	PICKUP = "PICKUP",
	DELIVERY = "DELIVERY",
}

export enum PaymentOption {
	CASH = "CASH",
	CARD = "CARD",
	KASPI_QR = "KASPI_QR",
}
