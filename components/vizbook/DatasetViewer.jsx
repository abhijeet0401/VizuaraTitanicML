import React, { useState, useEffect } from 'react';
import Papa from 'papaparse';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Checkbox, FormControlLabel } from '@mui/material';

const DatasetViewer = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showData, setShowData] = useState(false);

    useEffect(() => {
        async function fetchData() {
            const response = await fetch('https://firebasestorage.googleapis.com/v0/b/vizuaradelta.appspot.com/o/dummy-files%2Ftrain.csv?alt=media&token=18aefad2-f607-45de-b72a-dbb12f55d0e5');
            const reader = response.body.getReader();
            const result = await reader.read(); // raw read
            const decoder = new TextDecoder('utf-8');
            const csv = decoder.decode(result.value); // convert stream to string
            Papa.parse(csv, {
                header: true,
                complete: (results) => {
                    setData(results.data.slice(0, 5)); // similar to .head() in pandas
                    setLoading(false);
                }
            });
        }
        fetchData();
    }, []);

    const handleCheckboxChange = (event) => {
        setShowData(event.target.checked);
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            
            <FormControlLabel
                control={<Checkbox checked={showData} onChange={handleCheckboxChange} />}
                label="Show Data"
            />
            {showData && (
                <TableContainer component={Paper} sx={{ backgroundColor: '#f2f0f0', marginTop: 2 }}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                {Object?.keys(data[0])?.map((key) => (
                                    <TableCell key={key}>{key}</TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data.map((row, index) => (
                                <TableRow 
                                    key={index}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    {Object?.values(row)?.map((val, idx) => (
                                        <TableCell key={idx}>{val}</TableCell>
                                    ))}
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}
        </div>
    );
};

export default DatasetViewer;
