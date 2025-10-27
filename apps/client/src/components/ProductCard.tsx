"use client";

import { Products } from "@/types";
import { ShoppingCartIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState, memo } from "react";
import useCartStore from "@/store/cartStore";
import { toast } from "react-toastify";

const ProductCard = memo(({ product }: { product: Products }) => {
  const [productTypes, setProductTypes] = useState({
    size: product.sizes ? product.sizes[0] : null,
    color: product.colors[0],
  });

  const { addtoCart } = useCartStore();

  const handlePorductTypeChange = (type: "size" | "color", value: string) => {
    setProductTypes((prev) => ({
      ...prev,
      [type]: value,
    }));
  };

  const hanldeAddToCart = () => {
    addtoCart({
      ...product,
      quantity: 1,
      selectedSize: productTypes.size,
      selectedColor: productTypes.color,
    });
    toast.success("Product added to cart!");
  };

  return (
    <div className="shadow-lg rounde-lg overflow-hidden">
      {/* Image Section */}
      <Link href={`/products/${product.id}`}>
        <div className="relative aspect-[2/3] hover:scale-105 transition-transform duration-300">
          <Image
            src={product.images?.[productTypes.color] || ""}
            alt=""
            fill
            className="object-cover"
          />
        </div>
      </Link>
      {/* Details Section */}
      <div className="flex flex-col gap-4 p-4">
        <h1 className="font-semibold">{product.name}</h1>
        <p className="text-sm text-gray-500">{product.shortDescription}</p>
        {/*Product Types */}
        <div className="flex items-start gap-6 text-xs">
          {product.sizes ? (
            <div className="flex flex-col gap-1">
              <span className="text-gray-500">Sizes</span>
              <select
                name="size"
                id="size"
                className="rounded-md ring-1 ring-gray-300 py-1 px-2"
                onChange={(e) =>
                  handlePorductTypeChange("size", e.target.value)
                }
              >
                {product.sizes.map((size) => (
                  <option key={size} value={size}>
                    {size.toUpperCase()}
                  </option>
                ))}
              </select>
            </div>
          ) : null}
          <div className="flex flex-col gap-1">
            <span className="text-gray-500">Colors</span>
            <div className="flex items-center gap-2">
              {product.colors.map((color) => (
                <div
                  key={color}
                  onClick={() => handlePorductTypeChange("color", color)}
                  className={`rounded-full p-[1.2px] border cursor-pointer ${
                    productTypes.color === color
                      ? "border-gray-500"
                      : "border-gray-300"
                  }`}
                >
                  <div
                    className="rounded-full h-[14px] w-[14px]"
                    style={{ background: color }}
                  ></div>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* Price, Cart Section */}
        <div className="flex items-center justify-between">
          <p className="font-semibold">{product.price.toFixed(2)}€</p>
          <button
            onClick={hanldeAddToCart}
            className="flex items-center gap-1 ring-1 ring-gray-200 shadow-lg cursor-pointer bg-white text-black py-1 px-2 rounded-md hover:bg-black hover:text-white transition-colors duration-300"
          >
            <ShoppingCartIcon className="w-4 h-4" /> Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
});

// Add display name for debugging
ProductCard.displayName = "ProductCard";

export default ProductCard;
