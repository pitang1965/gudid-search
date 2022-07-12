import { useCallback } from 'react';
import * as XLSX from 'xlsx';
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import Link from './Link';
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
  className: string;
  data: Udi[];
};

const columns: ColumnDef<Udi>[] = [
  {
    accessorKey: 'id',
    header: () => 'UDI-DI',
    cell: props => <Link to={`https://accessgudid.nlm.nih.gov/devices/${props.renderValue()}`}>{props.renderValue()}</Link>,
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

export default function UdiTable({ className, data }: Props) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const xport = useCallback(async () => {
    const table = document.getElementById('TableToExport');
    const wb = XLSX.utils.table_to_book(table);
    XLSX.writeFile(wb, 'UdiTable.xlsx');
  }, []);

  return (
    <div className={className}>
      <table id='TableToExport'>
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
      <button className="button mt-2" onClick={xport}>EXLSXエクスポート</button>
    </div>
  );
}
