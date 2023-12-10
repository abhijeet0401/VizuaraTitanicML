import React, { useState, useEffect } from "react";
import {
  Typography,
  Slider,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Alert,
  Paper,
  Button,
} from "@mui/material";
import jsonData from "../../data/csv.json";
import FeatureXSelect from "./FeatureX";

function ML() {
  const [testSetRatio, setTestSetRatio] = useState(0.1);
  const [selectedFeaturesX, setSelectedFeaturesX] = useState([]);
  const [headData, setHeadData] = useState([]);
  const [outputFeature, setOutputFeature] = useState("Survived");

  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const [responseData, setResponseData] = useState(null);
  const handleFeatureXChange = (selected) => {
    setSelectedFeaturesX(selected);
  };

  const handleOutputFeatureChange = (selectedOutputFeature) => {
    setOutputFeature(selectedOutputFeature);
  };

  const handleSliderChange = (event, newValue) => {
    setTestSetRatio(newValue);
  };
  const [showAlert, setShowAlert] = useState(false);
  const [alertColor, setAlertColor] = useState('success'); // Initialize with a default color

  const handleRunModel = () => {
    if (selectedFeaturesX.length === 0) {
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
      }, 3000);
      console.log("No Input Feature is Selected");
      return;
    }
  
    console.log("Selected Features: ", selectedFeaturesX);
    console.log("Test Set Ratio: ", testSetRatio);
  
    const apiUrl = 'https://coral-app-kcz3j.ondigitalocean.app/train_model';
    const requestData = {
      test_size: testSetRatio,
      features: selectedFeaturesX,
      target: "Survived"
    };
  
    fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestData)
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        // Process the response data
        console.log('Response:', data);
  
        // Set the alert color based on accuracy level
        let alertColor = 'success';
        if (data.accuracy > 0.7) {
          alertColor = 'success';
        } else if (data.accuracy > 0.6) {
          alertColor = 'info';
        } else if (data.accuracy > 0.5) {
          alertColor = 'warning';
        } else {
          alertColor = 'error';
        }
  
        // Update alert state and response data
        setShowSuccessAlert(true);
        setAlertColor(alertColor);
        setResponseData(data.accuracy); // Update with actual response data
        // Hide the success alert after 5 seconds
      })
      .catch((error) => {
        console.error('Error:', error);
        setShowErrorAlert(true);
         // Hide the error alert after 5 seconds
      });
  };
  
  useEffect(() => {
    // Calculate head data of selected features
    const selectedData = jsonData.slice(0, 5); // Get the first 5 rows as head data
    const headColumns = selectedFeaturesX.map((feature) => ({
      id: feature,
      label: feature,
    }));

    const headRows = selectedData.map((row) => {
      const rowData = {};
      selectedFeaturesX.forEach((feature) => {
        rowData[feature] = row[feature];
      });
      return rowData;
    });

    setHeadData({ columns: headColumns, rows: headRows });
  }, [selectedFeaturesX]);

  return (
    <div className="App">
      <>
        <Typography variant="h5" gutterBottom>
          <b>Feature Selection</b>
        </Typography>
        <div style={{ marginTop: 16 }}>
          <FeatureXSelect onChange={handleFeatureXChange} />
        </div>
        <div style={{ marginTop: 48 }}>
          <Alert severity="info">
            Output feature '{outputFeature}' is selected.
          </Alert>
        </div>
        <Typography gutterBottom>Input features:</Typography>
        <Paper style={{ marginTop: 8 }}>

  <TableContainer>
    <Table>
      <TableHead>
        <TableRow>
          {headData.columns?.map((column) => (
            <TableCell key={column.id}>{column.label}</TableCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {headData.rows?.map((row, index) => (
          <TableRow key={index}>
            {selectedFeaturesX.map((feature) => (
              <TableCell key={feature}>{row[feature]}</TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
</Paper>
<Typography style={{ marginTop: 16 }} gutterBottom>Output feature:</Typography>
<Paper style={{ marginTop: 16 }}>
  
  <TableContainer>
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>{outputFeature}</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {jsonData.slice(0, 5).map((row, index) => (
          <TableRow key={index}>
            <TableCell>{row[outputFeature]}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
</Paper>

        <Typography variant="h5" gutterBottom style={{ marginTop: 16 }}>
          <b>Splitting the data into training and test sets</b>
        </Typography>
        <Typography
          id="test-set-slider"
          gutterBottom
          style={{ marginTop: 16 }}
        >
          Select the test set ratio
        </Typography>
        <Slider
          aria-labelledby="test-set-slider"
          value={testSetRatio}
          onChange={handleSliderChange}
          step={0.01}
          min={0.1}
          max={0.3}
          marks={[
            { value: 0.1, label: "0.1" },
            { value: 0.3, label: "0.3" },
          ]}
          valueLabelDisplay="auto"
          style={{ marginLeft: "12px" }} // Add this style for left margin
        />
      </>
    
      <Typography variant="h5" gutterBottom style={{ marginTop: 16 }}>
          <b>Constructing the AI Model</b>
        </Typography>
        <Alert severity="info" >
        Decision Tree algorithm model is used to build the model
      </Alert>
      {showAlert && (
  <Alert severity="error" style={{ marginTop: 16 }}>
    No Input Feature is Selected
  </Alert>
)}{showSuccessAlert && (
  <Alert severity={alertColor} style={{ marginTop: 16 }}>
    Accuracy {JSON.stringify(responseData)}
  </Alert>
)}
      
      <Button
          sx={{
            background:
              "linear-gradient(112.03deg, #FF9900 -56.39%, #FF01FF 190.51%)",
            boxShadow: "0px 10px 20px rgba(74, 74, 74, 0.2)",
           
            height: "45px",
            padding: "5px 20px",
            width: "200px",
            color: "white",
          }}
          onClick={handleRunModel}
          style={{ marginTop: 16 }}
        >
          Run Model
        </Button>
        
    </div>


  );
}

export default ML;
