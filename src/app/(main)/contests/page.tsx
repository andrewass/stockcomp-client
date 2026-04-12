import { redirect } from "next/navigation";

export default function ContestsIndexPage() {
	redirect("/contests/0?pageSize=10");
}
