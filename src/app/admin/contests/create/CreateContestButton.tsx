"use client";

import { useState } from "react";
import CreateContestModal from "./CreateContestModal.tsx";

export default function CreateContestButton() {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<>
			<button
				type="button"
				className="btn btn-outline border-base-300 text-base-content/80 hover:border-base-content/40 hover:text-base-content"
				onClick={() => setIsOpen(true)}
			>
				Create contest
			</button>
			<CreateContestModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
		</>
	);
}
