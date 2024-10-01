export interface Product {
	id: number;
	name: string;
	price: number;
	description: string;
	photoPath: string;
	kaspi: string;
	properties: Array<{
		key: string;
		value: string;
	}>;
}
