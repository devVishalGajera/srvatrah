// import { Button, TextField } from '@mui/material';
import { Button, Paper, IconButton, Box } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import React from 'react'

const Photos = () => {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px', marginBottom: '30px' }}>
                <h2 style={{ fontWeight: 'bold', padding: '5px' }}>
                    A photo is worth a thousand words!
                </h2>
                <p style={{ padding: '5px' }}>
                    We recommend that you add at least 5 high quality photos to your experience with various angles and views
                </p>
            </div>

            <div style={{ width: '70%' }}>
                <Paper
                    elevation={7}
                    style={{
                        padding: '20px',
                        textAlign: 'center',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        border: '2px dashed #0000003D',
                        borderRadius: '12px',
                        height: '200px',
                        boxShadow: 'none',
                        justifyContet: 'center',
                    }}
                // onDrop={handleDrop}
                // onDragOver={preventDefault}
                >
                    <input
                        type="file"
                        // onChange={handleFileChange}
                        style={{ display: 'none' }}
                        id="file-upload-input"
                        accept="image/*"
                        maxFileSize={5 * 1024 * 1024}
                    />
                    <label
                        htmlFor="file-upload-input"
                        style={{
                            height: '100%',
                            width: '100%',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexDirection:'column'
                        }}>
                        <h4>Drag photos here to upload</h4>
                        <span>Supported file types are: .png, .jpg, .jpeg</span>
                        {/* <span>Maximum file size is 17 MB</span> */}
                        <IconButton component="span" size="large">
                            {/* <Image src={FileUploadIcon} alt="Image" /> */}
                            <CloudUploadIcon/> Browse Your Computer
                        </IconButton>
                    </label>
                </Paper>
            </div>

            <div style={{ width: '70%', display: 'flex', justifyContent: 'space-between', marginTop: '150px' }}>
                <Button variant="outlined">Back</Button>
                <Button variant="contained">Continue</Button>
            </div>
        </div>
    )
}

export default Photos;




// import React, { useEffect, useState } from 'react';
// import { Button, Paper, IconButton, Box } from '@mui/material';
// import Modal from '@mui/material/Modal';
// import { FileUploadIcon } from '@assets/images';
// import Image from 'next/image';
// import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
// import { styled } from '@mui/material/styles';
// import axios from 'axios';
// import CloseIcon from '@mui/icons-material/Close';

// const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
//     height: 10,
//     borderRadius: 5,
//     [`&.${linearProgressClasses.colorPrimary}`]: {
//         backgroundColor: '#ebebeb',
//     },
//     [`& .${linearProgressClasses.bar}`]: {
//         borderRadius: 5,
//         backgroundColor: '#27AE60',
//     },
// }));
// const allowedExtensions = /(\.jpg|\.jpeg|\.png|\.gif)$/i;
// const maxSizeInBytes = 5 * 1024 * 1024; // 5 MB

// const FileUploadWithProgressBar = (props) => {
//     const [selectedFile, setSelectedFile] = useState(null);
//     const [uploadProgress, setUploadProgress] = useState(0);
//     const [errors, setErrors] = useState('');

//     const [documentData, setDocumentData] = useState();
//     const [userDetail, setUserDetail] = useState({});

//     useEffect(() => {
//         const data = localStorage.getItem('user');
//         setUserDetail(data ? JSON.parse(data) : {});
//     }, [props?.open]);

//     const handleUpload = (file: any) => {
//         const totalSize = file.size;
//         let uploadedSize = 0;

//         const uploadInterval = setInterval(() => {
//             uploadedSize += 100000; // Simulated progress increment
//             const progress = Math.min((uploadedSize / totalSize) * 100, 100);
//             setUploadProgress(progress);

//             if (progress === 100) {
//                 clearInterval(uploadInterval);
//             }
//         }, 500);
//     };

