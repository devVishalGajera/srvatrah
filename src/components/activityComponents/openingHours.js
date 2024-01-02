import { Button, Checkbox, FormControlLabel, FormGroup, Switch, TextField } from '@mui/material';
import { LocalizationProvider, TimePicker } from '@mui/x-date-pickers';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import React, { useState } from 'react'

const OpeningHours = () => {
    const [showDefaultOperatingHours, setShowDefaultOperatingHours] = useState(
        true
    );
    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px', marginBottom: '30px' }}>
                <h2 style={{ fontWeight: 'bold', padding: '5px' }}>
                    Is your experience only offered during specific hours?
                </h2>
                <p style={{ padding: '5px' }}>
                    Your travellers will be able to see this information on their ticket once they have booked the experience
                </p>
            </div>

            <div style={{ width: '70%' }}>
                <h5>Enable operating hours</h5>
                <FormGroup>
                    <FormControlLabel
                        control={
                            <Switch
                                checked={showDefaultOperatingHours}
                                onChange={() =>
                                    setShowDefaultOperatingHours((prev) => !prev)
                                }
                            />
                        }
                        label="Show operating hours for this experience in your product pages"
                    />
                </FormGroup>
            </div>

            {showDefaultOperatingHours && (
                <div style={{ width: '90%', border: '1px solid #DEE3EA', borderRadius: '7px', padding: '20px' }}>
                    <div style={{ padding: '10px', background: '#DEE3EA', borderBottom: '1px solid black', borderRadius: '7px' }}>
                        Default operating hours
                    </div>
                    <div style={{ padding: '10px', fontStyle: 'italic' }}>These operating hours are always used, unless you override them with seasonal operating hours below.</div>
                    <div style={{ padding: '10px', border: '1px solid black', borderRadius: '7px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '10px' }}>
                        <FormGroup>
                            <FormControlLabel control={<Checkbox />} label="Monday" />
                        </FormGroup>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DemoContainer components={['TimePicker']}>
                                <TimePicker size='small' label="From" />
                            </DemoContainer>
                        </LocalizationProvider>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DemoContainer components={['TimePicker']}>
                                <TimePicker size='small' label="To" />
                            </DemoContainer>
                        </LocalizationProvider>
                        <FormGroup>
                            <FormControlLabel control={<Checkbox />} label="Open 24 hours" />
                        </FormGroup>
                    </div>
                    <div style={{ padding: '10px', border: '1px solid black', borderRadius: '7px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '10px' }}>
                        <FormGroup>
                            <FormControlLabel control={<Checkbox />} label="Tuesday" />
                        </FormGroup>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DemoContainer components={['TimePicker']}>
                                <TimePicker size='small' label="From" />
                            </DemoContainer>
                        </LocalizationProvider>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DemoContainer components={['TimePicker']}>
                                <TimePicker size='small' label="To" />
                            </DemoContainer>
                        </LocalizationProvider>
                        <FormGroup>
                            <FormControlLabel control={<Checkbox />} label="Open 24 hours" />
                        </FormGroup>
                    </div>
                    <div style={{ padding: '10px', border: '1px solid black', borderRadius: '7px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '10px' }}>
                        <FormGroup>
                            <FormControlLabel control={<Checkbox />} label="Wednesday" />
                        </FormGroup>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DemoContainer components={['TimePicker']}>
                                <TimePicker size='small' label="From" />
                            </DemoContainer>
                        </LocalizationProvider>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DemoContainer components={['TimePicker']}>
                                <TimePicker size='small' label="To" />
                            </DemoContainer>
                        </LocalizationProvider>
                        <FormGroup>
                            <FormControlLabel control={<Checkbox />} label="Open 24 hours" />
                        </FormGroup>
                    </div>
                    <div style={{ padding: '10px', border: '1px solid black', borderRadius: '7px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '10px' }}>
                        <FormGroup>
                            <FormControlLabel control={<Checkbox />} label="Thursday" />
                        </FormGroup>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DemoContainer components={['TimePicker']}>
                                <TimePicker size='small' label="From" />
                            </DemoContainer>
                        </LocalizationProvider>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DemoContainer components={['TimePicker']}>
                                <TimePicker size='small' label="To" />
                            </DemoContainer>
                        </LocalizationProvider>
                        <FormGroup>
                            <FormControlLabel control={<Checkbox />} label="Open 24 hours" />
                        </FormGroup>
                    </div>
                    <div style={{ padding: '10px', border: '1px solid black', borderRadius: '7px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '10px' }}>
                        <FormGroup>
                            <FormControlLabel control={<Checkbox />} label="Friday" />
                        </FormGroup>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DemoContainer components={['TimePicker']}>
                                <TimePicker size='small' label="From" />
                            </DemoContainer>
                        </LocalizationProvider>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DemoContainer components={['TimePicker']}>
                                <TimePicker size='small' label="To" />
                            </DemoContainer>
                        </LocalizationProvider>
                        <FormGroup>
                            <FormControlLabel control={<Checkbox />} label="Open 24 hours" />
                        </FormGroup>
                    </div>
                    <div style={{ padding: '10px', border: '1px solid black', borderRadius: '7px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '10px' }}>
                        <FormGroup>
                            <FormControlLabel control={<Checkbox />} label="Saturday" />
                        </FormGroup>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DemoContainer components={['TimePicker']}>
                                <TimePicker size='small' label="From" />
                            </DemoContainer>
                        </LocalizationProvider>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DemoContainer components={['TimePicker']}>
                                <TimePicker size='small' label="To" />
                            </DemoContainer>
                        </LocalizationProvider>
                        <FormGroup>
                            <FormControlLabel control={<Checkbox />} label="Open 24 hours" />
                        </FormGroup>
                    </div>
                    <div style={{ padding: '10px', border: '1px solid black', borderRadius: '7px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '10px' }}>
                        <FormGroup>
                            <FormControlLabel control={<Checkbox />} label="Sunday" />
                        </FormGroup>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DemoContainer components={['TimePicker']}>
                                <TimePicker size='small' label="From" />
                            </DemoContainer>
                        </LocalizationProvider>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DemoContainer components={['TimePicker']}>
                                <TimePicker size='small' label="To" />
                            </DemoContainer>
                        </LocalizationProvider>
                        <FormGroup>
                            <FormControlLabel control={<Checkbox />} label="Open 24 hours" />
                        </FormGroup>
                    </div>
                </div>
            )}

            <div style={{ width: '70%', display: 'flex', justifyContent: 'space-between', marginTop: '150px' }}>
                <Button variant="outlined">Back</Button>
                <Button variant="contained">Continue</Button>
            </div>
        </div>
    )
}

export default OpeningHours;
