import React from "react";
import CreateBookModal from "./ModalBox/CreateBookModal";
import { useQuery } from "urql";
import BooksTableView from "./BooksTableView";

const allBooks = `
query allBooks {
  allBooks {
    id
    title
  }
}
`;

const Books = () => {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const [{ data, fetching, error }] = useQuery({ query: allBooks });
    console.log(data, fetching, error);
    return (
        <>
            <div style={{ padding: 24 }}>
                <button onClick={handleOpen}>Create Book</button>
                <BooksTableView data={data} error={error} fetching={fetching} />
            </div>
            <CreateBookModal open={open} handleClose={handleClose} />
        </>
    );
};

export default Books;
