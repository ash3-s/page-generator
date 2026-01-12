import React, { useState } from 'react';
import PdfViewerPopup from './PdfViewerPopup';
import { addItem } from "../store/enquiryStore";
import toast from "react-hot-toast";

export interface ProductVariant {
    protectionType: string;
    ratingAmp: string;
    poles: string | number;
    partNo230V?: string;
    partNo400V?: string;
    productDataSheetLink: string;
    image?: string;
    title?: string;
}

interface ProductVariantsTableProps {
    variants: ProductVariant[];
    productTitle?: string;
}

const ProductVariantsTable: React.FC<ProductVariantsTableProps> = ({ variants, productTitle = "Product" }) => {
    const [selectedPdf, setSelectedPdf] = useState<string | null>(null);

    const handleViewPdf = (pdfUrl: string) => {
        setSelectedPdf(pdfUrl);
    };

    const closePdfPopup = () => {
        setSelectedPdf(null);
    };

    const handleAddToList = (variant: ProductVariant) => {
        const p230 = variant.partNo230V ? variant.partNo230V.trim() : "";
        const p400 = variant.partNo400V ? variant.partNo400V.trim() : "";

        // If 230V exists and is not a placeholder/dash, use it. Otherwise use 400V.
        // We explicitly check against "-" and empty string.
        const partNo = (p230 !== "" && p230 !== "-") ? p230 : p400;

        const variantTitle = `${productTitle} - Part No: ${partNo}`;
        const description = `Protection: ${variant.protectionType}, Rating: ${variant.ratingAmp}A, Poles: ${variant.poles}, 230V: ${variant.partNo230V}, 400V: ${variant.partNo400V}`;

        addItem({
            id: variantTitle,
            title: variantTitle,
            description: description,
            image: variant.image || "",
        });
        toast.success("Added to list!");
    };

    const handleEnquireNow = (variant: ProductVariant) => {
        handleAddToList(variant);
        window.location.href = "/enquiry";
    };


    return (
        <>
            <div className="overflow-x-auto w-full my-8">
                <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-sm">
                    <thead>
                        <tr className="bg-brand-color text-white uppercase text-sm leading-normal">
                            <th rowSpan={2} className="py-3 px-6 text-left border-r border-gray-200 font-semibold">Protection type</th>
                            <th rowSpan={2} className="py-3 px-6 text-left border-r border-gray-200 font-semibold">Rating Amp.</th>
                            <th rowSpan={2} className="py-3 px-6 text-left border-r border-gray-200 font-semibold">No. of poles</th>
                            <th className="py-3 px-6 text-center border-r border-gray-200 border-b font-semibold">230 V 50 and 60 Hz</th>
                            <th className="py-3 px-6 text-center border-r border-b border-gray-200 font-semibold">400 V 50 and 60 Hz</th>
                            <th rowSpan={2} className="py-3 px-6 text-center font-semibold border-r border-gray-200">Product Data Sheet</th>
                            <th rowSpan={2} className="py-3 px-6 text-center font-semibold">Actions</th>
                        </tr>
                        <tr className="bg-brand-color text-white uppercase text-sm leading-normal">
                            <th className="py-3 px-6 text-center border-r border-gray-200 font-semibold">Part no.</th>
                            <th className="py-3 px-6 text-center border-r border-gray-200 font-semibold">Part no.</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-900 text-sm">
                        {variants.map((variant, index) => (
                            <tr key={index} className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                                <td className="py-3 px-6 text-left whitespace-nowrap border-r border-gray-200 font-medium">{variant.protectionType}</td>
                                <td className="py-3 px-6 text-left border-r border-gray-200">{variant.ratingAmp}</td>
                                <td className="py-3 px-6 text-left border-r border-gray-200">{variant.poles}</td>
                                <td className="py-3 px-6 text-center border-r border-gray-200">{variant.partNo230V || "-"}</td>
                                <td className="py-3 px-6 text-center border-r border-gray-200">{variant.partNo400V || "-"}</td>
                                <td className="py-3 px-6 text-center border-r border-gray-200">
                                    <button
                                        onClick={() => handleViewPdf(variant.productDataSheetLink)}
                                        className="inline-flex items-center gap-2 px-4 py-2 bg-brand-color text-white rounded-lg hover:bg-blue-700 transition-colors text-xs font-bold uppercase cursor-pointer"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                        View
                                    </button>
                                </td>
                                <td className="py-3 px-6 text-center">
                                    <div className="flex justify-center gap-2">
                                        <button onClick={() => handleAddToList(variant)} className="p-2 bg-gray-200 rounded-full hover:bg-gray-300 transition-colors" title="Add to List">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                            </svg>
                                        </button>
                                        <button onClick={() => handleEnquireNow(variant)} className="p-2 bg-gray-200 rounded-full hover:bg-gray-300 transition-colors" title="Enquire Now">
                                            <img src="/enquire.svg" className="w-4 h-4" alt="Enquire" />
                                        </button>
                                        <a href={variant.productDataSheetLink} download className="p-2 bg-gray-200 rounded-full hover:bg-gray-300 transition-colors flex items-center justify-center" title="Download Brochure">
                                            <img src="/download.svg" className="w-4 h-4" alt="Download" />
                                        </a>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <PdfViewerPopup
                pdfUrl={selectedPdf || ''}
                isOpen={!!selectedPdf}
                onClose={closePdfPopup}
            />
        </>
    );
};

export default ProductVariantsTable;
