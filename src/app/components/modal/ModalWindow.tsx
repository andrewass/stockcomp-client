import React from "react";

export  function ModalWindow({ children }: { children: React.ReactNode }) {
	return (
		<div className="modal">
			<div className="modal-box">
                {children}
            </div>
		</div>
	);
}
