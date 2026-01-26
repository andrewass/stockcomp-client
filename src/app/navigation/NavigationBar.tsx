import { TrophyIcon } from "@heroicons/react/24/outline";
import Link from "next/dist/client/link";

export default function NavigationBar() {
	const urlSuffix = "/1?pageSize=10";
	return (
		<div className="navbar bg-red-500 justify-center">
			<div className="flex flex-row ml-30 mr-40 mt-5 mb-5 w-3/4 justify-between">
				<div className="flex flex-row gap-8">
					<Link href="/">Stock Comp</Link>
					<Link href="/symbols">Symbols</Link>
					<Link href={`/contests${urlSuffix}`}>Contests</Link>
					<Link href={`/leaderboard/1${urlSuffix}`}>
						<div className="flex flex-row gap-2">
							<TrophyIcon className="size-8" title="Leaderboard" />
							<span>Leaderboard</span>
						</div>
					</Link>
				</div>
				<div className="flex flex-row gap-8">
					<span>Theme</span>
					<span>Account</span>
				</div>
			</div>
		</div>
	);
}
