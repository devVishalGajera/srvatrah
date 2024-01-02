import { Button, TextField } from '@mui/material';
import React from 'react'

const Titel = () => {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px', marginBottom: '30px' }}>
                <h2 style={{ fontWeight: 'bold', padding: '5px' }}>
                    Give your experience a short but descriptive name
                </h2>
                <p style={{ padding: '5px' }}>
                    We recommend using simple language, keep it less than 80 characters, mention what and where the experience is
                </p>
            </div>

            <div style={{ width: '70%' }}>
                <TextField fullWidth id="outlined-basic" label="Titel" variant="outlined" />
            </div>

            <div style={{width:'70%',display:'flex',justifyContent:'space-between',marginTop:'150px'}}>
                <Button variant="outlined">Back</Button>
                <Button variant="contained">Continue</Button>
            </div>
        </div>
    )
}

export default Titel;
