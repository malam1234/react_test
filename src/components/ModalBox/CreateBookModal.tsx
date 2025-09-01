import { Box } from "@mui/material";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

// interface ModalBoxProps {
//   open: boolean;
//   handleClose: () => void;
// }

const CreateBookModal = ({ open, handleClose }: { open: boolean, handleClose: () => void }) => {
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box sx={{ ...style, width: 700 }}>
          <h2 id="child-modal-title">Create Book</h2>
          <p id="child-modal-description">
            Create a new book by filling out the form below.
          </p>
          <form>
            <TextField type="text" label="Name" variant="standard" />
            <TextField type="date" label="Date" variant="standard" InputLabelProps={{ shrink: true }} />
          </form>
          <Button onClick={handleClose}>Close</Button>
        </Box>
      </Modal>
    </div>
  )
};

export default CreateBookModal;