import type { Metadata } from "next";
import AccountSettingsView from "@/account/AccountSettingsView.tsx";
import { getAccountSettings } from "@/account/accountData.ts";

export const metadata: Metadata = {
	title: "Account | Stock Comp",
};

export default async function AccountPage() {
	const account = await getAccountSettings();

	return <AccountSettingsView initialAccount={account} />;
}
