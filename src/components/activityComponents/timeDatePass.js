import { Button, FormControl, FormControlLabel, Radio, RadioGroup, TextField } from '@mui/material';
import React from 'react'

const TimeDatePass = () => {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px', marginBottom: '30px' }}>
                <h2 style={{ fontWeight: 'bold', padding: '5px' }}>
                    How is your experience scheduled?
                </h2>
                <p style={{ padding: '5px' }}>
                    Is the experience scheduled by the hour, day, or is it flexible?
                </p>
            </div>

            <div style={{ width: '70%' }}>
                <FormControl style={{ width: '100%' }}>
                    <RadioGroup
                        aria-labelledby="demo-radio-buttons-group-label"
                        defaultValue="female"
                        name="radio-buttons-group"
                    >
                        <div style={{ border: '1px solid #DEE3EA',borderRadius:'7px', padding: '55px', height: '100px', display: 'flex', alignItems: 'center',marginTop:'10px' }}>
                            <FormControlLabel value="dateTime" control={<Radio />} />
                            <div>
                                <h5>Date and Time</h5>
                                <span>Customers select both date and time when booking this product</span>
                            </div>
                        </div>
                        <div style={{ border: '1px solid #DEE3EA',borderRadius:'7px', padding: '55px', height: '100px', display: 'flex', alignItems: 'center',marginTop:'10px' }}>
                            <FormControlLabel value="date" control={<Radio />} />
                            <div>
                                <h5>Just date, no time</h5>
                                <span>Customers must select a date when booking, but no need to specify time within the day</span>
                            </div>
                        </div>
                        <div style={{ border: '1px solid #DEE3EA',borderRadius:'7px', padding: '55px', height: '100px', display: 'flex', alignItems: 'center',marginTop:'10px' }}>
                            <FormControlLabel value="pass" control={<Radio />} />
                            <div>
                                <h5>Pass</h5>
                                <span>No date is selected when booking this product. It is more of a pass than a date based ticket</span>
                            </div>
                        </div>
                    </RadioGroup>
                </FormControl>
            </div>

            <div style={{ width: '70%', display: 'flex', justifyContent: 'space-between', marginTop: '150px' }}>
                <Button variant="outlined">Back</Button>
                <Button variant="contained">Continue</Button>
            </div>
        </div>
    )
}

export default TimeDatePass;
