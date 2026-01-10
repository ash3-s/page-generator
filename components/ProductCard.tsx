import React from "react";

interface ProductCardProps {
  name: string;
  description: string;
  imageUrl: string;
  targetPage?: string;
}
const ProductCard = ({ productInfo }: { productInfo: ProductCardProps }) => {
  return (
    <div className="w-full h-56 shrink-0 shadow-lg bg-white">
      <a href={productInfo.targetPage}>
        <div className="relative w-full h-full text-white overflow-hidden group cursor-pointer">
          <img
            src={productInfo.imageUrl}
            alt={productInfo.name}
            className="w-full h-full object-contain p-2 transition duration-300 ease-in-out"
          />
          <div className="absolute inset-0 bg-linear-to-t from-brand-color via-brand-color/70 to-transparent opacity-0 translate-y-full group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 ease-in-out"></div>
          <div className="absolute inset-0 p-4 opacity-0 translate-y-full group-hover:opacity-100 group-hover:translate-y-2/5 transition-all duration-300 ease-in-out">
            <h3 className="text-md sm:text-lg font-semibold">
              {productInfo.name}
            </h3>
            <p className="text-xs sm:text-sm ">{productInfo.description}</p>
          </div>
        </div>
      </a>
    </div>
  );
};

export default ProductCard;
