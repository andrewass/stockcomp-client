import EditIcon from "@mui/icons-material/Edit";
import { Box, IconButton, Modal } from "@mui/material";
import Button from "@mui/material/Button";
import { useState } from "react";

export default function AdminUpdateUserForm() {
	const [open, setOpen] = useState(false);

	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	return (
		<Box>
			<IconButton onClick={handleOpen}>
				<EditIcon />
			</IconButton>
			<Modal
				open={open}
				onClose={handleClose}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
			>
				<Box component="form" maxWidth="500px">
					<Button type="submit" sx={{ mt: "1rem" }}>
						Update
					</Button>
				</Box>
			</Modal>
		</Box>
	);
}
