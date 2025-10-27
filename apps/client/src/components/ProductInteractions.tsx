"use client";

import useCartStore from "@/store/cartStore";
import { Products } from "@/types";
import { Minus, Plus, ShoppingCart } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

const ProductInteractions = ({
  product,
  selectedSize,
  selectedColor,
}: {
  product: Products;
  selectedSize: string | null;
  selectedColor: string;
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [quantity, setQuantity] = useState(1);

  const {addtoCart} = useCartStore();

  const handleQuantityChange = (action: "increment" | "decrement") => {
    if(action === "increment") {
      setQuantity((prev) => prev + 1);
    } else {
      if(quantity > 1) {
        setQuantity((prev) => prev - 1);
      }
    }
  }

  const handleTypeChange = (type: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set(type, value);
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

   const handleAddToCart = () => {
    addtoCart({
      ...product,
      quantity,
      selectedSize,
      selectedColor,
    });
    toast.success("Product added to cart!");
  };

  return (
    <div className="flex flex-col gap-4 mt-4">
      {/* Size Selection */}
      {product.sizes && (
        <div className="flex flex-col gap-2 text-sm">
          <span className="text-gray-500 font-medium">Size:</span>
          <div className="flex items-center gap-2">
            {product.sizes.map((size) => (
              <div
                className={`cursor-pointer border-1 p-[2px] ${
                  size === selectedSize ? "border-gray-600" : "border-gray-300"
                }`}
                key={size}
                onClick={() => handleTypeChange("size", size)}
              >
                <div
                  className={`w-6 h-6 text-center flex items-center justify-center text-xs font-medium ${
                    size === selectedSize
                      ? "bg-black text-white"
                      : "bg-white text-gray-800"
                  }`}
                >
                  {size.toUpperCase()}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      {/* Color Selection */}
      <div className="flex flex-col gap-2 text-sm">
        <span className="text-gray-500 font-medium">Color:</span>
        <div className="flex gap-2">
          {product.colors.map((color) => (
            <div
              key={color}
              className={`flex items-center justify-center cursor-pointer border-1 p-[2px] ${
                color === selectedColor ? "border-gray-600" : "border-gray-300"
              }`}
              onClick={() => handleTypeChange("color", color)}
            >
              <div className="w-6 h-6" style={{ background: color }}></div>
            </div>
          ))}
        </div>
      </div>
      {/* Quantity Selection */}
      <div className="flex flex-col gap-2 text-sm">
        <span className="text-gray-500">Quantity:</span>
        <div className="flex items-center font-semibold">
          <button onClick={() => handleQuantityChange("decrement")} className="flex items-center justify-center border-1 p-1 border-gray-300 cursor-pointer">
            <Minus className="w-4 h-4" />
          </button>
          <span className="w-8 flex justify-center">{quantity}</span>
          <button onClick={() => handleQuantityChange("increment")} className="flex items-center justify-center border-1 p-1 border-gray-300 cursor-pointer">
            <Plus className="w-4 h-4" />
          </button>
        </div>
      </div>
      {/* Action Buttons */}
      <div className="flex flex-col gap-4 mt-4 text-sm font-medium">
        <button className="bg-black font-semibold text-white rounded-md shadow-lg hover:bg-gray-800 transition flex items-center justify-center gap-2 px-4 py-2 cursor-pointer" onClick={handleAddToCart}>
          <Plus className="w-4 h-4" />
          Add to Cart
        </button>
        <button className="ring-1 ring-black text-black rounded-md shadow-lg hover:bg-gray-100 transition flex items-center justify-center gap-2 px-4 py-2 cursor-pointer">
          <ShoppingCart className="w-4 h-4" />
          Buy Now
        </button>
      </div>
    </div>
  );
};

export default ProductInteractions;
