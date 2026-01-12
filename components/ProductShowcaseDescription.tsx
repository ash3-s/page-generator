import { useState } from "react";
import { addItem } from "../store/enquiryStore";
import toast from "react-hot-toast";

interface ProductShowcaseDescriptionProps {
    images: string[];
    title: string;
    description: string[];
    partNumbers?: string[];
    pdfLinks?: string[];
}

export default function ProductShowcaseDescription({ images, title, description, partNumbers = [], pdfLinks }: ProductShowcaseDescriptionProps) {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const handleAddToList = () => {
        const selectedPartNumber = partNumbers[currentImageIndex];
        const itemTitle = selectedPartNumber
            ? `${title} - Part No: ${selectedPartNumber}`
            : title;

        addItem({
            id: itemTitle,
            title: itemTitle,
            description: description.join(" "),
            image: images[currentImageIndex] || images[0],
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
                {/* Part Number Display */}

                {partNumbers[currentImageIndex] && (
                    <div className="flex justify-center mt-2 mb-4">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800 border border-gray-200">
                            Part No: {partNumbers[currentImageIndex]}
                        </span>
                    </div>
                )}


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
            <div className="flex flex-col justify-between">
                {/* <h1 className="text-3xl md:text-5xl font-bold">{title}</h1> */}

                <div className="flex flex-col gap-2">
                    {description.map((desc, index) => (
                        <p key={index} className="text-gray-700 leading-relaxed text-sm md:text-base font-medium">
                            {desc}
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
                    {pdfLinks && pdfLinks[currentImageIndex] && (
                        <a
                            href={pdfLinks[currentImageIndex]}
                            download
                            className="flex items-center gap-2 px-6 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors cursor-pointer text-black no-underline"
                        >
                            <img src="/download.svg" className="w-4 h-4" /> Download Brochure
                        </a>
                    )}
                    {!pdfLinks && (
                        <button onClick={handleEnquireNow} className="flex items-center gap-2 px-6 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors cursor-pointer">
                            <img src="/download.svg" className="w-4 h-4" /> Download Brochure
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}
