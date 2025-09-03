import { Box } from "@mui/material";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import { gql, useMutation } from "urql";

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

const cornerButtonStyle = {
  position: 'absolute',
  top: 8,
  right: 8,
  minWidth: 32,
  width: 32,
  height: 32,
  borderRadius: '50%',
  fontSize: 20,
  lineHeight: 1,
  padding: 0,
  zIndex: 1,
};

const CreateBookModal = ({ open, handleClose }: { open: boolean, handleClose: () => void }) => {
  const CREATE_BOOKS = gql`
    mutation CreateBook($t: String!, $a: String!, $d: Date! , $c: Date!){
  createBook(title : $t, author : $a , publishedDate : $d, date: $c) 
  {
    book {
      id
    }
  }
}
    `;

  const [, addBook] = useMutation(CREATE_BOOKS);

  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [publishedDate, setPublishedDate] = useState('');
  const [date, setDate] = useState('');

  const [success, setSuccess] = useState(false);

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const result = await addBook({ t: title, a: author, d: publishedDate, c: date });
    if (result.data && result.data.createBook && result.data.createBook.book) {
      setSuccess(true);
      setTitle("");
      setAuthor("");
      setPublishedDate("");
      setTimeout(() => {
        setSuccess(false);
        handleClose();
      }, 1500);
    }
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
      >
        <Box sx={{ ...style, width: 700 }}>
          <h2>Create Book</h2>

          <Button onClick={handleClose} sx={cornerButtonStyle}>X</Button>
          <p>
            Create a new book by filling out the form below.
          </p>
          <form onSubmit={onSubmit}>
            <Box sx={{ '& .MuiTextField-root': { m: 1, width: '25ch' } }}>
              <TextField label="Title" value={title} onChange={e => setTitle(e.target.value)} variant="standard" required />
              <TextField type="date" value={publishedDate} onChange={e => setPublishedDate(e.target.value)} label="Published Date" InputLabelProps={{ shrink: true }} required />
            </Box>
            <Box
              component="form"
              sx={{ '& .MuiTextField-root': { m: 1, width: '25ch' } }}
              noValidate
              autoComplete="off"
            >
              <TextField variant="standard" value={author} label="Author" onChange={e => setAuthor(e.target.value)} />

              <TextField type="date" value={date} onChange={e => setDate(e.target.value)} label="Current Date" InputLabelProps={{ shrink: true }} required />
            </Box>
            {success && (
              <Box sx={{ color: 'green', mb: 2 }}>
                Book created successfully!
              </Box>
            )}
            <Button type="submit" variant="contained">Create</Button>
          </form>
        </Box>
      </Modal>
    </div>
  )
};

export default CreateBookModal;