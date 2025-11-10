import { auth, User } from "@clerk/nextjs/server";
import { columns } from "./columns";
import { DataTable } from "./data-table";

const getData = async (): Promise<{ data: User[]; totalCount: number; error?: string }> => {
  const { getToken } = await auth();
  const token = await getToken();
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_AUTH_SERVICE_URL}/users`,
      { 
        headers: { 
          Authorization: `Bearer ${token}` 
        } 
      }
    );

    if (!res.ok) {
      return {
        data: [],
        totalCount: 0,
        error: `Failed to fetch users: ${res.status} ${res.statusText}`,
      };
    };
    const response = await res.json();

    return { 
      data: response.data || [], 
      totalCount: response.totalCount || 0 
    };
  } catch (error) {
    console.error("Failed to fetch users:", error);
    return {
      data: [],
      totalCount: 0,
      error:
        error instanceof Error ? error.message : "An unknown error occurred",
    };
  }
};

const UsersPage = async () => {
  const { data, error } = await getData();
  console.log("Fetched users:", data);

  return (
    <div>
      <div className="mb-8 p-4 bg-secondary rounded-md">
        <h1 className="font-semibold">Users</h1>
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

export default UsersPage;
