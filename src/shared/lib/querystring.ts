export const qs = <T = unknown>(search: string): T => {
	const entries = search.split("&");

	return entries.reduce((prev, entry) => {
		const [key, value] = entry.split("=");

		return {
			...prev,
			[key]: value,
		};
	}, {}) as T;
};
