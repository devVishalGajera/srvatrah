import { Button, FormControl, FormControlLabel, Radio, RadioGroup, TextField } from '@mui/material';
import React from 'react'

const MeetingPickup = () => {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px', marginBottom: '30px' }}>
                <h2 style={{ fontWeight: 'bold', padding: '5px' }}>
                    Can travellers be picked up for the experience?
                </h2>
                <p style={{ padding: '5px', textAlign: 'center' }}>
                    ...or should the travellers meet you on location?
                </p>
            </div>

            <div style={{ width: '70%' }}>
                <FormControl style={{ width: '100%' }}>
                    <RadioGroup
                        aria-labelledby="demo-radio-buttons-group-label"
                        defaultValue="female"
                        name="radio-buttons-group"
                    >
                        <div style={{ border: '1px solid #DEE3EA', borderRadius: '7px', padding: '55px', height: '100px', display: 'flex', alignItems: 'center', marginTop: '10px' }}>
                            <FormControlLabel value="dateTime" control={<Radio />} />
                            <div>
                                <h5>Meet on location</h5>
                                <span>This experience has no pick-up service, customers have to make their way to our meeting point.</span>
                            </div>
                        </div>
                        <div style={{ border: '1px solid #DEE3EA', borderRadius: '7px', padding: '55px', height: '100px', display: 'flex', alignItems: 'center', marginTop: '10px' }}>
                            <FormControlLabel value="date" control={<Radio />} />
                            <div>
                                <h5>Pick-up only</h5>
                                <span>Customers must be picked up from selected pick-up locations.</span>
                            </div>
                        </div>
                        <div style={{ border: '1px solid #DEE3EA', borderRadius: '7px', padding: '55px', height: '100px', display: 'flex', alignItems: 'center', marginTop: '10px' }}>
                            <FormControlLabel value="pass" control={<Radio />} />
                            <div>
                                <h5>Meet on location or pick-up</h5>
                                <span>Customers can come to our location or we can pick them up on request.</span>
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

export default MeetingPickup;
