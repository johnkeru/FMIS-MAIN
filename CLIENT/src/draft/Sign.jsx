import React, { useRef, useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import SignatureCanvas from 'react-signature-canvas';
import { useDropzone } from 'react-dropzone';
import Draggable from 'react-draggable';
import html2canvas from 'html2canvas';

const Sign = () => {
    const sigCanvas = useRef(null);
    const [file, setFile] = useState(null);
    const [signatureURL, setSignatureURL] = useState(null);
    const [isSignatureVisible, setSignatureVisible] = useState(false);
    const nodeRef = useRef(null); // Create a ref

    // Handle file upload
    const onDrop = (acceptedFiles) => {
        const uploadedFile = acceptedFiles[0];
        const fileURL = URL.createObjectURL(uploadedFile);
        setFile(fileURL);
    };

    // Generate and save signature URL
    const saveSignature = () => {
        const signatureData = sigCanvas.current.toDataURL();
        setSignatureURL(signatureData);
        setSignatureVisible(true); // Make the signature draggable
    };

    // Clear the signature canvas
    const clearSignature = () => {
        sigCanvas.current.clear();
        setSignatureVisible(false);
    };

    // Capture the final image with signature and download it
    const downloadImage = async () => {
        const element = document.getElementById('file-container');
        const canvas = await html2canvas(element);
        const image = canvas.toDataURL('image/png');

        const link = document.createElement('a');
        link.href = image;
        link.download = 'signed-file.png';
        link.click();
    };

    const { getRootProps, getInputProps } = useDropzone({ onDrop });

    return (
        <Box sx={{ p: 2, textAlign: 'center' }}>
            <Typography variant="h5" gutterBottom>
                Upload a File & Add Signature
            </Typography>

            {/* File Upload Area */}
            <Box {...getRootProps()} sx={{ border: '2px dashed gray', p: 2, my: 2, cursor: 'pointer' }}>
                <input {...getInputProps()} />
                <Typography>Drag & drop a file here, or click to select a file</Typography>
            </Box>

            {/* Display Uploaded File */}
            {file && (
                <Box id="file-container" sx={{ position: 'relative', width: '100%', maxWidth: 600, mx: 'auto', my: 2 }}>
                    <img src={file} alt="Uploaded File" style={{ width: '100%' }} />

                    {/* Draggable Signature */}
                    {isSignatureVisible && signatureURL && (
                        <Draggable nodeRef={nodeRef}>
                            <div ref={nodeRef} style={{ position: 'absolute', cursor: 'move' }}>
                                <img src={signatureURL} alt="Signature" style={{ width: '150px' }} />
                            </div>
                        </Draggable>
                    )}
                </Box>
            )}

            {/* Signature Canvas */}
            <Box sx={{ my: 2 }}>
                <SignatureCanvas
                    ref={sigCanvas}
                    penColor="black"
                    canvasProps={{ width: 400, height: 150, className: 'sigCanvas', style: { border: '1px solid #ddd' } }}
                />
                <Box sx={{ mt: 2 }}>
                    <Button variant="contained" color="primary" onClick={saveSignature} sx={{ mr: 1 }}>
                        Save Signature
                    </Button>
                    <Button variant="outlined" color="secondary" onClick={clearSignature}>
                        Clear Signature
                    </Button>
                </Box>
            </Box>

            {/* Download Button */}
            {file && (
                <Button variant="contained" color="success" onClick={downloadImage} sx={{ mt: 3 }}>
                    Download Signed File
                </Button>
            )}
        </Box>
    );
};

export default Sign;
