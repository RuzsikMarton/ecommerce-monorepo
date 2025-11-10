import { OrderType } from "@repo/types";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import { auth } from "@clerk/nextjs/server";

const getData = async (): Promise<{data: OrderType[], error? : string}> => {
  try {
    const { getToken } = await auth();
    const token = await getToken();
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_ORDER_SERVICE_URL}/orders`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!res.ok) {
      return {
        data: [],
        error: `Failed to fetch orders: ${res.status} ${res.statusText}`,
      };
    }

    const data = await res.json();
    return {data: data || []};
  } catch (error) {
    console.error("Failed to fetch orders:", error);
    return {
      data: [],
      error:
        error instanceof Error ? error.message : "An unknown error occurred",
    };
  }
};

const PaymentsPage = async () => {
  const {data, error} = await getData();

  return (
    <div>
      <div className="mb-8 p-4 bg-secondary rounded-md">
        <h1 className="font-semibold">All Orders</h1>
      </div>
      {error && (<div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-md">
          <p className="font-semibold">Error:</p>
          <p>{error}</p>
        </div>)}
      <DataTable columns={columns} data={data} />
    </div>
  );
};

export default PaymentsPage;
