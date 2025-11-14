import { CircleAlert, CircleCheck } from "lucide-react";
import Link from "next/link";
import { CartReset } from "@/components/CartReset";

const ReturnPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ session_id: string }> | undefined;
}) => {
  const session_id = (await searchParams)?.session_id;

  if (!session_id) {
    return <div>No session ID provided.</div>;
  }

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_PAYMENT_SERVICE_URL}/session/${session_id}`,
    { cache: "no-store" }
  );
  const data = await res.json();

  if (!res.ok) {
    console.error("Failed to fetch session:", res.status, res.statusText);
    return (
      <div className="flex flex-col justify-center items-center gap-4 mt-6">
        <h1 className="text-2xl font-semibold">Something went wrong</h1>
        <p className="text-gray-500">
          We couldn't load your payment information. Please check your email or
          try again later.
        </p>
        <Link href="/orders" className="bg-gray-800 hover:bg-gray-900 text-white px-2 py-1 rounded-md cursor-pointer flex items-center justify-center gap-2 transition duration-300">
          See your orders
        </Link>
        <Link href="/" className="bg-gray-800 hover:bg-gray-900 text-white px-2 py-1 rounded-md cursor-pointer flex items-center justify-center gap-2 transition duration-300">
          Go back home
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-center items-center gap-12 mt-6">
      <CartReset status={data.status} />
      <div className="flex flex-col items-center text-4xl font-semibold text-center p-4 gap-4">
        {data.status === "complete" ? (
          <CircleCheck className="w-32 h-32 text-green-400" />
        ) : (
          <CircleAlert className="w-32 h-32 text-yellow-400" />
        )}
        <h1>Thank you for your order.</h1>
        <h1> Payment {data.status}!</h1>
        <p className="text-gray-500 font-light text-lg">
          Payment status: {data.paymentStatus}
        </p>
      </div>
      <Link
        href={"/orders"}
        className="text-xl bg-gray-800 hover:bg-gray-900 text-white px-4 py-2 rounded-md cursor-pointer flex items-center justify-center gap-2 transition duration-300"
      >
        See your orders.
      </Link>
    </div>
  );
};

export default ReturnPage;
