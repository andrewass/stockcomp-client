export default async function SymbolDetailsPage({
	params,
}: {
	params: Promise<{ symbol: string }>;
}) {
	const { symbol } = await params;

	return <div>Symbol Details Page for {symbol}</div>;
}
