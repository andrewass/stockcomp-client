import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { SubmitHandler, useForm } from "react-hook-form";
import { Box, IconButton, Modal } from "@mui/material";
import Button from "@mui/material/Button";
import { useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import { useApiWrapper } from "../../config/useApiWrapper";
import { GET_ALL_USERS_ADMIN } from "../api/adminApi";
import { queryClient } from "../../config/queryConfig";
import { getUpdateContestConfig } from "../../domain/contests/contestApi";
import { UpdateContestRequest } from "../../domain/contests/contestDto";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export const AdminUpdateUserForm = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const { handleSubmit } = useForm<UpdateContestRequest>();
  const { apiPut } = useApiWrapper();

  const mutation = useMutation({
    mutationFn: (contestData: UpdateContestRequest) => {
      return apiPut(getUpdateContestConfig(contestData));
    },
    onSuccess: () => {
      queryClient
        .invalidateQueries({ queryKey: [GET_ALL_USERS_ADMIN] })
        .then(() => navigate("/admin/users"));
    },
  });

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const submitForm: SubmitHandler<UpdateContestRequest> = (data) => {
    mutation.mutate(data);
  };

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
        <Box
          component="form"
          onSubmit={handleSubmit(submitForm)}
          sx={style}
          maxWidth="500px"
        >
          <Button type="submit" sx={{ mt: "1rem" }}>
            Update
          </Button>
        </Box>
      </Modal>
    </Box>
  );
};
