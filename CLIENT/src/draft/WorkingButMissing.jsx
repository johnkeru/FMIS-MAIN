import { Box, Button } from '@mui/material';
import { Viewer, Worker, ScrollMode } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import React, { useRef, useState } from 'react';
import Draggable from 'react-draggable';
import { useDropzone } from 'react-dropzone';
import SignatureCanvas from 'react-signature-canvas';
import { PDFDocument } from 'pdf-lib';

const PDFViewDialog = () => {
    const [pdfFile, setPdfFile] = useState(null);
    const [signatureURL, setSignatureURL] = useState(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [currentPage, setCurrentPage] = useState(0); // Track the current page in view
    const nodeRef = useRef(null);
    const sigCanvas = useRef(null);

    const saveSignature = () => {
        const signatureData = sigCanvas.current.toDataURL();
        setSignatureURL(signatureData);
    };

    const clearSignature = () => {
        sigCanvas.current.clear();
    };

    const onDrop = (acceptedFiles) => {
        if (acceptedFiles.length > 0) {
            const fileUrl = URL.createObjectURL(acceptedFiles[0]);
            setPdfFile(fileUrl);
        }
    };

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept: {
            'application/pdf': ['.pdf']
        },
    });

    const handleDragStop = () => {
        // Alert the page number where the signature was dropped
        alert(`Signature placed on page: ${currentPage + 1}`);
    };

    const downloadPDF = async () => {
        if (!pdfFile || !signatureURL) return;

        const existingPdfBytes = await fetch(pdfFile).then(res => res.arrayBuffer());
        const pdfDoc = await PDFDocument.load(existingPdfBytes);
        const pages = pdfDoc.getPages();
        const selectedPage = pages[currentPage];

        const signatureImageBytes = await fetch(signatureURL).then(res => res.arrayBuffer());
        const signatureImage = await pdfDoc.embedPng(signatureImageBytes);

        const pdfX = position.x;
        const pdfY = selectedPage.getHeight() - position.y;

        selectedPage.drawImage(signatureImage, {
            x: pdfX,
            y: pdfY,
            width: 150,
            height: 75,
        });

        const pdfBytes = await pdfDoc.save();
        const blob = new Blob([pdfBytes], { type: 'application/pdf' });
        const url = URL.createObjectURL(blob);

        const link = document.createElement('a');
        link.href = url;
        link.download = 'signed-document.pdf';
        link.click();

        URL.revokeObjectURL(url);
    };

    return (
        <div style={{ padding: '20px' }}>
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

            <div style={{ height: '100%', border: '1px solid rgba(0, 0, 0, 0.3)', position: 'relative' }}>
                {pdfFile && (
                    <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
                        <Draggable
                            nodeRef={nodeRef}
                            onStop={handleDragStop}  // Capture drag stop event to alert page number
                            onDrag={(e, data) => setPosition({ x: data.x, y: data.y })}
                        >
                            <div ref={nodeRef} style={{ position: 'absolute', zIndex: 1 }}>
                                {signatureURL && <img src={signatureURL} alt="Signature" style={{ width: '150px' }} />}
                            </div>
                        </Draggable>
                        <Viewer
                            fileUrl={pdfFile}
                            scrollMode={ScrollMode.Vertical}
                            onPageChange={(e) => setCurrentPage(e.currentPage)}  // Track current page in view
                        />
                    </Worker>
                )}
            </div>

            <Box sx={{ mt: 2 }}>
                <Button variant="contained" color="success" onClick={downloadPDF}>
                    Download Signed PDF
                </Button>
            </Box>
        </div>
    );
};

export default PDFViewDialog;
