import NavigationBar from "@/navigation/NavigationBar.tsx";

export default function MainLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<>
			<NavigationBar />
			<div className="flex justify-center pt-20">{children}</div>
		</>
	);
}
