import Link from "next/link";

export default function NotFound() {
	return (
		<div
			style={{
				display: "flex",
				justifyContent: "center",
				minHeight: "100vh",
				padding: "28vh 1rem 4rem",
				width: "100%",
			}}
		>
			<section
				style={{
					alignItems: "center",
					display: "flex",
					flexDirection: "column",
					gap: "2.25rem",
					maxWidth: "32rem",
					textAlign: "center",
					width: "100%",
				}}
			>
				<p
					style={{
						color: "var(--color-primary)",
						fontSize: "1.125rem",
						fontWeight: 600,
						lineHeight: "2rem",
						margin: 0,
					}}
				>
					404
				</p>
				<h1
					style={{
						color: "var(--color-base-content)",
						fontSize: "1.875rem",
						fontWeight: 700,
						lineHeight: "2.75rem",
						margin: 0,
					}}
				>
					Page not found
				</h1>
				<p
					style={{
						color:
							"color-mix(in oklab, var(--color-base-content) 70%, transparent)",
						fontSize: "1.125rem",
						lineHeight: "2.25rem",
						margin: 0,
						maxWidth: "28rem",
					}}
				>
					The page you requested does not exist or is no longer available.
				</p>
				<Link href="/" className="btn btn-primary">
					Return home
				</Link>
			</section>
		</div>
	);
}
