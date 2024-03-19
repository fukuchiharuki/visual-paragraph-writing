let updateTimer: NodeJS.Timeout | null = null;

export default function debounce(fn: () => void, ms: number = 500) {
	if (updateTimer) {
		clearTimeout(updateTimer);
		updateTimer = null;
	}
	updateTimer = setTimeout(fn, ms);
}
