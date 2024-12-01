import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { Viewer, Worker } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';

const PDFViewDialog = () => {
    const [dialogOpen, setDialogOpen] = useState(false);
    const [pdfFile, setPdfFile] = useState(null);

    const onDrop = (acceptedFiles) => {
        if (acceptedFiles.length > 0) {
            // Create a local URL for the uploaded file
            const fileUrl = URL.createObjectURL(acceptedFiles[0]);
            setPdfFile(fileUrl);
            setDialogOpen(true); // Open the dialog when a file is selected
        }
    };

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept: {
            'application/pdf': ['.pdf']
        }, // Accept only PDF files
    });

    const handleCloseDialog = () => {
        setDialogOpen(false);
        if (pdfFile) {
            // Release the object URL when closing the dialog
            URL.revokeObjectURL(pdfFile);
            setPdfFile(null); // Clear the file after revoking
        }
    };

    return (
        <div style={{ padding: '20px' }}>
            <div {...getRootProps()} style={{
                border: '2px dashed rgba(0, 0, 0, 0.3)',
                padding: '20px',
                textAlign: 'center',
                cursor: 'pointer',
                borderRadius: '8px',
            }}>
                <input {...getInputProps()} />
                <p>Drag & drop a PDF file here, or click to select a file</p>
            </div>

            <Dialog open={dialogOpen} onClose={handleCloseDialog} fullWidth maxWidth="lg">
                <DialogTitle>PDF Viewer</DialogTitle>
                <DialogContent dividers style={{ height: '600px', overflowY: 'hidden' }}>
                    <div style={{ height: '100%', border: '1px solid rgba(0, 0, 0, 0.3)' }}>
                        {pdfFile && (
                            <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
                                <Viewer fileUrl={pdfFile} />
                            </Worker>
                        )}
                    </div>


                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog} color="primary">
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default PDFViewDialog;
