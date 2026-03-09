import { ColumnDef } from '@tanstack/react-table';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { fetchCustomers } from '../api/services';
import DataTable from '../components/DataTable';
import { Customer } from '../types';

const columns: ColumnDef<Customer>[] = [
  { header: 'Customer ID', accessorKey: 'customerId' },
  { header: 'Name', accessorKey: 'customerName' },
  { header: 'Mobile', accessorKey: 'mobileNumber' },
  { header: 'Card Number', accessorKey: 'cardNumber' },
  { header: 'Status', accessorKey: 'status' }
];

export default function CustomersPage() {
  const [search, setSearch] = useState('');
  const { data } = useQuery({ queryKey: ['customers', search], queryFn: () => fetchCustomers(search).then((r) => r.data) });

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Customers</h2>
      <input
        className="w-full max-w-md rounded border p-2"
        placeholder="Search customer"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <DataTable columns={columns} data={data ?? []} />
    </div>
  );
}
