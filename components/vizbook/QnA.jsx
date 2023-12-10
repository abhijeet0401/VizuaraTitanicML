import React, { useState } from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';

export default function QnA({ questionData }) {
  const [questionState, setQuestionState] = useState({
    userSelection: '',
    feedback: '',
    severity: 'error',
  });

  const handleSelection = (event) => {
    const selectedOption = event.target.value;

    if (selectedOption === questionData.correct) {
      setQuestionState({
        userSelection: selectedOption,
        feedback: questionData.correctFeedback,
        severity: 'success',
      });
    } else {
      setQuestionState({
        userSelection: selectedOption,
        feedback: questionData.incorrect,
        severity: 'error',
      });
    }
  };

  const handleClose = () => {
    setQuestionState({
      userSelection: '',
      feedback: '',
      severity: 'error',
    });
  };

  if (!questionData || !questionData.options) {
    return null; // If the data is not available, render nothing
  }

  return (
    <div>
      <div>
        <FormControl>
          <Typography variant="subtitle1">
            <span style={{ fontWeight: 'bold' }}>Q{questionData.Q}</span> {questionData.question}
          </Typography>
          <RadioGroup
            row
            aria-labelledby={`demo-row-radio-buttons-group-label-${questionData.Q}`}
            name={`row-radio-buttons-group-${questionData.Q}`}
            value={questionState.userSelection}
            onChange={handleSelection}
          >
            {questionData.options.map((option, optionIndex) => (
              <FormControlLabel
                key={optionIndex}
                value={option}
                control={<Radio />}
                label={option}
              />
            ))}
          </RadioGroup>
        </FormControl>
        {questionState.feedback && (
          <Alert onClose={handleClose} severity={questionState.severity}>
            {questionState.feedback}
            {questionState.userSelection === questionData.correct && (
              <span>
                <br />
                Note: {questionData.correct} was the correct answer.
              </span>
            )}
          </Alert>
        )}
      </div>
    </div>
  );
}
