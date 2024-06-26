import { Modal, Box, Typography } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  maxHeight: 400,
  bgcolor: "background.paper",
  overflowY: "scroll",
  // border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
const BookModal = ({ book, onClose, open }) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography
          id="modal-modal-title"
          variant="h6"
          component="h2"
          // sx={{ position: "sticky", top: 0, bgcolor: "background.paper" }}
        >
          {book.title}
        </Typography>
        <Typography
          id="modal-modal-description"
          sx={{ mt: 2, whiteSpace: "pre-wrap" }}
        >
          {book.synopsis}
        </Typography>
      </Box>
    </Modal>
  );
};

export default BookModal;
