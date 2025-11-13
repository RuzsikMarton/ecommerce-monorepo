"use client";

import { DataTablePagination } from "@/components/TablePagination";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useAuth } from "@clerk/nextjs";
import { User } from "@clerk/nextjs/server";
import { useMutation } from "@tanstack/react-query";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  SortingState,
  getSortedRowModel,
} from "@tanstack/react-table";
import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [rowSelection, setRowSelection] = useState({});

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onRowSelectionChange: setRowSelection,
    state: { sorting, rowSelection },
  });

  const { getToken } = useAuth();
  const router = useRouter()

  const mutation = useMutation({
    mutationFn: async () => {
      const token = await getToken();
      const selectedRow = table.getSelectedRowModel().rows;
      await Promise.all(
        selectedRow.map(async (row) => {
          const userId = (row.original as User).id;
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_AUTH_SERVICE_URL}/users/${userId}`,
            {
              method: "DELETE",
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          if (!res.ok) {
            throw new Error(`Failed to delete user ${userId}`);
          }
          return res.json();
        })
      );
    },
    onSuccess: () => {
      toast.success("User(s) deleted successfully");
      router.refresh();
    },
    onError: (error) => {
      toast.error(error?.message || "Something went wrong");
    },
  });

  return (
    <div>
      <div className="rounded-md border overflow-hidden">
        <div className="flex justify-end mt-2 mr-2">
          <Button
            disabled={mutation.isPending || Object.keys(rowSelection).length > 0 ? false : true}
            variant={"destructive"}
            onClick={() => mutation.mutate()}
          >
            <Trash2 className="w-4 h-4" />
            {mutation.isPending ? "Deleting..." : "Delete user(s)"}
          </Button>
        </div>
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        <DataTablePagination table={table} />
      </div>
    </div>
  );
}
