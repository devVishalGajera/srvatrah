import { Button, TextField } from '@mui/material';
import React from 'react'
import { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const Videos = () => {
    const [videoLinks, setVideoLinks] = useState(['']); // Initialize with an empty string

    const handleVideoLinkChange = (index, value) => {
        const newLinks = [...videoLinks];
        newLinks[index] = value;
        setVideoLinks(newLinks);
    };

    const addVideoLink = () => {
        setVideoLinks([...videoLinks, '']); // Add an empty string for a new text field
    };
    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px', marginBottom: '20px' }}>
                <h2 style={{ fontWeight: 'bold', padding: '5px' }}>
                    Want to add videos to your experience?
                </h2>
                <p style={{ padding: '5px' }}>
                    Show travellers even more details about your experience to give your travellers a better idea of what to expect
                </p>
            </div>

            <div style={{ width: '70%' }}>
                <div style={{ padding: '20px' }}>
                    <h5>Video links</h5>
                    <span style={{ fontStyle: 'italic', paddingBottom: '5px' }}>Paste in links from Youtube / Vimeo</span>
                    {videoLinks.map((link, index) => (
                        <TextField
                            key={index}
                            fullWidth
                            id={`outlined-basic-${index}`}
                            variant="outlined"
                            size='small'
                            value={link}
                            onChange={(e) => handleVideoLinkChange(index, e.target.value)}
                        />
                    ))}
                    <div style={{display:'flex',justifyContent:'center'}}>
                    <Button variant="outlined" onClick={addVideoLink}>Add onether one</Button>
                    </div>
                </div>
            </div>

            <div style={{ width: '70%', display: 'flex', justifyContent: 'space-between', marginTop: '150px' }}>
                <Button variant="outlined">Back</Button>
                <Button variant="contained">Continue</Button>
            </div>
        </div>
    )
}

export default Videos;
