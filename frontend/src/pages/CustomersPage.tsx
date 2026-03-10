import { ColumnDef } from '@tanstack/react-table';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useMemo, useState } from 'react';
import DataTable from '../components/DataTable';
import FormInput from '../components/FormInput';
import { customerApi } from '../services/api';
import { Customer } from '../types';

const initial = { customerName: '', mobileNumber: '', cardNumber: '', cardCost: 50, paymentMode: 'cash', status: 'active' };

export default function CustomersPage() {
  const [search, setSearch] = useState('');
  const [form, setForm] = useState(initial);
  const [editId, setEditId] = useState<string | null>(null);
  const qc = useQueryClient();

  const { data } = useQuery({ queryKey: ['customers', search], queryFn: () => customerApi.list(search).then((r) => r.data) });

  const saveMutation = useMutation({
    mutationFn: () => (editId ? customerApi.update(editId, form) : customerApi.create(form)),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['customers'] });
      setForm(initial);
      setEditId(null);
    }
  });

  const deleteMutation = useMutation({ mutationFn: (id: string) => customerApi.remove(id), onSuccess: () => qc.invalidateQueries({ queryKey: ['customers'] }) });

  const columns = useMemo<ColumnDef<Customer>[]>(
    () => [
      { header: 'Name', accessorKey: 'customerName' },
      { header: 'Mobile', accessorKey: 'mobileNumber' },
      { header: 'Card', accessorKey: 'cardNumber' },
      { header: 'Card Cost', accessorKey: 'cardCost' },
      { header: 'Payment', accessorKey: 'paymentMode' },
      { header: 'Status', accessorKey: 'status' },
      {
        header: 'Action',
        cell: ({ row }) => (
          <div className="space-x-2">
            <button className="rounded bg-amber-500 px-2 py-1 text-white" onClick={() => { setEditId(row.original._id); setForm(row.original as never); }}>Edit</button>
            <button className="rounded bg-red-600 px-2 py-1 text-white" onClick={() => deleteMutation.mutate(row.original._id)}>Delete</button>
          </div>
        )
      }
    ],
    []
  );

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Customers</h2>
      <form
        className="grid gap-3 rounded bg-white p-4 shadow md:grid-cols-3"
        onSubmit={(e) => {
          e.preventDefault();
          saveMutation.mutate();
        }}
      >
        <FormInput label="Customer Name" name="customerName" value={form.customerName} onChange={(e) => setForm({ ...form, [e.target.name]: e.target.value })} />
        <FormInput label="Mobile Number" name="mobileNumber" value={form.mobileNumber} onChange={(e) => setForm({ ...form, [e.target.name]: e.target.value })} />
        <FormInput label="Card Number" name="cardNumber" value={form.cardNumber} onChange={(e) => setForm({ ...form, [e.target.name]: e.target.value })} />
        <FormInput label="Card Cost" name="cardCost" type="number" value={form.cardCost} onChange={(e) => setForm({ ...form, cardCost: Number(e.target.value) })} />
        <FormInput label="Payment Mode" name="paymentMode" value={form.paymentMode} options={[{ label: 'Cash', value: 'cash' }, { label: 'QR', value: 'qr' }]} onChange={(e) => setForm({ ...form, paymentMode: e.target.value as 'cash' | 'qr' })} />
        <FormInput label="Status" name="status" value={form.status} options={[{ label: 'Active', value: 'active' }, { label: 'Inactive', value: 'inactive' }]} onChange={(e) => setForm({ ...form, status: e.target.value as 'active' | 'inactive' })} />
        <button className="rounded bg-blue-600 p-2 text-white">{editId ? 'Update Customer' : 'Add Customer'}</button>
      </form>
      <input className="w-full max-w-md rounded border p-2" placeholder="Search customers" value={search} onChange={(e) => setSearch(e.target.value)} />
      <DataTable columns={columns} data={data ?? []} />
    </div>
  );
}
