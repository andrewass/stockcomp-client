export default function NavigationBar() {
	return (
		<div className="navbar bg-red-500">
			<div className="flex flex-row ml-30 mr-40 mt-5 mb-5 flex-1 justify-between">
				<div className="flex flex-row gap-8">
					<div>Stock Comp</div>
					<div>Symbols</div>
					<div>Contests</div>
					<div>Leaderboard</div>
				</div>
				<div className="flex flex-row gap-8">
					<span>Theme</span>
					<span>Account</span>
				</div>
			</div>
		</div>
	);
}
