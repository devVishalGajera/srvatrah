import { Autocomplete, Box, Button, Checkbox, FormControlLabel, Modal, TextField, Typography } from '@mui/material';
import React from 'react'

const style = {
    marginTop: '10px',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'background.paper',
    // border: '2px solid #000',
    boxShadow: 24,
    p: "20px",
    '@media(max-height: 890px)': {
        top: '0',
        transform: 'translate(-50%, 0%)'
    }
};

const PricingCategories = () => {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    return (
        <>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                sx={{ overflowY: 'scroll' }}
            >
                <Box sx={style}>
                    <div style={{ borderBottom: "1px solid", padding: '10px' }}>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            Create Pricing Category
                        </Typography>
                    </div>
                    <div style={{ marginTop: '10px' }}>
                        <div style={{ padding: '10px', display: 'flex', justifyContent: 'space-between' }}>
                            <div>
                                <h6>
                                    Ticket Category
                                </h6>
                                <Autocomplete
                                    disablePortal
                                    id="combo-box-demo"
                                    options={categories}
                                    sx={{ width: "263px" }}
                                    size='small'
                                    renderInput={(params) => <TextField {...params} />}
                                />
                            </div>
                            <div>
                                <h6>
                                    Occupancy
                                </h6>
                                <TextField
                                    style={{ width: '263px' }}
                                    id="outlined-number"
                                    // label="Hours"
                                    type="number"
                                    size="small"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                            </div>
                        </div>
                        <div>
                            <div style={{ padding: '10px' }}>
                                <h6 style={{ marginBottom: '15px' }}>
                                    Age restrictions
                                </h6>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <div>
                                        <TextField
                                            style={{ width: '263px' }}
                                            id="outlined-number"
                                            label="MIN"
                                            type="number"
                                            size="small"
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                        />
                                    </div>
                                    <div>

                                        <TextField
                                            style={{ width: '263px' }}
                                            id="outlined-number"
                                            label="MAX"
                                            type="number"
                                            size="small"
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div style={{ padding: '10px', display: 'flex', justifyContent: 'space-between' }}>
                            <div style={{width:'100%'}}>
                                <h6>
                                    Pickup & Drop
                                </h6>
                                <div style={{display:'flex',justifyContent:'center'}}>
                                    <FormControlLabel style={{ width: 'fit-content' }} control={<Checkbox  />} />
                                </div>
                            </div>
                            <div>
                                <h6>
                                    Price
                                </h6>
                                <TextField
                                    style={{ width: '263px' }}
                                    id="outlined-number"
                                    // label="Hours"
                                    type="number"
                                    size="small"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                            </div>
                        </div>
                        <div style={{ padding: '10px', display: 'flex', justifyContent: 'space-between' }}>
                            <div style={{width:'100%'}}>
                                <h6>
                                    Pickup Only
                                </h6>
                                <div style={{display:'flex',justifyContent:'center'}}>
                                    <FormControlLabel style={{ width: 'fit-content' }} control={<Checkbox />} />
                                </div>
                            </div>
                            <div>
                                <h6>
                                    Price
                                </h6>
                                <TextField
                                    style={{ width: '263px' }}
                                    id="outlined-number"
                                    // label="Hours"
                                    type="number"
                                    size="small"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                            </div>
                        </div>
                        <div style={{ padding: '10px', display: 'flex', justifyContent: 'space-between' }}>
                            <div style={{width:'100%'}}>
                                <h6>
                                    Drop Only
                                </h6>
                                <div style={{display:'flex',justifyContent:'center'}}>
                                    <FormControlLabel style={{ width: 'fit-content' }} control={<Checkbox />} />
                                </div>
                            </div>
                            <div>
                                <h6>
                                    Price
                                </h6>
                                <TextField
                                    style={{ width: '263px' }}
                                    id="outlined-number"
                                    // label="Hours"
                                    type="number"
                                    size="small"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '40px' }}>
                        <Button onClick={handleClose} variant="outlined">Back</Button>
                        <Button variant="contained">Continue</Button>
                    </div>
                </Box>
            </Modal>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px', marginBottom: '30px' }}>
                    <h2 style={{ fontWeight: 'bold', padding: '5px' }}>
                        Establish your pricing categories
                    </h2>
                    <p style={{ padding: '5px', textAlign: 'center' }}>
                        You can define different types of travellers, such as adults, children, and groups. This will allow you to charge different prices for each pricing category, so that you can tailor your pricing to the specific needs of your travellers
                    </p>
                </div>

                <div style={{ width: '70%', height: '50px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid' }}>
                        <h5>
                            Selected pricing categories
                        </h5>
                        <h5>
                            <Button onClick={handleOpen} variant="outlined">+Add Pricing Category</Button>
                        </h5>
                    </div>
                </div>

                <div style={{ width: '70%', display: 'flex', justifyContent: 'space-between', marginTop: '150px' }}>
                    <Button  variant="outlined">Back</Button>
                    <Button variant="contained">Continue</Button>
                </div>
            </div>
        </>
    )
}

export default PricingCategories;

const categories = [
    { label: 'Adult' },
    { label: 'Child' },
    { label: 'Teenager' },
    { label: 'Infant' },
    { label: 'Senior' },
    { label: 'Student' },
    { label: 'Military' },
    { label: 'Group' },
    { label: 'Other' },
];
