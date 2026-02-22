"use client";

import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import AdminNavigationBarWide from "@/navigation/AdminNavigationBarWide.tsx";
import { getHasAdminRole } from "@/navigation/actions.ts";
import DefaultNavigationBarWide from "@/navigation/DefaultNavigationBarWide.tsx";
import { UserMode } from "../../config/UserMode.ts";
import ErrorComponent from "../../error/ErrorComponent.tsx";

const HAS_ADMIN_ROLE_QUERY_KEY = "hasAdminRole";

export default function NavigationBar() {
	const {
		data: hasAdminRole,
		isLoading: isHasAdminRoleLoading,
		error: hasAdminRoleError,
	} = useQuery<boolean>({
		queryKey: [HAS_ADMIN_ROLE_QUERY_KEY],
		queryFn: getHasAdminRole,
	});

	const { data: session } = useSession();

	if (isHasAdminRoleLoading) {
		return <p>Loading...</p>;
	}

	if (hasAdminRoleError) {
		return <ErrorComponent error={hasAdminRoleError} />;
	}

	const isAdminModeSelected = session?.userMode === UserMode.ADMIN;

	if (hasAdminRole && isAdminModeSelected) {
		return <AdminNavigationBarWide />;
	} else {
		return <DefaultNavigationBarWide hasAdminRole={hasAdminRole ?? false} />;
	}
}
