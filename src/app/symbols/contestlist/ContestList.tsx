import AvailableContests from "@/symbols/contestlist/AvailableContests.tsx";
import SignedUpContests from "@/symbols/contestlist/SignedUpContests.tsx";

export default function ContestList() {
	return (
		<div className="flex flex-col gap-4">
			<SignedUpContests />
			<AvailableContests />
		</div>
	);
}
