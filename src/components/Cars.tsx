import React from "react";
import ModalBox from "./ModalBox/ModalBox";
import { gql, useMutation, useQuery } from "urql";
import Button from "@mui/material/Button";
import ShowTableView from "./TableView/ShowTableView";

const CREATE_CARS = gql`
    mutation CreateCar($m: String!, $mo: String!, $y: Int!, $c: String!){
  createCar(make : $m, model : $mo , year : $y, color: $c) 
  {
    car {
      id
    }
  }
}
    `;


const GET_CARS = gql`
{
  allCars {
    id
    make
    model
    year
    color
  }
}
`;

const columns = [
    { key: "make", label: "Make" },
    { key: "model", label: "Model" },
    { key: "year", label: "Year" },
    { key: "color", label: "Color" },
];

const Cars = () => {
    const [, addCar] = useMutation(CREATE_CARS);
    const [{data, error, fetching}] = useQuery({ query: GET_CARS });
    console.log("Cars data:", data);
    const options = {
        name: "Car",
        fields: [
            { name: "Make", fieldType: "text", required: true },
            { name: "Model", fieldType: "text", required: true },
            { name: "Year", fieldType: "number", required: true },
            { name: "Color", fieldType: "text", required: true },
        ],
    };

    const [open, setOpen] = React.useState(false);
    const [success, setSuccess] = React.useState(false);
    const [values, setValues] = React.useState<Array<{ name: string, value: string }>>([]);
    const handleClose = () => {
        setOpen(false);
    };

    const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const submittedFields = values
            .map((obj, idx) => obj ? { fieldName: obj.name, value: obj.value } : null)
            .filter(Boolean);

        console.log("Submitted fields:", submittedFields);

        if (options.name === "Car") {
            const make = values.find(v => v.name === "Make")?.value;
            const model = values.find(v => v.name === "Model")?.value;
            const year = parseInt(values.find(v => v.name === "Year")?.value ?? "");
            const color = values.find(v => v.name === "Color")?.value;
            console.log("Extracted values:", { make, model, year, color });

            const result = await addCar({ m: make, mo: model, y: year, c: color });
            if (result.data && result.data.createCar && result.data.createCar.car) {
                setSuccess(true);
                setValues([]);
                setTimeout(() => {
                    setSuccess(false);
                    handleClose();
                }, 1500);
            }
        }
    }

    const handleChange = (idx: number, event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const newValues = [...values];
        newValues[idx] = { name: options.fields[idx].name, value: event.target.value };
        setValues(newValues);
    };
    return (
        <div style={{ padding: 24 }}>
            <Button variant="contained" color="primary" onClick={()=> setOpen(true)}>Create Car</Button>
            <ModalBox options={options} open={open} onSubmit={onSubmit} handleClose={handleClose} handleChange={handleChange} success={success} values={values} />
            {fetching && <p>Loading...</p>}
            {error && <p>Error: {error.message}</p>}
            <h1>Cars Table</h1>
            <p>List of cars will be displayed here.</p>
            <ShowTableView data={data ? data.allCars : []} error={error} fetching={fetching} columns={columns} />
        </div>
    )
};

export default Cars;