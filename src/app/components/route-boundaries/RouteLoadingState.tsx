interface Props {
	title: string;
}

export default function RouteLoadingState({ title }: Props) {
	return (
		<div
			className="flex min-h-[24rem] w-full max-w-6xl items-center justify-center"
			aria-busy="true"
			aria-live="polite"
		>
			<span className="sr-only">{title}</span>
			<div className="flex flex-col items-center gap-4 text-center">
				<span className="loading loading-ring loading-lg text-primary" />
				<div className="space-y-2">
					<div className="skeleton mx-auto h-3 w-32" />
					<div className="skeleton h-3 w-48 max-w-full" />
				</div>
			</div>
		</div>
	);
}
