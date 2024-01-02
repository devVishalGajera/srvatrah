import { Button, FormControlLabel, FormGroup, Switch, TextField } from '@mui/material';
import React from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

export const modules = {
    toolbar: [
        [{ size: [] }],
        [{ align: [] }],
        [{ color: [] }, { background: [] }],
        ['bold', 'italic', 'underline', 'strike'],
        [{ list: 'bullet' }, { list: 'ordered' }],
        ['link', 'image', 'code-block', 'blockquote'],
    ],
    clipboard: {
        matchVisual: false,
    },
};
export const formats = [
    'size',
    'align',
    'color',
    'background',
    'bold',
    'italic',
    'underline',
    'strike',
    'bullet',
    'list',
    'link',
    'image',
    'code-block',
    'blockquote',
];

const Inclusions = () => {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px', marginBottom: '20px' }}>
                <h2 style={{ fontWeight: 'bold', padding: '5px' }}>
                    What is included in your experience?
                </h2>
                <p style={{ padding: '5px',textAlign:'center' }}>
                    Let travellers know what is provided to help them understand what they're paying for. Include items such as food and drinks, special equipment, and admission fees
                </p>
            </div>

            <div style={{ width: '70%' }}>
                <div style={{ padding: '20px' }}>
                    <h5>Inclusions</h5>
                    <span style={{ fontStyle: 'italic', paddingBottom: '5px' }}>Use the inclusions to highlight any fees, equipment, or other items that are included in your pricing.</span>
                    <TextField fullWidth id="outlined-basic" variant="outlined" size='small' />
                </div>
                <div style={{ padding: '20px' }}>
                    <span style={{ fontStyle: 'italic', paddingBottom: '5px' }}>If you need to add more details about what is included, you can use the text field below.</span>
                    <ReactQuill
                        style={{ height: '150px' }}
                        modules={modules}
                        formats={formats}
                    // value={editorValue}
                    // {...restProps}
                    // onChange={handleEditorChange}
                    />
                </div>
            </div>

            <div style={{ width: '70%', display: 'flex', justifyContent: 'space-between', marginTop: '150px' }}>
                <Button variant="outlined">Back</Button>
                <Button variant="contained">Continue</Button>
            </div>

            
        </div>
    )
}

export default Inclusions;
