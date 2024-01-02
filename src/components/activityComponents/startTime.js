import { Box, Button, Modal, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from '@mui/material';
import { LocalizationProvider, TimePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import React from 'react'
// import { DataGrid, GridRowsProp, GridColDef } from '@mui/x-data-grid';

function createData(id, time, duration, linkedRates, buttons) {
    return { id, time, duration, linkedRates, buttons };
}

const rows = [
    createData('2825752', "12:00 PM", "1 hour", "Standard rate", "Edit/Delete")
];

const style = {
    marginTop: '10px',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 900,
    bgcolor: 'background.paper',
    // border: '2px solid #000',
    boxShadow: 24,
    p: "20px",
    '@media(max-height: 890px)': {
        top: '0',
        transform: 'translate(-50%, 0%)'
    }
};

const StartTime = () => {
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
                            Add start time
                        </Typography>
                    </div>
                    <div style={{ marginTop: '10px' }}>
                        <div style={{ padding: '10px' }}>
                            <h6>
                                Start time / departure
                            </h6>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DemoContainer components={['TimePicker']}>
                                    <TimePicker size='small' />
                                </DemoContainer>
                            </LocalizationProvider>
                        </div>
                        <div style={{ padding: '10px' }}>
                            <h6>
                                Duration
                            </h6>
                            <div style={{ display: 'flex' }}>
                                <div>
                                    <TextField
                                        style={{ width: '100px', paddingRight: '10px' }}
                                        id="outlined-number"
                                        // label="Hours"
                                        type="number"
                                        size="small"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                    />
                                    <div style={{ fontStyle: 'italic' }}>Hours</div>
                                </div>
                                <div>
                                    <TextField
                                        style={{ width: '100px', paddingRight: '10px' }}
                                        id="outlined-number"
                                        // label="Minutes"
                                        type="number"
                                        size="small"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                    />
                                    <div style={{ fontStyle: 'italic' }}>Minutes</div>
                                </div>
                            </div>
                        </div>
                        <div style={{ padding: '10px' }}>
                            <h6>Internal label (Only visible for me)</h6>
                            <span style={{ fontStyle: 'italic', paddingBottom: '5px', fontSize: '12px' }}>This internal label can be helpful when you have multiple start times at the same time. Only your company will be able to see this</span>
                            <TextField fullWidth id="outlined-basic" variant="outlined" size='small' />
                        </div>
                        <div style={{ padding: '10px' }}>
                            <h6>External Label (Visible to customers)</h6>
                            <span style={{ fontStyle: 'italic', paddingBottom: '5px', fontSize: '12px' }}>This internal label can be helpful when you have multiple start times at the same time. Only your company will be able to see this</span>
                            <TextField fullWidth id="outlined-basic" variant="outlined" size='small' />
                        </div>
                        <div style={{ padding: '10px' }}>
                            <h6>Product code</h6>
                            {/* <span style={{ fontStyle: 'italic', paddingBottom: '5px', fontSize: '15px' }}>This internal label can be helpful when you have multiple start times at the same time. Only your company will be able to see this</span> */}
                            <TextField fullWidth id="outlined-basic" variant="outlined" size='small' />
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
                        When does the experience start?
                    </h2>
                    <p style={{ padding: '5px' }}>
                        You can schedule multiple start times for each day. Later, you can select the specific dates on which you will offer your experience
                    </p>
                </div>

                <div style={{ width: '70%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell sx={{ width: '30px' }}>#</TableCell>
                                    <TableCell sx={{ width: '30px' }} align="center">Time</TableCell>
                                    <TableCell sx={{ width: '30px' }} align="center">Duration</TableCell>
                                    <TableCell sx={{ width: '30px' }} align="center">Linked Rates</TableCell>
                                    <TableCell sx={{ width: '30px' }} align="center"></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {rows.map((row) => (
                                    <TableRow
                                        key={row.id}
                                    // sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell component="th" scope="row">
                                            {row.id}
                                        </TableCell>
                                        <TableCell align="center">{row.time}</TableCell>
                                        <TableCell align="center">{row.duration}</TableCell>
                                        <TableCell align="center">{row.linkedRates}</TableCell>
                                        <TableCell align="center">{row.buttons}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <Button onClick={handleOpen} style={{ marginTop: '10px' }} variant="contained">+ Add Start Time</Button>


                </div>

                <div style={{ width: '70%', display: 'flex', justifyContent: 'space-between', marginTop: '150px' }}>
                    <Button variant="outlined">Back</Button>
                    <Button variant="contained">Continue</Button>
                </div>
            </div>
        </>
    )
}

export default StartTime;
