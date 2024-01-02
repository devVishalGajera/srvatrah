import { Button, TextField } from '@mui/material';
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

const description = () => {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px', marginBottom: '20px' }}>
                <h2 style={{ fontWeight: 'bold', padding: '5px' }}>
                    Tell your travellers what the experience is all about
                </h2>
                <p style={{ padding: '5px' }}>
                    Describe your experience in detail, using exciting and engaging language to capture the essence of the experience
                </p>
            </div>

            <div style={{ width: '70%' }}>
                <div style={{ padding: '20px' }}>
                    <h5>Short description</h5>
                    <span style={{ fontStyle: 'italic', paddingBottom: '5px' }}>Brief overview of the experience - this will be displayed on product cards in search results.</span>
                    <TextField fullWidth id="outlined-basic" variant="outlined" size='small' />
                </div>
                <div style={{ padding: '20px' }}>
                    <h5>Description</h5>
                    <ReactQuill
                    style={{height:'150px'}}
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

export default description;
