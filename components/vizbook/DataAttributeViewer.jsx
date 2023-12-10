import React, { useState } from 'react';
import { FormControl, InputLabel, Select, MenuItem, Table, TableBody, TableCell, TableContainer, TableRow, Paper } from '@mui/material';
import { data_attributes } from './dataattribute.jsx'; // Assume data_attributes is imported from a separate file

const DataAttributeViewer = () => {
    const [selectedAttribute, setSelectedAttribute] = useState('');

    const handleChange = (event) => {
        setSelectedAttribute(event.target.value);
    };

    const renderDataAttributesTable = () => {
        const attributeDetails = data_attributes[selectedAttribute];
        return (
            <TableContainer component={Paper} style={{ marginTop: '20px' }}>
                <Table aria-label="simple table">
                    <TableBody>
                        {Object.entries(attributeDetails).map(([key, value]) => (
                            <TableRow key={key}>
                                <TableCell component="th" scope="row">{key}</TableCell>
                                <TableCell align="right">{value}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        );
    };

    return (
        <div>
            <FormControl fullWidth>
                <InputLabel id="attribute-select-label">Select an Attribute</InputLabel>
                <Select
                    labelId="attribute-select-label"
                    id="attribute-select"
                    value={selectedAttribute}
                    label="Select an Attribute"
                    onChange={handleChange}
                >
                    {Object?.keys(data_attributes)?.map((attribute) => (
                        <MenuItem key={attribute} value={attribute}>{attribute}</MenuItem>
                    ))}
                </Select>
            </FormControl>

            {selectedAttribute && renderDataAttributesTable()}
        </div>
    );
};

export default DataAttributeViewer;
