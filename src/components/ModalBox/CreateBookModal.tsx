import { Box } from "@mui/material";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import { gql, useMutation } from "urql";
import { style, cornerButtonStyle } from './CreateBookStyles';

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
            <Box sx={{ '& .MuiTextField-root': { m: 1, width: '25ch' } }}
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