import { useState } from "react";
import { addItem } from "../store/enquiryStore";
import toast from "react-hot-toast";

export interface ProductData {
    id: string; // Used for the key and store ID
    title: string;
    description: string; // A short description for the list store
    images: string[]; // Array of product showcase images (RL_1.jpg, RL_2.jpg)
    technicalDataImages: string[]; // Array of technical data images (RL_Details.png, and others)
    specImages?: string[]; // Optional array of specification images (tables etc)
    applicationData: string; // e.g., "RR-T03, RR-B04"
}

interface ProductShowcaseCompareProps {
    products: [ProductData, ProductData]; // Expecting an array of exactly two products
}

const ProductItem = ({ product }: { product: ProductData }) => {
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
        <div className="w-full p-4 rounded-lg border shadow-2xl">
            {/* Product Name */}
            <h2 className="text-2xl font-bold mb-4 text-center">{product.title}</h2>
            
            {/* Main Product Image Display */}
            <div className="w-full bg-gray-100 overflow-hidden flex items-center justify-center h-64 mb-4">
                <img 
                    src={product.images[currentImageIndex]} 
                    alt={product.title} 
                    className="object-contain p-2 w-full h-full" 
                />
            </div>
            
            {/* Image Thumbnails/Dots (for switching) */}
            <div className="flex flex-wrap gap-2 justify-center mb-6">
                {product.images.map((img, idx) => (
                    <button
                        key={idx}
                        onClick={() => setCurrentImageIndex(idx)}
                        className={`w-16 h-16 border-2 overflow-hidden transition ${currentImageIndex === idx ? "border-blue-600" : "border-gray-300"}`}
                    >
                        <img src={img} className="object-contain p-1 w-full h-full" />
                    </button>
                ))}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-2 pt-2 justify-center text-sm">
                <button onClick={handleAddToList} className="flex items-center gap-1 px-3 py-1 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors">
                    + Add to List
                </button>
                <button onClick={handleEnquireNow} className="flex items-center gap-1 px-3 py-1 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors">
                    Enquire Now
                </button>
                <button onClick={handleDownloadBrochure} className="flex items-center gap-1 px-3 py-1 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors">
                    Download Brochure
                </button>
            </div>
            
            <hr className="my-6 border-gray-300" />
            
            {/* Technical Data Images Section */}
            <h3 className="text-lg font-semibold mb-3">Technical Details</h3>
            
            <div className="space-y-4">
                {product.technicalDataImages.map((src, index) => (
                    <img 
                        key={index}
                        src={src} 
                        alt={`${product.title} Technical Detail ${index + 1}`} 
                        className="w-full h-auto object-contain border p-2 bg-white" 
                    />
                ))}
            </div>
        </div>
    );
}

export default function ProductShowcaseCompare({ products }: ProductShowcaseCompareProps) {
    return (
        <div className="w-full max-w-7xl mx-auto px-4 lg:px-10 py-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {products.map((product) => (
                    <ProductItem key={product.id} product={product} />
                ))}
            </div>
        </div>
    );
}