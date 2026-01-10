import { useState } from "react";
import { addItem } from "../store/enquiryStore";
import toast from "react-hot-toast";
import type { ProductData } from "./ProductShowcaseCompare";
export type { ProductData };

interface ProductShowcaseCompareVerticalProps {
    products: [ProductData, ProductData]; // Expecting an array of exactly two products
}

const ProductItemVertical = ({ product, isLast }: { product: ProductData, isLast: boolean }) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const handleAddToList = () => {
        addItem({
            id: product.id,
            title: product.title,
            description: product.description,
            image: product.images[0],
        });
        toast.success(`Added ${product.title} to list!`);
    };

    const handleEnquireNow = () => {
        handleAddToList();
        window.location.href = "/enquiry";
    };

    const handleDownloadBrochure = () => {
        toast.success(`Downloading brochure for ${product.title}...`);
        // Add actual download logic here
    };

    return (
        <div className={`w-full ${!isLast ? 'border-b-2 border-gray-200 pb-8 mb-8' : ''}`}>
            <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
                {/* Left Side: Images */}
                <div className="w-full lg:w-1/2">
                    {/* Main Product Image Display */}
                    <div className="w-full bg-gray-50 rounded-xl overflow-hidden flex items-center justify-center h-48 mb-4 border border-gray-100">
                        <img
                            src={product.images[currentImageIndex]}
                            alt={product.title}
                            className="object-contain p-4 w-full h-full"
                        />
                    </div>

                    {/* Image Thumbnails/Dots */}
                    <div className="flex flex-wrap gap-2 justify-center">
                        {product.images.map((img, idx) => (
                            <button
                                key={idx}
                                onClick={() => setCurrentImageIndex(idx)}
                                className={`w-20 h-20 border-2 rounded-lg overflow-hidden transition ${currentImageIndex === idx ? "border-blue-600" : "border-gray-200"}`}
                            >
                                <img src={img} className="object-contain p-1 w-full h-full" />
                            </button>
                        ))}
                    </div>
                </div>

                {/* Right Side: Info & Actions */}
                <div className="w-full lg:w-1/2 flex flex-col">
                    <h2 className="text-2xl lg:text-3xl font-bold mb-3 text-gray-900">{product.title}</h2>

                    {product.description && (
                        <p className="text-gray-600 mb-4 text-base">{product.description}</p>
                    )}

                    {/* Action Buttons */}
                    <div className="flex flex-wrap gap-3 mb-6">
                        <button onClick={handleAddToList} className="flex items-center gap-2 px-6 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors cursor-pointer text-gray-800 font-medium">
                            + Add to List
                        </button>
                        <button onClick={handleEnquireNow} className="flex items-center gap-2 px-6 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors cursor-pointer text-gray-800 font-medium">
                            <img src="/enquire.svg" className="w-4 h-4" alt="Enquire" /> Enquire Now
                        </button>
                        <button onClick={handleDownloadBrochure} className="flex items-center gap-2 px-6 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors cursor-pointer text-gray-800 font-medium">
                            <img src="/download.svg" className="w-4 h-4" alt="Download" /> Download Brochure
                        </button>
                    </div>

                    {/* Technical Details Section */}
                    <div className="mt-auto">
                        <h3 className="text-lg font-bold mb-2 text-gray-800">Technical Details</h3>
                        <div className="space-y-4">
                            {product.technicalDataImages.map((src, index) => (
                                <img
                                    key={index}
                                    src={src}
                                    alt={`${product.title} Technical Detail ${index + 1}`}
                                    className="w-full h-auto object-contain border border-gray-200 rounded-lg bg-white shadow-sm"
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Specifications Section (Full Width) */}
            {product.specImages && product.specImages.length > 0 && (
                <div className="mt-12 w-full">
                    <h3 className="text-xl font-bold mb-6 text-gray-800">Detailed Specifications</h3>
                    <div className="flex gap-4 overflow-x-auto pb-4">
                        {product.specImages.map((src, index) => (
                            <img
                                key={index}
                                src={src}
                                alt={`${product.title} Specification ${index + 1}`}
                                className="min-w-[600px] h-auto object-contain border border-gray-200 rounded-lg bg-white shadow-sm"
                            />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

export default function ProductShowcaseCompareVertical({ products }: ProductShowcaseCompareVerticalProps) {
    return (
        <div className="w-full max-w-7xl mx-auto px-4 lg:px-10 py-16">
            <div className="flex flex-col">
                {products.map((product, index) => (
                    <ProductItemVertical
                        key={product.id}
                        product={product}
                        isLast={index === products.length - 1}
                    />
                ))}
            </div>
        </div>
    );
}
