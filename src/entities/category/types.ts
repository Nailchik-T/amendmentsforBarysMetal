import {Subcategory} from "@entities/subcategory";

export interface Category {
	id: number;
	name: string;
	photoPath: string;
	subCategories: Subcategory[];
}
