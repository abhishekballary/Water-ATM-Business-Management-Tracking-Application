import { ColumnDef } from '@tanstack/react-table';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import DataTable from '../components/DataTable';
import FormInput from '../components/FormInput';
import { reportApi } from '../services/api';
import { DailyReport } from '../types';

const empty = {
  reportDate: new Date().toISOString().slice(0, 10),
  totalWaterValue: 0,
  totalRechargeAmount: 0,
  totalCoinAmount: 0,
  totalQrAmount: 0,
  totalCardUsers: 0,
  total20LJarUsage: 0,
  newCardCount: 0
};

export default function ReportsPage() {
  const [form, setForm] = useState(empty);
  const [editId, setEditId] = useState<string | null>(null);
  const qc = useQueryClient();

  const { data } = useQuery({ queryKey: ['reports'], queryFn: () => reportApi.list().then((r) => r.data) });
  const mutation = useMutation({
    mutationFn: () => (editId ? reportApi.update(editId, form) : reportApi.create(form)),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['reports'] });
      setForm(empty);
      setEditId(null);
    }
  });

  const columns: ColumnDef<DailyReport>[] = [
    { header: 'Date', cell: ({ row }) => new Date(row.original.reportDate).toLocaleDateString() },
    { header: 'Water Sales', accessorKey: 'totalWaterValue' },
    { header: 'Recharge', accessorKey: 'totalRechargeAmount' },
    { header: 'Coin', accessorKey: 'totalCoinAmount' },
    { header: 'QR', accessorKey: 'totalQrAmount' },
    { header: 'Jar Usage', accessorKey: 'total20LJarUsage' },
    {
      header: 'Action',
      cell: ({ row }) => <button className="rounded bg-amber-500 px-2 py-1 text-white" onClick={() => { setEditId(row.original._id); setForm({
        reportDate: row.original.reportDate.slice(0, 10),
        totalWaterValue: row.original.totalWaterValue,
        totalRechargeAmount: row.original.totalRechargeAmount,
        totalCoinAmount: row.original.totalCoinAmount,
        totalQrAmount: row.original.totalQrAmount,
        totalCardUsers: row.original.totalCardUsers,
        total20LJarUsage: row.original.total20LJarUsage,
        newCardCount: row.original.newCardCount
      }); }}>Edit</button>
    }
  ];

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Daily Reports</h2>
      <form className="grid gap-3 rounded bg-white p-4 shadow md:grid-cols-4" onSubmit={(e) => { e.preventDefault(); mutation.mutate(); }}>
        <FormInput label="Report Date" name="reportDate" type="date" value={form.reportDate} onChange={(e) => setForm({ ...form, reportDate: e.target.value })} />
        <FormInput label="Total Water Value" name="totalWaterValue" type="number" value={form.totalWaterValue} onChange={(e) => setForm({ ...form, totalWaterValue: Number(e.target.value) })} />
        <FormInput label="Total Recharge" name="totalRechargeAmount" type="number" value={form.totalRechargeAmount} onChange={(e) => setForm({ ...form, totalRechargeAmount: Number(e.target.value) })} />
        <FormInput label="Coin Amount" name="totalCoinAmount" type="number" value={form.totalCoinAmount} onChange={(e) => setForm({ ...form, totalCoinAmount: Number(e.target.value) })} />
        <FormInput label="QR Amount" name="totalQrAmount" type="number" value={form.totalQrAmount} onChange={(e) => setForm({ ...form, totalQrAmount: Number(e.target.value) })} />
        <FormInput label="Card Users" name="totalCardUsers" type="number" value={form.totalCardUsers} onChange={(e) => setForm({ ...form, totalCardUsers: Number(e.target.value) })} />
        <FormInput label="20L Jar Usage" name="total20LJarUsage" type="number" value={form.total20LJarUsage} onChange={(e) => setForm({ ...form, total20LJarUsage: Number(e.target.value) })} />
        <FormInput label="New Cards" name="newCardCount" type="number" value={form.newCardCount} onChange={(e) => setForm({ ...form, newCardCount: Number(e.target.value) })} />
        <button className="rounded bg-blue-600 p-2 text-white">{editId ? 'Update Report' : 'Create Report'}</button>
      </form>
      <DataTable columns={columns} data={data ?? []} />
    </div>
  );
}
