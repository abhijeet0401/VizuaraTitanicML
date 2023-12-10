import React, { useState } from 'react';
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Slider,
  TextField,
  Button,
  Typography,
  FormControlLabel,
  Radio,
  RadioGroup,
  Paper,
} from '@mui/material';

const Predict = () => {
  const [gender, setGender] = useState('');
  const [pclass, setPclass] = useState('');
  const [embarked, setEmbarked] = useState('');
  const [peopleJoining, setPeopleJoining] = useState(4);
  const [age, setAge] = useState(20);
  const [name, setName] = useState('');
  const survivedImage = '/survived.png'
  const notSurvivedImage='/notsurvived.png'
  const handleGenderChange = (event) => {
    setGender(event.target.value);
  };

  const handlePclassChange = (event) => {
    setPclass(event.target.value);
  };

  const handleEmbarkedChange = (event) => {
    setEmbarked(event.target.value);
  };

  const [predictionResult, setPredictionResult] = useState(null);
  const [survivedAudio] = useState(new Audio()); // Initialize audio elements for survived and not survived
  const [notSurvivedAudio] = useState(new Audio());
  const handleSubmit = () => {
    const apiUrl = 'https://coral-app-kcz3j.ondigitalocean.app/predict'; // Replace with your API endpoint
    console.log('Selected Gender:', gender);
    console.log('Selected Pclass:', pclass);
    console.log('Selected Embarked:', embarked);
    console.log('People Joining:', peopleJoining);
    console.log('Age:', age);
    console.log('Name:', name);
    const requestData = {
      'Gender': gender,
      'Pclass':parseInt( pclass),
      'Age': age,
      'Embarked': embarked,
      'Fare': 50 // Assuming 'Fare' is part of the request but not provided in the form
    };
    const survivedSoundPath = '/videoplayback.webm'; // Update with your audio file path
    const notSurvivedSoundPath = '/sad.webm'; // Update with your audio file path
  
    const playSound = (result) => {
      if (result === 'survived') {
        survivedAudio.src = survivedSoundPath;
        survivedAudio.play();
      } else if (result === 'notSurvived') {
        notSurvivedAudio.src = notSurvivedSoundPath;
        notSurvivedAudio.play();
      }
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
        console.log(data)
        if (data.prediction == 1) {
          setPredictionResult('survived');
          playSound('survived');
        } else {
          
          setPredictionResult('notSurvived');
          playSound('notSurvived');
        }
      })
      .catch((error) => {
        console.error('Error:', error);
        // Handle error scenario
      });
  };

  return (
    <Paper elevation={3} style={{ padding: '20px' }}>
      
      <FormControl fullWidth style={{ marginTop: '20px' }}>
        <InputLabel id="gender-label">Select Categorical Attribute for Gender</InputLabel>
        <Select
          labelId="gender-label"
          value={gender}
          onChange={handleGenderChange}
          label="Select Categorical Attribute for Gender"
        >
          <MenuItem value="male">Male</MenuItem>
          <MenuItem value="female">Female</MenuItem>
        </Select>
      </FormControl>

      <FormControl fullWidth style={{ marginTop: '20px' }}>
        <InputLabel id="pclass-label">Select Categorical Attribute for Pclass</InputLabel>
        <Select
          labelId="pclass-label"
          value={pclass}
          onChange={handlePclassChange}
          label="Select Categorical Attribute for Pclass"
        >
          <MenuItem value="1">First Class</MenuItem>
          <MenuItem value="2">Second Class</MenuItem>
          <MenuItem value="3">Third Class</MenuItem>
        </Select>
      </FormControl>

      <FormControl fullWidth style={{ marginTop: '20px' }}>
        <InputLabel id="embarked-label">Select Categorical Attribute for Embarked</InputLabel>
        <Select
          labelId="embarked-label"
          value={embarked}
          onChange={handleEmbarkedChange}
          label="Select Categorical Attribute for Embarked"
        >
          <MenuItem value="C">Cherbourg</MenuItem>
          <MenuItem value="Q">Queenstown</MenuItem>
          <MenuItem value="S">Southampton</MenuItem>
        </Select>
      </FormControl>
      <TextField
        label="Enter your Name"
        value={name}
        onChange={(event) => setName(event.target.value)}
        fullWidth
        style={{ marginTop: '20px' }}
      />
      <Typography variant="body1" style={{ marginTop: '20px' }}>How many you people are joining in the titanic ship ?
</Typography>
      <Slider
        value={peopleJoining}
        onChange={(event, newValue) => setPeopleJoining(newValue)}
        min={0}
        max={8}
        step={1}
        valueLabelDisplay="auto"
        style={{ marginTop: '20px' }}
      />
<Typography variant="body1" style={{ marginTop: '20px' }}>What is your Age ?
</Typography>
      <Slider
        value={age}
        onChange={(event, newValue) => setAge(newValue)}
        min={0}
        max={82}
        step={1}
        valueLabelDisplay="auto"
        style={{ marginTop: '20px' }}
      />

      

      <Button variant="contained" color="primary" sx={{
            background:
              "linear-gradient(112.03deg, #FF9900 -56.39%, #FF01FF 190.51%)",
            boxShadow: "0px 10px 20px rgba(74, 74, 74, 0.2)",
           
            height: "45px",
            padding: "5px 20px",
            width: "200px",
            color: "white",
          }} onClick={handleSubmit} style={{ marginTop: '20px' }}>
        Submit
      </Button>
      {predictionResult === 'survived' && (
        <>
        <Typography variant="body1" style={{ marginTop: '20px' }}><b>Survived </b>
</Typography>
        <img src={survivedImage} alt="Survived" style={{ marginTop: '20px', width: '200px' }} />
        </>
      )}
      {predictionResult === 'notSurvived' && (
           <>
           <Typography variant="body1" style={{ marginTop: '20px' }}><b>Not Survived </b>
   </Typography>
        <img src={notSurvivedImage} alt="Not Survived" style={{ marginTop: '20px', width: '200px' }} />
        </>
      )}
    </Paper>
  );
};

export default Predict;
