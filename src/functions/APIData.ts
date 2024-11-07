let apiKey = import.meta.env.VITE_API_KEY;
let apiHost = import.meta.env.VITE_API_HOST;

export const formatDate = (date: Date): string => {
	const year = date.getFullYear();
	const month = String(date.getMonth() + 1).padStart(2, '0');
	const day = String(date.getDate()).padStart(2, '0');
	return `${year}-${month}-${day}`;
}

export async function fetchFixturesByDate(date: string | Date) {
	// Date follows format YYYY-MM-DD
	if (date instanceof Date) date = formatDate(date);

	try {
		const response = await fetch(`https://${apiHost}/fixtures
			?date=${date}
			&timezone=${Intl.DateTimeFormat().resolvedOptions().timeZone}`, {
			"method": "GET",
			"headers": {
				"x-rapidapi-host": `${apiHost}`,
				"x-rapidapi-key": `${apiKey}`
			}
		});

		if (!response.ok) {
			console.error("Failed to fetch fixtures:", response.statusText);
			return null;
		}
		const data = await response.json();
		return data;
	} catch (error) {
		console.error("Error fetching fixtures:", error);
		return null;
	}
}
