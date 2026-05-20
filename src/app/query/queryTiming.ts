const DEFAULT_QUERY_REFETCH_INTERVAL_MS = 5_000;

function readPositiveMilliseconds(
	value: string | undefined,
	fallback: number,
): number {
	const parsedValue = Number(value);

	if (Number.isFinite(parsedValue) && parsedValue > 0) {
		return parsedValue;
	}

	return fallback;
}

export const queryTiming = {
	refetchIntervalMs: readPositiveMilliseconds(
		process.env.NEXT_PUBLIC_QUERY_REFETCH_INTERVAL_MS,
		DEFAULT_QUERY_REFETCH_INTERVAL_MS,
	),
};
