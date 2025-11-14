import { auth } from "@clerk/nextjs/server";
import { OrderType } from "@repo/types";

const fetchOrders = async () => {
  const { getToken } = await auth();
  const token = await getToken();

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_ORDER_SERVICE_URL}/user-orders`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  const data: OrderType[] = await res.json();
  return data;
};

const OrdersPage = async () => {
  const orders = await fetchOrders();
  console.log(orders);
  if (!orders) {
    return <div className="text-2xl font-semibold flex justify-center text-center text-gray-500 p-8 mx-auto">No orders found.</div>;
  }
  return (
    <div className="px-4 sm:px-8 py-4">
      <h1 className="text-2xl font-semibold my-4">My Orders</h1>
      
      {/* Desktop Header - Hidden on mobile */}
      <div className="hidden md:flex items-center border-b pb-2 mb-4 border-gray-300">
        <div className="w-1/4 font-semibold text-sm text-gray-500">Order #</div>
        <div className="w-1/6 font-semibold text-sm text-gray-500">Total Amount</div>
        <div className="w-1/6 font-semibold text-sm text-gray-500">Status</div>
        <div className="w-1/6 font-semibold text-sm text-gray-500">Date</div>
        <div className="w-1/4 font-semibold text-sm text-gray-500">Products</div>
      </div>
      
      {/* Orders List */}
      <ul className="space-y-4">
        {orders.map((order) => (
          <li key={order._id} className="border border-gray-200 rounded-lg p-4 md:border-0 md:rounded-none md:flex md:items-center md:border-b md:pb-4">
            {/* Mobile Card Layout */}
            <div className="md:hidden space-y-2">
              <div className="flex justify-between items-start">
                <span className="text-xs text-gray-500 font-medium">Order #</span>
                <span className="text-sm break-all text-right ml-2">{order._id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-xs text-gray-500 font-medium">Amount</span>
                <span className="text-sm font-semibold">{order.amount.toFixed(2)}€</span>
              </div>
              <div className="flex justify-between">
                <span className="text-xs text-gray-500 font-medium">Status</span>
                <span className={`text-sm px-2 py-1 rounded ${
                  order.status === 'success' ? 'bg-green-100 text-green-800' :
                  order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                  order.status === 'failed' ? 'bg-red-100 text-red-800' :
                  'bg-gray-100 text-gray-800'
                }`}>{order.status}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-xs text-gray-500 font-medium">Date</span>
                <span className="text-sm">{order.createdAt ? new Date(order.createdAt).toLocaleDateString("sk") : "-"}</span>
              </div>
              <div className="pt-2 border-t border-gray-100">
                <span className="text-xs text-gray-500 font-medium block mb-1">Products</span>
                <span className="text-sm">{order.products?.map((product) => product.name).join(", ") || "-"}</span>
              </div>
            </div>
            
            {/* Desktop Table Layout */}
            <div className="hidden md:flex md:w-full md:items-center">
              <div className="w-1/4">
                <p className="text-sm truncate">{order._id}</p>
              </div>
              <div className="w-1/6">
                <p className="font-semibold">{(order.amount/100).toFixed(2)}€</p>
              </div>
              <div className="w-1/6">
                <span className={`text-sm px-3 py-1 rounded inline-block ${
                  order.status === 'success' ? 'bg-green-100 text-green-800' :
                  order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                  order.status === 'failed' ? 'bg-red-100 text-red-800' :
                  'bg-gray-100 text-gray-800'
                }`}>{order.status}</span>
              </div>
              <div className="w-1/6">
                <p>{order.createdAt ? new Date(order.createdAt).toLocaleDateString("sk") : "-"}</p>
              </div>
              <div className="w-1/4">
                <p className="text-sm">{order.products?.map((product) => product.name).join(", ") || "-"}</p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OrdersPage;
