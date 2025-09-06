import React from "react";
import CreateBookModal from "./ModalBox/CreateBookModal";
import { gql, useMutation, useQuery } from "urql";
import BooksTableView from "./BooksTableView";
import ModalBox from "./ModalBox/ModalBox";
import { Button, Table } from "@mui/material";
import TableView from "./TableView/ShowTableView";
import ShowTableView from "./TableView/ShowTableView";

const allBooks = `
query allBooks {
  allBooks {
    id
    title
    author
    date
    publishedDate
  }
}
`;

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

const options = {
    name: "Book",
    fields: [
        { name: "Title", fieldType: "text", required: true },
        { name: "Published Date", fieldType: "date", required: true },
        { name: "Author", fieldType: "text", required: true },
        { name: "Date", fieldType: "date", required: true },
    ],
};

const Books = () => {
    const [, addBook] = useMutation(CREATE_BOOKS);

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const [values, setValues] = React.useState<Array<{ name: string, value: string }>>([]);

    const [success, setSuccess] = React.useState(false);

    const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const submittedFields = values
            .map((obj, idx) => obj ? { fieldName: obj.name, value: obj.value } : null)
            .filter(Boolean);

        console.log("Submitted fields:", submittedFields);

        const title = values.find(v => v.name === "Title")?.value;
        const author = values.find(v => v.name === "Author")?.value;
        const publishedDate = values.find(v => v.name === "Published Date")?.value;
        const date = values.find(v => v.name === "Date")?.value;
        console.log("Extracted values:", { title, author, publishedDate, date });

        const result = await addBook({ t: title, a: author, d: publishedDate, c: date });
        if (result.data && result.data.createBook && result.data.createBook.book) {
            setSuccess(true);
            setValues([]);
            setTimeout(() => {
                setSuccess(false);
                handleClose();
            }, 1500);
        }
    }

    const handleChange = (idx: number, event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const newValues = [...values];
        newValues[idx] = { name: options.fields[idx].name, value: event.target.value };
        setValues(newValues);
    };

    const columns: Array<{ key: string; label: string }> = [
        { key: "title", label: "Title" },
        { key: "author", label: "Author" },
        { key: "publishedDate", label: "Published Date" },
        { key: "date", label: "Date" }
    ];

    const [{ data, fetching, error }] = useQuery({ query: allBooks });
    const tableData = data ? data.allBooks : [];
    console.log(data, fetching, error);
    return (
        <>
            <div style={{ padding: 24 }}>
                <Button variant="contained" color="primary" onClick={handleOpen}>Create Book</Button>
                {/* <BooksTableView data={data} error={error} fetching={fetching} columns={columns} /> */}
                <h1>Books Table</h1>
                <p>List of books will be displayed here.</p>
                <ShowTableView data={tableData} error={error} fetching={fetching} columns={columns} />
            </div>
            {/* <CreateBookModal open={open} handleClose={handleClose} /> */}
            <ModalBox options={options} open={open} handleClose={handleClose} onSubmit={onSubmit} values={values} handleChange={handleChange} success={success} />
        </>
    );
};

export default Books;
