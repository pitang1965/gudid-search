import React from 'react';
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import './App.css';

export type Udi = {
  id: string;
  brandName: string;
  productCode: string;
  productName: string;
  gmdnName: string;
  publishDate: string;
};

export type Props = {
  data: Udi[];
};

const columns: ColumnDef<Udi>[] = [
  {
    accessorKey: 'id',
    header: () => 'UDI-DI',
  },
  {
    accessorKey: 'brandName',
    header: () => 'Brand Name',
  },
  {
    header: 'Product Code',
    columns: [
      {
        accessorKey: 'productCode',
        header: () => 'Code',
      },
      {
        accessorKey: 'productName',
        header: () => 'Name',
      },
    ],
  },
  {
    accessorKey: 'gmdnName',
    header: () => 'GMDN Name',
  },
  {
    accessorKey: 'publishDate',
    header: () => 'Date',
  },
];

export default function UdiTable({ data }: Props) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="p-2">
      <table>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id} colSpan={header.colSpan}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
