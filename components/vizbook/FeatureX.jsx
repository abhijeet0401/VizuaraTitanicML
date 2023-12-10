import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Alert from '@mui/material/Alert';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const jsonData = [
  {
    "PassengerId": 1,
    "Survived": 0,
    "Pclass": 3,
    "Name": "Braund, Mr. Owen Harris",
    "Gender": "male",
    "Age": 22,
    "SibSp": 1,
    "Parch": 0,
    "Ticket": "A/5 21171",
    "Fare": 7.25,
    "Cabin": "",
    "Embarked": "S"
  },
  {
    "PassengerId": 2,
    "Survived": 1,
    "Pclass": 1,
    "Name": "Cumings, Mrs. John Bradley (Florence Briggs Thayer)",
    "Gender": "female",
    "Age": 38,
    "SibSp": 1,
    "Parch": 0,
    "Ticket": "PC 17599",
    "Fare": 71.2833,
    "Cabin": "C85",
    "Embarked": "C"
  }
  // Add more data objects as needed
];

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export default function FeatureXSelect({ onChange }) {
  const theme = useTheme();
  const [selectedFeaturesX, setSelectedFeaturesX] = React.useState([]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setSelectedFeaturesX(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );

    // Pass selected features to the parent component
    onChange(typeof value === 'string' ? value.split(',') : value);
  };

  return (
    <div>
      
      <FormControl sx={{  width: 'calc(100% - 2px)' ,height: 10}}>
        <InputLabel id="feature-x-select-label">Select the input features(X)</InputLabel>
        <Select
          labelId="feature-x-select-label"
          id="feature-x-select"
          multiple
          value={selectedFeaturesX}
          onChange={handleChange}
          input={<OutlinedInput label="Select the input features(X)" />}
          MenuProps={MenuProps}
        >
          {Object.keys(jsonData[0]).map((name) => (
            <MenuItem
              key={name}
              value={name}
              style={getStyles(name, selectedFeaturesX, theme)}
            >
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
