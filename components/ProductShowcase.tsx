import { useState } from "react";
import { addItem } from "../store/enquiryStore";
import toast from "react-hot-toast";

interface ProductShowcaseProps {
    images: string[];
    title: string;
    technicalData: string;
    description: string;
}

export default function ProductShowcase({ images, title, technicalData, description }: ProductShowcaseProps) {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const handleAddToList = () => {
        addItem({
            id: title, // Using title as ID for now as it seems unique enough in this context
            title,
            description,
            image: images[0],
        });
        toast.success("Added to list!");
    };

    const handleEnquireNow = () => {
        handleAddToList();
        window.location.href = "/enquiry";
    };

    return (
        <div className="w-full max-w-7xl mx-auto px-4 lg:px-10 py-6 grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left - Images */}
            <div>
                <div className="w-full bg-gray-100 overflow-hidden flex items-center justify-center h-48 md:h-64">
                    <img src={images[currentImageIndex]} className="object-contain p-4 w-full h-full" />
                </div>


                {/* Thumbnails */}
                <div className="flex flex-wrap gap-3 mt-4">
                    {images.map((img, idx) => (
                        <button
                            key={idx}
                            onClick={() => setCurrentImageIndex(idx)}
                            className={`w-20 h-20 border-2 overflow-hidden transition ${currentImageIndex === idx ? "border-brand-color" : "border-gray-300"}`}
                        >
                            <img src={img} className="object-contain p-2 w-full h-full" />
                        </button>
                    ))}
                </div>


                {/* Dots */}
                <div className="flex gap-2 justify-center mt-4">
                    {images.map((_, idx) => (
                        <button
                            key={idx}
                            onClick={() => setCurrentImageIndex(idx)}
                            className={`w-3 h-3 rounded-full ${currentImageIndex === idx ? "bg-blue-600" : "bg-gray-300"}`}
                        />
                    ))}
                </div>
            </div>


            {/* Right - Text */}
            <div className="flex flex-col gap-4">
                {/* <h1 className="text-3xl md:text-5xl font-bold">{title}</h1> */}


                {/* <p className="text-gray-700 leading-relaxed text-sm md:text-base">{description}</p> */}
                {/* <p className="text-gray-700 leading-relaxed text-sm md:text-base">{description}</p> */}
                <img src={technicalData} alt="Technical Data" className="w-full h-64 object-contain" />

                <div className="flex gap-3 pt-2">
                    <button onClick={handleAddToList} className="flex items-center gap-2 px-6 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors cursor-pointer">
                        + Add to List
                    </button>
                    <button onClick={handleEnquireNow} className="flex items-center gap-2 px-6 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors cursor-pointer">
                        <img src="/enquire.svg" className="w-4 h-4" /> Enquire now
                    </button>
                    <button onClick={handleEnquireNow} className="flex items-center gap-2 px-6 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors cursor-pointer">
                        <img src="/download.svg" className="w-4 h-4" /> Download Brochure
                    </button>
                </div>
            </div>
        </div>
    );
}

interface ProductShowcaseDescriptionProps {
    images: string[];
    title: string;
    description: string[];
    partNumbers?: string[];
}

export function ProductShowcaseDescription({ images, title, description, partNumbers }: ProductShowcaseDescriptionProps) {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const handleAddToList = () => {
        let itemTitle = title;
        let itemId = title;

        if (partNumbers && partNumbers[currentImageIndex]) {
            const partNo = partNumbers[currentImageIndex];
            itemTitle = `${title} - Part No: ${partNo}`;
            itemId = itemTitle;
        }

        addItem({
            id: itemId,
            title: itemTitle,
            description: description.join("\n"),
            image: images[currentImageIndex],
        });
        toast.success("Added to list!");
    };

    const handleEnquireNow = () => {
        handleAddToList();
        window.location.href = "/enquiry";
    };

    return (
        <div className="w-full max-w-7xl mx-auto px-4 lg:px-10 py-6 grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left - Images */}
            <div>
                <div className="w-full bg-gray-100 overflow-hidden flex items-center justify-center h-48 md:h-64 flex-col gap-4 p-4">
                    <img src={images[currentImageIndex]} className="object-contain w-full h-full max-h-[80%]" />

                </div>


                {/* Part Number Pill */}
                {partNumbers && partNumbers[currentImageIndex] && (
                    <div className="flex justify-center mt-2 mb-2">
                        <span className="bg-gray-100 text-gray-800 px-4 py-1 rounded-full text-sm font-medium border border-gray-200">
                            Part No: {partNumbers[currentImageIndex]}
                        </span>
                    </div>
                )}

                {/* Thumbnails */}
                <div className="flex flex-wrap gap-3 mt-4 justify-center">
                    {images.map((img, idx) => (
                        <button
                            key={idx}
                            onClick={() => setCurrentImageIndex(idx)}
                            className={`w-20 h-20 border-2 overflow-hidden transition ${currentImageIndex === idx ? "border-brand-color" : "border-gray-300"}`}
                        >
                            <img src={img} className="object-contain p-2 w-full h-full" />
                        </button>
                    ))}
                </div>


                {/* Dots */}
                <div className="flex gap-2 justify-center mt-4">
                    {images.map((_, idx) => (
                        <button
                            key={idx}
                            onClick={() => setCurrentImageIndex(idx)}
                            className={`w-3 h-3 rounded-full ${currentImageIndex === idx ? "bg-blue-600" : "bg-gray-300"}`}
                        />
                    ))}
                </div>
            </div>


            {/* Right - Text */}
            <div className="flex flex-col gap-4">
                {/* <h1 className="text-3xl md:text-5xl font-bold">{title}</h1> */}

                <div className="flex flex-col gap-4">
                    {description.map((paragraph, idx) => (
                        <p key={idx} className="text-gray-700 leading-relaxed text-sm md:text-base">
                            {paragraph}
                        </p>
                    ))}
                </div>

                <div className="flex gap-3 pt-2">
                    <button onClick={handleAddToList} className="flex items-center gap-2 px-6 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors cursor-pointer">
                        + Add to List
                    </button>
                    <button onClick={handleEnquireNow} className="flex items-center gap-2 px-6 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors cursor-pointer">
                        <img src="/enquire.svg" className="w-4 h-4" /> Enquire now
                    </button>
                    <button onClick={handleEnquireNow} className="flex items-center gap-2 px-6 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors cursor-pointer">
                        <img src="/download.svg" className="w-4 h-4" /> Download Brochure
                    </button>
                </div>
            </div>
        </div>
    );
}