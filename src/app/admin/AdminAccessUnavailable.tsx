"use client";

export default function AdminAccessUnavailable() {
	return (
		<div className="flex min-h-screen w-full items-center justify-center px-4 py-24">
			<section className="flex w-full max-w-xl flex-col items-center gap-5 text-center">
				<p className="text-sm font-semibold text-warning">
					Admin access unavailable
				</p>
				<h1 className="text-3xl font-bold text-base-content">
					Unable to verify admin access
				</h1>
				<p className="max-w-md text-base leading-7 text-base-content/70">
					The admin role check could not be completed right now. Your access was
					not changed.
				</p>
				<button
					type="button"
					className="btn btn-primary"
					onClick={() => window.location.reload()}
				>
					Try again
				</button>
			</section>
		</div>
	);
}
