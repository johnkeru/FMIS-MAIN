import React, { useState, useRef } from "react";
import SignatureCanvas from "react-signature-canvas";
import { PDFDocument, rgb } from "pdf-lib";

const WorkingButNoViewerPDF = () => {
    const [pdfFile, setPdfFile] = useState(null);
    const [signedPdf, setSignedPdf] = useState(null);
    const sigCanvas = useRef(null);

    // Handle file upload
    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => setPdfFile(e.target.result);
            reader.readAsArrayBuffer(file);
        }
    };

    // Clear signature
    const clearSignature = () => {
        sigCanvas.current.clear();
    };

    // Apply signature to the PDF
    const handleSignPdf = async () => {
        if (!pdfFile) return alert("Please upload a PDF file.");

        const signatureDataUrl = sigCanvas.current
            .getTrimmedCanvas()
            .toDataURL("image/png");

        const pdfDoc = await PDFDocument.load(pdfFile);
        console.log(pdfDoc.getPageCount())
        const page = pdfDoc.getPage(0);

        const signatureImage = await pdfDoc.embedPng(signatureDataUrl);
        const { width, height } = page.getSize();

        // Position and size the signature
        page.drawImage(signatureImage, {
            x: width - 150,
            y: 50,
            width: 100,
            height: 50,
        });

        const signedPdfBytes = await pdfDoc.save();
        const signedBlob = new Blob([signedPdfBytes], { type: "application/pdf" });
        setSignedPdf(URL.createObjectURL(signedBlob));
    };

    return (
        <div>
            <h2>Upload and Sign PDF</h2>
            <input type="file" accept="application/pdf" onChange={handleFileUpload} />

            <div style={{ marginTop: "20px" }}>
                <SignatureCanvas
                    ref={sigCanvas}
                    penColor="black"
                    canvasProps={{ width: 500, height: 200, className: "sigCanvas" }}
                />
                <button onClick={clearSignature}>Clear Signature</button>
            </div>

            <button onClick={handleSignPdf} style={{ marginTop: "20px" }}>
                Sign PDF
            </button>

            {signedPdf && (
                <div>
                    <h3>Signed PDF:</h3>
                    <a href={signedPdf} download="signed_document.pdf">
                        Download Signed PDF
                    </a>
                </div>
            )}
        </div>
    );
};

export default WorkingButNoViewerPDF;
