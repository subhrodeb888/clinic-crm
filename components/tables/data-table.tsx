"use client";

import { useState } from "react";

import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  SortingState,
  ColumnFiltersState,
  ColumnDef,
} from "@tanstack/react-table";

type DataTableProps<TData> = {
  columns: ColumnDef<TData>[];

  data: TData[];

  toolbar?: (table: ReturnType<typeof useReactTable<TData>>) => React.ReactNode;

  onRowClick?: (row: TData) => void;
};

export function DataTable<TData>({
  columns,
  data,
  toolbar,
  onRowClick,
}: DataTableProps<TData>) {
  const [sorting, setSorting] = useState<SortingState>([]);

  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const table = useReactTable({
    data,
    columns,

    state: {
      sorting,
      columnFilters,
    },

    onSortingChange: setSorting,

    onColumnFiltersChange: setColumnFilters,

    getCoreRowModel: getCoreRowModel(),

    getSortedRowModel: getSortedRowModel(),

    getFilteredRowModel: getFilteredRowModel(),

    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div>
      {/* TOOLBAR */}

      {toolbar?.(table)}

      {/* TABLE */}

      <div
        className="
          overflow-hidden rounded-xl
          border border-gray-200 bg-white
        "
      >
        <table className="w-full border-collapse">
          {/* TABLE HEADER */}

          <thead className="bg-gray-50">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="
                          px-4 py-3 text-left
                          text-xs font-semibold
                          uppercase tracking-wide
                          text-gray-500
                        "
                  >
                    {header.isPlaceholder ? null : (
                      <div
                        className="
                              flex cursor-pointer
                              select-none items-center gap-2
                            "
                        onClick={header.column.getToggleSortingHandler()}
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}

                        {{
                          asc: "↑",
                          desc: "↓",
                        }[header.column.getIsSorted() as string] ?? null}
                      </div>
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>

          {/* TABLE BODY */}

          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr
                key={row.id}
                onClick={() => onRowClick?.(row.original)}
                className="
                    cursor-pointer
                    border-t border-gray-100
                    transition-colors
                    hover:bg-gray-50
                  "
              >
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    className="
                          px-4 py-4 text-sm
                          text-gray-700
                        "
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>

        {/* PAGINATION */}

        <div
          className="
            flex items-center justify-between
            border-t border-gray-200
            bg-white px-4 py-3
          "
        >
          <p className="text-sm text-gray-500">
            Showing {table.getRowModel().rows.length} rows
          </p>

          <div className="flex items-center gap-2">
            <button
              className="
                rounded-lg border border-gray-300
                px-3 py-2 text-sm
                transition-colors
                hover:bg-gray-50
                disabled:cursor-not-allowed
                disabled:opacity-50
              "
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              Previous
            </button>

            <button
              className="
                rounded-lg border border-gray-300
                px-3 py-2 text-sm
                transition-colors
                hover:bg-gray-50
                disabled:cursor-not-allowed
                disabled:opacity-50
              "
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