//     const handleFileChange = (event) => {
//         const file = event.target.files[0];
//         if (!allowedExtensions.exec(file.name)) {
//             setErrors('Only image is allowed');
//             return;
//         }
//         if (file.size > maxSizeInBytes) {
//             setErrors('Image size must be less the 5MB');
//             return;
//         }
//         setErrors('');
//         setSelectedFile(file);
//         handleUpload(file);
//     };

//     const handleDrop = (event) => {
//         event.preventDefault();
//         const file = event.dataTransfer.files[0];
//         if (!allowedExtensions.exec(file.name)) {
//             setErrors('Only image is allowed');
//             return;
//         }
//         if (file.size > maxSizeInBytes) {
//             setErrors('Image size must be less the 5MB');
//             return;
//         }
//         setErrors('');
//         setSelectedFile(file);
//         handleUpload(file);
//     };

//     const preventDefault = (event) => {
//         event.preventDefault();
//     };

//     const handleClose = () => {
//         setDocumentData({});
//         setSelectedFile(null);
//         setUploadProgress(0);
//         setUserDetail({});
//         props.onClose();
//     };
//     const saveFile = async () => {
//         let index = selectedFile.name.lastIndexOf('.');
//         let before = selectedFile.name.slice(0, index);
//         let after = selectedFile.name.slice(index + 1);
//         const fileNewName = `${before}${+new Date()}.${after}`.replace(/ /g, '_');
//         const modifiedFile = new File([selectedFile], fileNewName, { type: selectedFile.type });

//         const formData = await new FormData();
//         formData.append('file', modifiedFile);
//         await axios
//             .post(`${process.env.SERVER_URL}/uploads/profile?userId=${userDetail?.id}`, formData)
//             .then((res: any) => {
//                 res?.data?.signedUrl &&
//                     props?.setUserData?.((prevState) => ({
//                         ...prevState,
//                         signedUrl: res?.data?.signedUrl,
//                         picture: res?.data?.documentData?.fileName,
//                         originalFileName: res?.data?.documentData?.originalFileName,
//                     }));
//                 res?.data?.signedUrl &&
//                     setUserDetail((prevState) => ({
//                         ...prevState,
//                         signedUrl: res?.data?.signedUrl,
//                         picture: res?.data?.documentData?.fileName,
//                         originalFileName: res?.data?.documentData?.fileName,
//                     }));
//                 localStorage.setItem(
//                     'user',
//                     JSON.stringify({
//                         ...userDetail,
//                         signedUrl: res?.data?.signedUrl,
//                         picture: res?.data?.documentData?.fileName,
//                         originalFileName: res?.data?.documentData?.originalFileName,
//                     }),
//                 );
//                 handleClose();
//             })
//             .catch((err) => {
//                 console.log('err', err);
//             });
//     };

//     const removeImg = async () => {
//         await axios
//             .delete(`${process.env.SERVER_URL}/uploads/delete`, {
//                 data: { key: userDetail?.picture || documentData?.fileName },
//             })
//             .then((res: any) => {
//                 setSelectedFile(null);
//                 props?.setUserData?.((prevState) => ({ ...prevState, picture: '' }));
//                 localStorage.setItem(
//                     'user',
//                     JSON.stringify({
//                         ...userDetail,
//                         picture: '',
//                         originalFileName: '',
//                     }),
//                 );
//                 handleClose();
//             })
//             .catch((err) => {
//                 console.log('err', err);
//             });
//     };

