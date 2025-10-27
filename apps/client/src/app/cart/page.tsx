"use client";

import { useState } from "react";
import Image from "next/image";
import PaymentForm from "@/components/PaymentForm";
import ShippingForm from "@/components/ShippingForm";
import { shippingFormInputs } from "@/types";
import { ArrowRight, Trash2 } from "lucide-react";
import { useSearchParams, useRouter } from "next/navigation";
import useCartStore from "@/store/cartStore";

const steps = [
  { id: 1, title: "Shopping Cart" },
  { id: 2, title: "Shipping Information" },
  { id: 3, title: "Payment Method" },
];

const CartPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [shippingForm, setShippingForm] = useState<shippingFormInputs | null>(null);

  const {cart, removeFromCart} = useCartStore();

  const activeStep = parseInt(searchParams.get("step") || "1");
  return (
    <div className="mx-auto p-4 sm:px-0 sm:max-w-xl md:max-w-2xl lg:max-w-5xl xl:max-w-7xl">
      <div className="flex flex-col items-center mt-8">
        <h1 className="text-2xl font-semibold mb-6">Your Shopping Cart</h1>
        {/* Steps Indicator */}
        <div className="flex flex-col lg:flex-row items-center mb-8 w-full gap-8 lg:gap-16 justify-center">
          {steps.map((step) => (
            <div
              key={step.id}
              className={`flex gap-2 items-center border-b-2 pb-2 ${
                step.id === activeStep
                  ? "border-gray-800 text-gray-800"
                  : "border-gray-300 text-gray-400"
              }`}
            >
              <div
                className={`w-6 h-6 p-2 rounded-full flex items-center justify-center text-white font-semibold ${
                  step.id === activeStep ? "bg-gray-800" : "bg-gray-300"
                }`}
              >
                {step.id}
              </div>
              <div>{step.title}</div>
            </div>
          ))}
        </div>
        {/* Content */}
        <div className="w-full flex flex-col lg:flex-row gap-12">
          {/* Steps */}
          <div className="w-full lg:w-7/12 shadow-lg border-1 border-gray-200 p-6 rounded-lg flex flex-col gap-8">
            {activeStep === 1 ? (
              cart.map((item) => (
                <div
                  className="flex justify-between items-center"
                  key={item.id+item.selectedColor+item.selectedSize}
                >
                  {/*Image and Details */}
                  <div className="flex gap-8">
                    <div className="relative w-32 h-32 bg-gray-50 rounded-lg overflow-hidden">
                      <Image
                        src={item.images?.[item.selectedColor] || ""}
                        alt={item.name}
                        fill
                        className="object-contain"
                      />
                    </div>
                    <div className="flex flex-col justify-between">
                      <div className="flex flex-col">
                        <h2 className="text-sm font-semibold text-gray-800">{item.name}</h2>
                        <p className="text-xs text-gray-500">Quantity: {item.quantity}</p>
                        {item.selectedSize && <p className="text-xs text-gray-500">Size: {item.selectedSize?.toUpperCase()}</p>}
                        <p className="text-xs text-gray-500">Color: {item.selectedColor}</p>
                      </div>
                      <p className="text-gray-800 font-medium">
                        {item.price.toFixed(2)}
                      </p>
                    </div>
                  </div>
                  {/*Delete button*/}
                  <button onClick={() => removeFromCart(item)} className="flex justify-center items-center bg-red-100 text-red-400 rounded-full w-8 h-8 cursor-pointer hover:bg-red-200 hover:text-red-500 transition duration-300">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))
            ) : activeStep === 2 ? (
              <ShippingForm setShippingForm={setShippingForm}/>
            ) : activeStep === 3 && shippingForm ? (
              <PaymentForm />
            ) : (
              <p className="text-sm text-red-400">
                Please fill in the shipping form to continue!
              </p>
            )}
          </div>
          {/* Summary */}
          <div className="w-full lg:w-5/12 shadow-lg border-1 border-gray-200 p-6 rounded-lg flex flex-col gap-8 h-max">
            <h2 className="font-semibold">Cart Details</h2>
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">Subtotal</span>
                <span className="font-semibold">
                  {cart
                    .reduce((acc, item) => acc + item.price * item.quantity, 0)
                    .toFixed(2)}€
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">Discount (10%)</span>
                <span className="font-semibold text-red-500">-10%</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">Shipping fee</span>
                <span className="font-semibold">10%</span>
              </div>
              <hr className="text-gray-300" />
              <div className="flex items-center justify-between">
                <span className="font-semibold">Total</span>
                <span className="font-semibold">
                  {cart
                    .reduce((acc, item) => acc + item.price * item.quantity, 0)
                    .toFixed(2)}€
                </span>
              </div>
            </div>
            {activeStep === 1 && (
              <button
                onClick={() => router.push("/cart?step=2", { scroll: false })}
                className="w-full bg-gray-800 hover:bg-gray-900 text-white p-2 rounded-md cursor-pointer flex items-center justify-center gap-2 transition duration-300"
              >
                Continue
                <ArrowRight className="w-3 h-3" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
