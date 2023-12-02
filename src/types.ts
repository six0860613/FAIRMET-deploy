export type Brand = {
	id: string;
	title: string;
	tags: {
		Sort: string[];
		"Style, Occasion": string[];
		Field: string[];
		"Item & Category": string[];
		"Notable Category & Item": string[];
		"Function & Activity": string[];
		"Country & Region": string[];
		Price: string[];
		Gender: string[];
		"Specific Item": string[];
	};
	content: string;
};

export type Filter = {
	id: string;
	type: string;
	options: string[];
};

export type TBook = {
	id: string;
	category: string;
	tags: {
		Sort: string[];
		"Style, Occasion": string[];
		Field: string[];
		"Item & Category": string[];
		"Notable Category & Item": string[];
		"Function & Activity": string[];
		"Country & Region": string[];
		Price: string[];
		Gender: string[];
		"Specific Item": string[];
	};
	title: string;
	content: string;
	image: string;
};

export type TagKey = keyof TBook["tags"];

export enum BookTag {
	ALL = "ALL",
	PICK = "PICK",
	WEAR = "WEAR",
	STYLE = "STYLE",
	OTHER = "OTHER",
}
