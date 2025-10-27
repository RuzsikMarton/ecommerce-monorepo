import { paymentFormInputs, paymentFormSchema } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { ShoppingCartIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";

const PaymentForm = () => {
   const {register, handleSubmit, formState:{errors}} = useForm<paymentFormInputs>({
    resolver: zodResolver(paymentFormSchema),
  });

  const router = useRouter();

  const handlepaymentForm:SubmitHandler<paymentFormInputs> = (data) => {
    
  }

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit(handlepaymentForm)}>
      <div className="flex flex-col gap-1">
        <label htmlFor="cardHolder" className="text-xs text-gray-500 font-medium">Name on card</label>
        <input type="text" id="cardHolder" placeholder="Full name here" {...register("cardHolder")} className="text-sm text-gray-800 border-b border-gray-200 outline-0 py-2"></input>
        {errors.cardHolder && <p className="text-xs text-red-500">{errors.cardHolder.message}</p>}
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="cardNumber" className="text-xs text-gray-500 font-medium">Card Number</label>
        <input type="text" id="cardNumber" placeholder="1234 5678 9876 5432" {...register("cardNumber")} className="text-sm text-gray-800 border-b border-gray-200 outline-0 py-2"></input>
        {errors.cardNumber && <p className="text-xs text-red-500">{errors.cardNumber.message}</p>}
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="expirationDate" className="text-xs text-gray-500 font-medium">Expiration Date</label>
        <input type="text" id="expirationDate" placeholder="MM/YYYY" {...register("expirationDate")} className="text-sm text-gray-800 border-b border-gray-200 outline-0 py-2"></input>
        {errors.expirationDate && <p className="text-xs text-red-500">{errors.expirationDate.message}</p>}
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="cvv" className="text-xs text-gray-500 font-medium">CVV</label>
        <input type="text" id="cvv" placeholder="123" {...register("cvv")} className="text-sm text-gray-800 border-b border-gray-200 outline-0 py-2"></input>
        {errors.cvv && <p className="text-xs text-red-500">{errors.cvv.message}</p>}
      </div>
      <div className="flex items-center gap-2 mt-4">
        <Image src={"/klarna.png"} alt="klarna" width={50} height={25} className="rounded-md"/>
        <Image src={"/cards.png"} alt="cards" width={50} height={25} className="rounded-md"/>
        <Image src={"/stripe.png"} alt="stripe" width={50} height={25} className="rounded-md"/>
      </div>
      <button type="submit" className="w-full bg-gray-800 hover:bg-gray-900 text-white p-2 rounded-md cursor-pointer flex items-center justify-center gap-2 transition duration-300">Checkout <ShoppingCartIcon className="w-3 h-3"/></button>
    </form>)
}

export default PaymentForm