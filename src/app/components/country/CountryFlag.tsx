import ReactCountryFlag from "react-country-flag";
import {
	getCountryName,
	normalizeCountryCode,
} from "@/components/country/countryUtils.ts";

interface Props {
	country?: string | null;
	emptyLabel?: string;
}

export default function CountryFlag({ country, emptyLabel = "-" }: Props) {
	const countryCode = normalizeCountryCode(country ?? "");
	const countryName = getCountryName(countryCode);

	if (!countryCode || !countryName) {
		return <span className="text-base-content/45">{emptyLabel}</span>;
	}

	return (
		<span
			aria-label={countryName}
			className="inline-flex items-center"
			role="img"
			title={countryName}
		>
			<ReactCountryFlag
				aria-hidden={true}
				countryCode={countryCode}
				svg={true}
				style={{
					borderRadius: "2px",
					height: "1rem",
					width: "1.35rem",
				}}
			/>
		</span>
	);
}
