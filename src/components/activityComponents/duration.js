import { Button, TextField } from '@mui/material';
import React from 'react'

const Duration = () => {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px', marginBottom: '30px' }}>
                <h2 style={{ fontWeight: 'bold', padding: '5px' }}>
                    What is the total duration of your experience?
                </h2>
                <p style={{ padding: '5px' }}>
                    Inform your travellers about the duration of your experience so they can plan their time accordingly
                </p>
            </div>

            <div style={{ width: '30%', display: 'flex', gap: '20px' }}>
                <TextField
                    id="outlined-number"
                    label="Days"
                    type="number"
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
                <TextField
                    id="outlined-number"
                    label="Hours"
                    type="number"
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
                <TextField
                    id="outlined-number"
                    label="Minutes"
                    type="number"
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
            </div>

            <div style={{ width: '70%', display: 'flex', justifyContent: 'space-between', marginTop: '150px' }}>
                <Button variant="outlined">Back</Button>
                <Button variant="contained">Continue</Button>
            </div>
        </div>
    )
}

export default Duration;
