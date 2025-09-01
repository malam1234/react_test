import React from "react";
import CreateBookModal from "./ModalBox/CreateBookModal";
import { useQuery } from "urql";

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
                <h1>Books</h1>
                <p>List of books will be displayed here.</p>
                {fetching && <p>Loading...</p>}
                {error && <p>Error: {error.message}</p>}
                {data && data.allBooks && (
                    <ul>
                        {data.allBooks.map((book: any) => (
                            <li key={book.id}>
                                {book.title}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
            <CreateBookModal open={open} handleClose={handleClose} />
        </>
    );
};

export default Books;
