import React, { useEffect } from 'react';

interface PdfViewerPopupProps {
    pdfUrl: string;
    isOpen: boolean;
    onClose: () => void;
}

const PdfViewerPopup: React.FC<PdfViewerPopupProps> = ({ pdfUrl, isOpen, onClose }) => {
    useEffect(() => {
        const handleEsc = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, [onClose]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75 backdrop-blur-sm p-4" onClick={onClose}>
            <div 
                className="relative bg-white w-full max-w-5xl h-[90vh] rounded-lg shadow-2xl flex flex-col overflow-hidden" 
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="flex justify-between items-center p-4 border-b border-gray-200 bg-gray-50">
                    <h3 className="text-lg font-semibold text-gray-800">Product Data Sheet</h3>
                    <button 
                        onClick={onClose}
                        className="text-gray-500 hover:text-red-600 transition-colors p-1 rounded-full hover:bg-gray-200 focus:outline-none"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Content */}
                <div className="grow bg-gray-100 p-1">
                    <iframe 
                        src={pdfUrl} 
                        className="w-full h-full border-none rounded"
                        title="PDF Viewer"
                    />
                </div>
            </div>
        </div>
    );
};

export default PdfViewerPopup;
