import { Autocomplete, Button, TextField } from '@mui/material';
import React from 'react'

const Categories = () => {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px', marginBottom: '30px' }}>
                <h2 style={{ fontWeight: 'bold', padding: '5px' }}>
                    Choose the themes that best describe your experience
                </h2>
                <p style={{ padding: '5px' }}>
                    Help your travellers find what they are looking for. Are you offering a walking tour or helicopter tour?
                </p>
            </div>

            <div style={{ width: '70%' }}>
                <div style={{padding:'20px'}}>
                    <h5>Categories</h5>
                    <span style={{fontStyle:'italic',paddingBottom:'5px'}}>Help your customer understand what type of experience this is</span>
                    <Autocomplete
                        disablePortal
                        id="combo-box-demo"
                        options={categories}
                        // sx={{ width: 300 }}
                        renderInput={(params) => <TextField {...params} />}
                    />
                </div>
                <div style={{padding:'20px'}}>
                    <h5>Theme</h5>
                    <span style={{fontStyle:'italic',paddingBottom:'5px'}}>Select the themes that apply for this experience...</span>
                    <Autocomplete
                        disablePortal
                        id="combo-box-demo"
                        options={theme}
                        // sx={{ width: 300 }}
                        renderInput={(params) => <TextField {...params} />}
                    />
                </div>
                {/* <TextField
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
                /> */}
            </div>

            <div style={{ width: '70%', display: 'flex', justifyContent: 'space-between', marginTop: '150px' }}>
                <Button variant="outlined">Back</Button>
                <Button variant="contained">Continue</Button>
            </div>
        </div>
    )
}

export default Categories;

const categories = [
    { label: 'The Godfather' },
    { label: 'Pulp Fiction' },
];
const theme = [
    { label: 'The Godfather' },
    { label: 'Pulp Fiction' },
];
