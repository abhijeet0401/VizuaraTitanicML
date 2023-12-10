import React from 'react';
import { Alert } from '@mui/material';

const InfoAlerts = () => {
  return (
    <div>
      <Alert severity="info" >
        By checking above Correlation with Survival, Could you test following Cases and their accuracy
      </Alert>
      <br></br>
      <Alert severity="info" >
        CASE-I PClass, Gender and Fare
      </Alert>
      <br></br>
      <Alert severity="info" >
        CASE-II PClass, Gender and Embark
      </Alert>
      <br></br>
      <Alert severity="info" >
        CASE-III Age, Sibsp and Parch
      </Alert>
    </div>
  );
};

export default InfoAlerts;
