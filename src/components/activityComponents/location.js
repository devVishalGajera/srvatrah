import { Button, TextField } from '@mui/material';
import React from 'react'

const location = () => {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px', marginBottom: '30px' }}>
                <h2 style={{ fontWeight: 'bold', padding: '5px' }}>
                What is the location of your experience?
                </h2>
                <p style={{ padding: '5px' }}>
                Inform travellers about the city or town where your experience takes place. This will help with filtering and searching online
                </p>
            </div>

            <div style={{ width: '70%' }}>
                <TextField fullWidth id="outlined-basic" label="location" variant="outlined" />
            </div>

            <div style={{width:'70%',display:'flex',justifyContent:'space-between',marginTop:'150px'}}>
                <Button variant="outlined">Back</Button>
                <Button variant="contained">Continue</Button>
            </div>
        </div>
    )
}

export default location;
