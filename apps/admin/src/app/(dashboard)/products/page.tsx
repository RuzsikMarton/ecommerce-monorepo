import { ProductsType } from "@repo/types";
import { columns} from "./columns";
import { DataTable } from "./data-table";

const getData = async (): Promise<{ data: ProductsType; error?: string }> => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_PRODUCT_SERVICE_URL}/products`
    );

    if (!res.ok) {
      return {
        data: [],
        error: `Failed to fetch products: ${res.status} ${res.statusText}`,
      };
    }

    const response = await res.json();
    return { data: response.products || [] };
  } catch (error) {
    console.error("Failed to fetch products:", error);
    return {
      data: [],
      error:
        error instanceof Error ? error.message : "An unknown error occurred",
    };
  }
};

const ProductsPage = async () => {
  const { data, error } = await getData();

  return (
    <div>
      <div className="mb-8 p-4 bg-secondary rounded-md">
        <h1 className="font-semibold">All Products</h1>
      </div>

      {error && (
        <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-md">
          <p className="font-semibold">Error:</p>
          <p>{error}</p>
        </div>
      )}

      <DataTable columns={columns} data={data} />
    </div>
  );
};

export default ProductsPage;
