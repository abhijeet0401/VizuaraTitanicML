import React, { useState } from 'react';
import { FormControl, FormControlLabel, Radio, RadioGroup, Alert, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import content from '../../data/csv';

const AttributeSelector = () => {
    const [dataset, setDataset] = useState(content); // Assuming content is your data imported from csv
    const [encodeOption, setEncodeOption] = useState('');
    const [alert, setAlert] = useState({ show: false, message: '', type: '' });

    const handleChange = (event) => {
        const option = event.target.value;
        setEncodeOption(option);

        let message = '';
        let type = '';
        switch (option) {
            case "PassengerId":
                message = "PassengerID should not be encoded. It is a unique identifier for each passenger.";
                type = 'warning';
                break;
            case "Fare":
                type = 'warning';
                message = "Fare should not be encoded. It represents the ticket price, which is a continuous numerical value. Encoding it as a category would distort its meaningful numerical relationship and potentially lead to erroneous interpretations by the model. Leave 'Fare' as a numerical feature to allow the model to analyze it appropriately.";
                break;
            case "Age":
                type = 'warning';
                message = "Age is a numerical attribute representing the passenger's age. It should not be encoded as a category. Leave 'Age' as a numerical feature for the model to analyze it appropriately.";
                break;
            case "SibSp":
                type = 'warning';
                message = "SibSp is a numerical attribute representing the number of siblings or spouses traveling with each passenger. It should not be encoded as a category. Leave 'SibSp' as a numerical feature for the model to analyze it appropriately.";
                break;
            case "Parch":
                type = 'warning';
                message = "Parch is a numerical attribute representing the number of parents or children traveling with each passenger. It should not be encoded as a category. Leave 'Parch' as a numerical feature for the model to analyze it appropriately.";
                break;
            case "Ticket":
                type = 'warning';
                message = "Ticket is a non-categorical attribute representing the ticket number. It should not be encoded as a category. Leave 'Ticket' as a non-categorical feature for the model to analyze it appropriately.";
                break;
            case "Cabin":
                type = 'warning';
                message = "Cabin is a non-categorical attribute representing the cabin number. It should not be encoded as a category. Leave 'Cabin' as a non-categorical feature for the model to analyze it appropriately.";
                break;
            default:
                type = 'success';
                message = "You successfully selected Categorical data";
                break;
        }

        setAlert({ show: true, message, type });
    };

    const renderDataTable = () => {
        return (
            <TableContainer component={Paper} style={{ width: 'auto', margin: 'auto' }}>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="left" style={{ backgroundColor: '#e0f7fa', }}>{encodeOption}</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {dataset.slice(0, 5).map((row, index) => (
                            <TableRow key={index}>
                                <TableCell align="left">{row[encodeOption]}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        );
    };

    return (
        <div>
            <FormControl component="fieldset" fullWidth>
                <RadioGroup name="attribute-options" value={encodeOption} onChange={handleChange}>
                    {Object.keys(dataset[0] || {}).map((option) => (
                        <FormControlLabel key={option} value={option} control={<Radio />} label={option} />
                    ))}
                </RadioGroup>
            </FormControl>
            {alert.show && (
                <Alert severity={alert.type} sx={{ mb: 2 }}>
                    {alert.message}
                </Alert>
            )}
            {encodeOption && renderDataTable()}
        </div>
    );
};

export default AttributeSelector;
