import React, { useState } from 'react';
import PdfViewerPopup from './PdfViewerPopup';

export interface ProductVariant {
    protectionType: string;
    ratingAmp: string;
    poles: string | number;
    partNo230V?: string;
    partNo400V?: string;
    productDataSheetLink: string;
}

interface ProductVariantsTableProps {
    variants: ProductVariant[];
}

const ProductVariantsTable: React.FC<ProductVariantsTableProps> = ({ variants }) => {
    const [selectedPdf, setSelectedPdf] = useState<string | null>(null);

    const handleViewPdf = (pdfUrl: string) => {
        setSelectedPdf(pdfUrl);
    };

    const closePdfPopup = () => {
        setSelectedPdf(null);
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
                            <th rowSpan={2} className="py-3 px-6 text-center font-semibold">Product Data Sheet</th>
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
                                <td className="py-3 px-6 text-center">
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
