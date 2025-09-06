import { Box, Modal, TextField } from "@mui/material";
import Button from "@mui/material/Button";
import { cornerButtonStyle, style } from "./CreateBookStyles";
import React from "react";


interface ModalBoxProps {
    options: any, open: boolean,
    handleClose: () => void,
    onSubmit: (event: React.FormEvent<HTMLFormElement>) => void,
    values: Array<{ name: string, value: string }>,
    handleChange: (idx: number, event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void,
    success?: boolean
}


const ModalBox = ({ options, open, handleClose, onSubmit, values, handleChange , success }: ModalBoxProps) => {

    console.log("Options in ModalBox:", options);


    return (
        <div>
            <Modal
                open={open}
                onClose={handleClose}
            >
                <Box sx={{ ...style, width: 700 }}>
                    <h2>Create {options.name}</h2>
                     <Button onClick={handleClose} sx={cornerButtonStyle}>X</Button>

                    <form onSubmit={onSubmit}>

                        {[0, 2].map(rowIdx => (
                            <Box key={rowIdx} sx={{ display: 'flex', gap: 2, mb: 2 }}>
                                <Box sx={{ flex: 1 }}>
                                    {options.fields[rowIdx] && (
                                        <TextField
                                            label={options.fields[rowIdx].name}
                                            value={values[rowIdx]?.value || ""}
                                            type={options.fields[rowIdx].fieldType}
                                            onChange={e => handleChange(rowIdx, e)}
                                            variant="standard"
                                            required
                                            fullWidth
                                            InputLabelProps={{ shrink: true }}
                                        />
                                    )}
                                </Box>
                                <Box sx={{ flex: 1 }}>
                                    {options.fields[rowIdx + 1] && (
                                        <TextField
                                            label={options.fields[rowIdx + 1].name}
                                            value={values[rowIdx + 1]?.value || ""}
                                            type={options.fields[rowIdx + 1].fieldType}
                                            onChange={e => handleChange(rowIdx + 1, e)}
                                            required
                                            fullWidth
                                            InputLabelProps={{ shrink: true }}
                                        />
                                    )}
                                </Box>
                            </Box>
                        ))}
                        <Button type="submit" variant="contained">Create {options.name}</Button>
                        {success && (
                            <Box sx={{ color: 'green', mb: 2 }}>
                                Successfully created!
                            </Box>
                        )}
                    </form>
                </Box>
            </Modal>
        </div>
    )
}

export default ModalBox;