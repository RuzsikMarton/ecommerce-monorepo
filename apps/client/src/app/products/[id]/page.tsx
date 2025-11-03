import ProductInteractions from "@/components/ProductInteractions";
import { ProductType } from "@repo/types";
import Image from "next/image";

const product: ProductType = {
  id: 1,
  name: "Adidas CoreFit T-Shirt",
  shortDescription:
    "Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.",
  description:
    "Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.",
  price: 39.9,
  sizes: ["s", "m", "l", "xl", "xxl"],
  colors: ["gray", "purple", "green"],
  images: {
    gray: "/products/1g.png",
    purple: "/products/1p.png",
    green: "/products/1gr.png",
  },
  categorySlug: "t-shirts",
  createdAt: new Date(),
  updatedAt: new Date(),
};

export const generateMetadata = async ({params} : {params:{id:string}}) => {
  //todo: get data from db or api
  return {
    title: product.name,
    description: product.shortDescription,
  };
};

const ProductPage = async ({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ color: string; size?: string }>;
}) => {
  const {size, color} = await searchParams;

  const selectedSize = product.sizes?.length ? size || product.sizes[0] : null;
  const selectedColor = color || "gray";
  return (
    <div className="mx-auto p-4 sm:px-0 sm:max-w-xl md:max-w-2xl lg:max-w-5xl xl:max-w-7xl">
      <div className="flex flex-col lg:flex-row justify-between gap-4 md:gap-12 mt-12">
        {/*Image*/}
        <div className="w-full lg:w-5/12 aspect-2/3 relative">
          <Image
            src={(product.images as Record<string, string>)?.[selectedColor] || ""}
            alt={product.name}
            fill
            className="object-contain rounded-md"
          />
        </div>
        {/*Details*/}
        <div className="w-full lg:w-7/12 gap-6 flex flex-col">
          <h1 className="text-2xl font-semibold mb-2">{product.name}</h1>
          <span className="text-gray-500">{product.description}</span>
          <span className="text-2xl font-semibold">
            {product.price.toFixed(2)}€
          </span>
          <ProductInteractions
            product={product}
            selectedSize={selectedSize || ""}
            selectedColor={selectedColor}
          />
          <div className="flex items-center gap-4">
            <Image
              src={"/klarna.png"}
              alt="Klarna Logo"
              width={75}
              height={20}
              className="object-contain rounded-md"
            />
            <Image
              src={"/cards.png"}
              alt="Cards Logo"
              width={75}
              height={20}
              className="object-contain rounded-md"
            />
            <Image
              src={"/stripe.png"}
              alt="Stripe Logo"
              width={75}
              height={20}
              className="object-contain rounded-md"
            />
          </div>
          <p className="text-gray-500 text-xs">
            By clicking on Pay now you agree to our{" "}
            <span className="underline hover:text-black">
              Terms and conditions
            </span>{" "}
            and{" "}
            <span className="underline hover:text-black">Privacy Policy</span>.
            You authorize us to charge your selected payment method for the
            total amount shown. All sales are subject to our return and{" "}
            <span className="underline hover:text-black">Refund Policies</span>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
