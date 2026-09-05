import Link from "next/link";
import type { ComponentType, SVGProps } from "react";

export interface NavigationItem {
	activePathPrefix: string;
	href: string;
	icon: ComponentType<SVGProps<SVGSVGElement>>;
	label: string;
}

interface Props {
	active: boolean;
	item: NavigationItem;
}

export default function NavigationItemLink({ active, item }: Props) {
	const Icon = item.icon;

	return (
		<Link
			href={item.href}
			aria-current={active ? "page" : undefined}
			className="flex min-h-11 items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium whitespace-nowrap text-base-content/70 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
		>
			<Icon aria-hidden="true" className="size-5 shrink-0" />
			{item.label}
		</Link>
	);
}
