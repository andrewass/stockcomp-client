"use client";

import type React from "react";
import { useEffect } from "react";

interface Props {
	isOpen: boolean;
	onClose: () => void;
	children: React.ReactNode;
	title?: string;
	footer?: React.ReactNode;
	hideCloseButton?: boolean;
}

export function ModalWindow({
	isOpen,
	onClose,
	children,
	title,
	footer,
	hideCloseButton = false,
}: Props) {
	useEffect(() => {
		if (!isOpen) {
			return;
		}

		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.key === "Escape") {
				onClose();
			}
		};

		window.addEventListener("keydown", handleKeyDown);
		return () => {
			window.removeEventListener("keydown", handleKeyDown);
		};
	}, [isOpen, onClose]);

	if (!isOpen) {
		return null;
	}

	return (
		<div className="modal modal-open" role="dialog" aria-modal="true">
			<div className="modal-box max-w-lg">
				<div className="flex items-start justify-between gap-4">
					{title ? (
						<h3 className="text-lg font-semibold">{title}</h3>
					) : (
						<span />
					)}
					{hideCloseButton ? null : (
						<button
							type="button"
							className="btn btn-sm btn-circle btn-ghost"
							onClick={onClose}
							aria-label="Close modal"
						>
							✕
						</button>
					)}
				</div>
				<div className={title ? "mt-4" : ""}>{children}</div>
				{footer ? <div className="modal-action">{footer}</div> : null}
			</div>
			<button
				type="button"
				className="modal-backdrop"
				onClick={onClose}
				aria-label="Close modal"
			/>
		</div>
	);
}
