interface Props {
	params: Promise<{ symbol: string }>;
}

export default async function SymbolDetailsPage({ params }: Props) {
	const { symbol } = await params;

	return <div>Symbol Details Page for {symbol}</div>;
}
