import { shippingFormInputs, shippingFormSchema } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form"

const ShippingForm = ({setShippingForm}:{setShippingForm:(data:shippingFormInputs) => void}) => {
  const {register, handleSubmit, formState:{errors}} = useForm<shippingFormInputs>({
    resolver: zodResolver(shippingFormSchema),
  });

  const router = useRouter();

  const handleShippingForm:SubmitHandler<shippingFormInputs> = (data) => {
    setShippingForm(data);
    router.push("/cart?step=3", {scroll: false});
  }

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit(handleShippingForm)}>
      <div className="flex flex-col gap-1">
        <label htmlFor="name" className="text-xs text-gray-500 font-medium">Full Name</label>
        <input type="text" id="name" placeholder="Full name here" {...register("name")} className="text-sm text-gray-800 border-b border-gray-200 outline-0 py-2"></input>
        {errors.name && <p className="text-xs text-red-500">{errors.name.message}</p>}
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="email" className="text-xs text-gray-500 font-medium">Email</label>
        <input type="email" id="email" placeholder="email@example.com" {...register("email")} className="text-sm text-gray-800 border-b border-gray-200 outline-0 py-2"></input>
        {errors.email && <p className="text-xs text-red-500">{errors.email.message}</p>}
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="phone" className="text-xs text-gray-500 font-medium">Phone</label>
        <input type="text" id="phone" placeholder="123456789" {...register("phone")} className="text-sm text-gray-800 border-b border-gray-200 outline-0 py-2"></input>
        {errors.phone && <p className="text-xs text-red-500">{errors.phone.message}</p>}
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="address" className="text-xs text-gray-500 font-medium">Address</label>
        <input type="text" id="address" placeholder="123 Main St, Anytown" {...register("address")} className="text-sm text-gray-800 border-b border-gray-200 outline-0 py-2"></input>
        {errors.address && <p className="text-xs text-red-500">{errors.address.message}</p>}
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="city" className="text-xs text-gray-500 font-medium">City</label>
        <input type="text" id="city" placeholder="New York" {...register("city")} className="text-sm text-gray-800 border-b border-gray-200 outline-0 py-2"></input>
        {errors.city && <p className="text-xs text-red-500">{errors.city.message}</p>}
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="postalCode" className="text-xs text-gray-500 font-medium">Postal Code</label>
        <input type="text" id="postalCode" placeholder="987 65" {...register("postalCode")} className="text-sm text-gray-800 border-b border-gray-200 outline-0 py-2"></input>
        {errors.postalCode && <p className="text-xs text-red-500">{errors.postalCode.message}</p>}
      </div>
      <button type="submit" className="w-full bg-gray-800 hover:bg-gray-900 text-white p-2 rounded-md cursor-pointer flex items-center justify-center gap-2 transition duration-300">Continue <ArrowRight className="w-3 h-3" /> </button>
    </form>
  )
}

export default ShippingForm