//     const modalStyle = {
//         position: 'absolute',
//         width: '354px',
//         top: '50%',
//         left: '50%',
//         transform: 'translate(-50%, -50%)',
//         backgroundColor: '#262634',
//         maxHeight: '404px',
//     };
//     return (
//         <Box sx={{ display: 'flex' }}>
//             <Modal open={props.open} onClose={() => handleClose()}>
//                 <Box
//                     sx={{
//                         display: 'flex',
//                         alignItems: 'center',
//                         justifyContent: 'center',
//                         height: '100%',
//                         ...modalStyle,
//                     }}>
//                     <Box
//                         sx={{
//                             maxWidth: '354px',
//                             width: '100%',
//                             background: 'white',
//                             display: 'flex',
//                             flexDirection: 'column',
//                             gap: '24px',
//                             padding: '40px 24px 40px 24px',
//                             borderRadius: '16px',
//                         }}>
//                         <CloseIcon
//                             sx={{
//                                 color: 'black',
//                                 fontSize: 20,
//                                 position: 'absolute',
//                                 top: '-12px',
//                                 right: '10px',
//                                 cursor: 'pointer'
//                             }}
//                             onClick={() => handleClose()}
//                         />
//                         <Box sx={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
//                             <Box sx={{ fontSize: '20px', fontWeight: 700, textAlign: 'center' }}>
//                                 Profile Image
//                             </Box>
//                             <Box sx={{ fontSize: '14px', textAlign: 'center' }}>
//                                 Upload a image from your computer, max size 5Mb
//                             </Box>
//                         </Box>
//                         <Paper
//                             elevation={3}
//                             style={{
//                                 padding: '20px',
//                                 textAlign: 'center',
//                                 display: 'flex',
//                                 flexDirection: 'column',
//                                 alignItems: 'center',
//                                 border: '2px dashed #0000003D',
//                                 borderRadius: '12px',
//                                 height: '120px',
//                                 boxShadow: 'none',
//                                 justifyContet: 'center',
//                             }}
//                             onDrop={handleDrop}
//                             onDragOver={preventDefault}>
//                             <input
//                                 type="file"
//                                 onChange={handleFileChange}
//                                 style={{ display: 'none' }}
//                                 id="file-upload-input"
//                                 accept="image/*"
//                                 maxFileSize={5 * 1024 * 1024}
//                             />
//                             <label
//                                 htmlFor="file-upload-input"
//                                 style={{
//                                     height: '100%',
//                                     width: '100%',
//                                     cursor: 'pointer',
//                                     display: 'flex',
//                                     alignItems: 'center',
//                                     justifyContent: 'center',
//                                 }}>
//                                 <IconButton component="span" size="large">
//                                     <Image src={FileUploadIcon} alt="Image" />
//                                 </IconButton>
//                             </label>
//                         </Paper>
//                         <Box>
//                             {errors && (
//                                 <Box
//                                     sx={{ fontSize: '10px', fontWeight: 700, color: '#FE5656' }}
//                                     onClick={() => removeImg()}>
//                                     {errors}
//                                 </Box>
//                             )}
//                             <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
//                                 <Box>
//                                     <Box sx={{ fontSize: '12px', fontWeight: 700 }}>
//                                         {selectedFile?.name ?? userDetail?.originalFileName ?? ''}
//                                     </Box>
//                                     <Box sx={{ fontSize: '10px', fontWeight: 400 }} variant="body2">
//                                         {selectedFile?.size
//                                             ? (selectedFile?.size / (1024 * 1024)).toFixed(2) + ' MB'
//                                             : ''}
//                                     </Box>
//                                 </Box>
//                                 {userDetail?.picture && userDetail?.signedUrl && (
//                                     <Box
//                                         sx={{ fontSize: '12px', fontWeight: 700, color: '#FE5656', cursor: 'pointer' }}
//                                         onClick={() => removeImg()}>
//                                         Remove
//                                     </Box>
//                                 )}
//                             </Box>
//                             <div style={{ marginTop: '10px', width: '100%' }}>
//                                 <BorderLinearProgress variant="determinate" value={uploadProgress} />
//                             </div>
//                         </Box>
//                         <Button
//                             size="large"
//                             variant="contained"
//                             fullWidth
//                             disabled={!selectedFile}
//                             onClick={() => saveFile()}
//                             sx={{
//                                 borderRadius: 1000,
//                                 background: '#3A64D6',
//                                 fontSize: 16,
//                                 fontWeight: 700,
//                                 fontFamily: 'Inter',
//                                 textTransform: 'unset',
//                             }}>
//                             Upload and Save{' '}
//                         </Button>
//                     </Box>
//                 </Box>
//             </Modal>
//         </Box>
//     );
// };

// export default FileUploadWithProgressBar;

