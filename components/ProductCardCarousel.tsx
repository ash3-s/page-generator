import ProductCard from "./ProductCard";
import React, { useState } from "react";

interface Product {
  name: string;
  description: string;
  imageUrl: string;
  targetPage?: string;
}
const ProductCardCarousel = ({ products }: { products: Product[] }) => {
  const [curr, setCurr] = useState(0);
  const prev = () => {
    setCurr(curr === 0 ? 0 : curr - 1);
  };
  const next = () => {
    // On large screens, 4.5 items are visible at once
    // We should stop scrolling when we reach the last 4 items
    const maxScroll = Math.max(0, products.length - 4);
    setCurr(curr >= maxScroll ? maxScroll : curr + 1);
  };
  return (
    <div className="flex justify-start my-8 relative">
      <div className="grid grid-cols-1 gap-4 text-left sm:grid-cols-2 lg:flex overflow-hidden p-4">
        {products.map((product: Product) => (
          <div
            key={product.name}
            className="lg:transition-transform lg:duration-500 lg:ease-in-out lg:w-64 lg:shrink-0"
            style={{ transform: `translateX(-${curr * 100}%)` }}
          >
            <ProductCard productInfo={product} />
          </div>
        ))}
      </div>
      {products.length > 5 && (
        <div className="hidden absolute inset-0 lg:flex lg:justify-between pointer-events-none lg:items-center">
          <button
            className="rounded-4xl bg-gray-200 w-12 h-12 flex items-center justify-center cursor-pointer pointer-events-auto shadow-md hover:bg-gray-300 transition-colors"
            onClick={prev}
            disabled={curr === 0}
          >
            <img src="/chevron-left-black.svg" alt="prev" />
          </button>
          <button
            className="rounded-4xl bg-gray-200 w-12 h-12 flex items-center justify-center cursor-pointer pointer-events-auto shadow-md hover:bg-gray-300 transition-colors"
            onClick={next}
            disabled={curr === Math.max(0, products.length - 4)}
          >
            <img src="/chevron-right-black.svg" alt="next" />
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductCardCarousel;
