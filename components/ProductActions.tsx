import React, { useState } from "react";
import { addItem } from "../store/enquiryStore";
import toast from "react-hot-toast";
import PdfViewerPopup from "./PdfViewerPopup";

interface ProductActionsProps {
    product: {
        title: string;
        description: string;
        image: string;
    };
    pdfUrl: string;
    downloadFileName?: string;
}

const ProductActions = ({ product, pdfUrl, downloadFileName }: ProductActionsProps) => {
    const [isPdfOpen, setIsPdfOpen] = useState(false);

    const handleAddToList = () => {
        addItem({
            id: product.title,
            title: product.title,
            description: product.description,
            image: product.image,
        });
        toast.success("Added to list!");
    };

    const handleEnquireNow = () => {
        handleAddToList();
        window.location.href = "/enquiry";
    };

    return (
        <>
            <div className="flex flex-wrap gap-3 pt-4 justify-center lg:justify-start">
                <button onClick={handleAddToList} className="flex items-center gap-2 px-6 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors cursor-pointer">
                    + Add to List
                </button>
                <button onClick={handleEnquireNow} className="flex items-center gap-2 px-6 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors cursor-pointer">
                    <img src="/enquire.svg" className="w-4 h-4" alt="Enquire" /> Enquire now
                </button>
                <a href={pdfUrl} download={downloadFileName} className="flex items-center gap-2 px-6 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors cursor-pointer text-black no-underline">
                    <img src="/download.svg" className="w-4 h-4" alt="Download" /> Download Brochure
                </a>
                <button onClick={() => setIsPdfOpen(true)} className="flex items-center gap-2 px-6 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors cursor-pointer">
                    View Details
                </button>
            </div>

            <PdfViewerPopup
                pdfUrl={pdfUrl}
                isOpen={isPdfOpen}
                onClose={() => setIsPdfOpen(false)}
            />
        </>
    );
};

export default ProductActions;
