import { Autocomplete, Button, FormControl, FormControlLabel, Radio, RadioGroup, TextField } from '@mui/material';
import { LocalizationProvider, TimePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import React, { useState } from 'react'

const BookingCutoff = () => {
    const [selectedOption, setSelectedOption] = useState('');
  const [showTimeSection, setShowTimeSection] = useState(false);

  const handleRadioChange = (event) => {
    setSelectedOption(event.target.value);
    setShowTimeSection(event.target.value === 'date');
  };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px', marginBottom: '30px' }}>
                <h2 style={{ fontWeight: 'bold', padding: '5px' }}>
                    How close to the departure can travellers book?
                </h2>
                <p style={{ padding: '5px', textAlign: 'center' }}>
                    To increase your chances of getting a booking, we recommend allowing travellers to book as close as possible to the start time of your experience. However, make sure to allow enough time for yourself to prepare for the experience
                </p>
            </div>

            <div style={{ width: '70%' }}>
                <div style={{ padding: '20px' }}>
                    <h5>How close to the experience start time can you take your final booking?</h5>
                    <span style={{ fontStyle: 'italic', paddingBottom: '5px' }}>The closer to the start time you leave it the more bookings you will get.</span>
                    <Autocomplete
                        disablePortal
                        id="combo-box-demo"
                        options={bookingCutoff}
                        // sx={{ width: 300 }}
                        value={selectedOption}
                        onChange={(event, newValue) => setSelectedOption(newValue.value)}
                        renderInput={(params) => <TextField {...params} />}
                    />
                    
                </div>
                {selectedOption === 'I want to define my own booking cutoff' && (
                    <div style={{ marginTop: '30px' }}>
                        <TextField
                            style={{ width: '100px', paddingRight: '10px' }}
                            id="outlined-number"
                            label="Weeks"
                            type="number"
                            size="small"
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                        <TextField
                            style={{ width: '100px', paddingRight: '10px' }}
                            id="outlined-number"
                            label="Days"
                            type="number"
                            size="small"
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                        <TextField
                            style={{ width: '100px', paddingRight: '10px' }}
                            id="outlined-number"
                            label="Hours"
                            type="number"
                            size="small"
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                        <TextField
                            style={{ width: '100px', paddingRight: '10px' }}
                            id="outlined-number"
                            label="Minutes"
                            type="number"
                            size="small"
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />

                        <FormControl style={{ width: '100%' }}>
                            <RadioGroup
                                aria-labelledby="demo-radio-buttons-group-label"
                                defaultValue="female"
                                name="radio-buttons-group"
                            >
                                <div style={{ border: '1px solid #DEE3EA', borderRadius: '7px', padding: '55px', height: '100px', display: 'flex', alignItems: 'center', marginTop: '10px' }}>
                                    <FormControlLabel value="dateTime" control={<Radio />} />
                                    <div>
                                        <h5>Date and Time</h5>
                                        <span>Customers select both date and time when booking this product</span>
                                    </div>
                                </div>
                                <div style={{ border: '1px solid #DEE3EA', borderRadius: '7px', padding: '55px', height: '100px', display: 'flex', alignItems: 'center', marginTop: '10px' }}>
                                    <FormControlLabel value="date" control={<Radio />} />
                                    <div>
                                        <h5>Just date, no time</h5>
                                        <span>Customers must select a date when booking, but no need to specify time within the day</span>
                                    </div>
                                </div>
                            </RadioGroup>
                        </FormControl>

                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DemoContainer components={['TimePicker']}>
                                <TimePicker size='small' label="Time" />
                            </DemoContainer>
                        </LocalizationProvider>
                    </div>
                )}
            </div>

            <div style={{ width: '70%', display: 'flex', justifyContent: 'space-between', marginTop: '150px' }}>
                <Button variant="outlined">Back</Button>
                <Button variant="contained">Continue</Button>
            </div>
        </div>
    )
}

export default BookingCutoff;

const bookingCutoff = [
    { label: 'I take booking right up until the start of the activity' ,value:'I take booking right up until the start of the activity'},
    { label: '15 minutes before start time' ,value:'15 minutes before start time' },
    { label: '30 minutes before start time' ,value:'30 minutes before start time'},
    { label: '1 hour before start time' ,value:'1 hour before start time'},
    { label: '2 hour before start time' ,value:'2 hour before start time'},
    { label: '3 hour before start time' ,value:'3 hour before start time'},
    { label: '4 hour before start time',value:'4 hour before start time' },
    { label: '8 hour before start time' ,value:'8 hour before start time'},
    { label: '1 day before start time' ,value:'1 day before start time'},
    { label: '2 day before start time' ,value:'2 day before start time'},
    { label: '3 day before start time' ,value:'3 day before start time'},
    { label: '4 day before start time' ,value:'4 day before start time'},
    { label: '5 day before start time' ,value:'5 day before start time'},
    { label: '6 day before start time' ,value:'6 day before start time'},
    { label: '1 week before start time' ,value:'1 week before start time'},
    { label: '2 week before start time' ,value:'2 week before start time'},
    { label: '4 week before start time' ,value:'4 week before start time'},
    { label: '8 week before start time' ,value:'8 week before start time'},
    { label: 'I want to define my own booking cutoff',value: 'I want to define my own booking cutoff' },
];
