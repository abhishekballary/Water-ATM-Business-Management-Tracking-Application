import { ColumnDef } from '@tanstack/react-table';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useMemo, useState } from 'react';
import DataTable from '../components/DataTable';
import FormInput from '../components/FormInput';
import { customerApi, rechargeApi } from '../services/api';
import { Recharge } from '../types';

export default function RechargesPage() {
  const [customerId, setCustomerId] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [rechargeAmount, setRechargeAmount] = useState(0);
  const [paymentMode, setPaymentMode] = useState<'cash' | 'qr' | 'card'>('cash');
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [filterCard, setFilterCard] = useState('');
  const [filterDate, setFilterDate] = useState('');

  const qc = useQueryClient();
  const { data: customers } = useQuery({ queryKey: ['customers'], queryFn: () => customerApi.list().then((r) => r.data) });
  const { data: recharges } = useQuery({
    queryKey: ['recharges', filterDate],
    queryFn: () => rechargeApi.list(filterDate ? { startDate: filterDate, endDate: filterDate } : {}).then((r) => r.data)
  });

  const mutation = useMutation({
    mutationFn: () => rechargeApi.create({ customerId, cardNumber, rechargeAmount, paymentMode, date }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['recharges'] });
      qc.invalidateQueries({ queryKey: ['summary'] });
      qc.invalidateQueries({ queryKey: ['analytics'] });
    }
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => rechargeApi.remove(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['recharges'] });
      qc.invalidateQueries({ queryKey: ['summary'] });
      qc.invalidateQueries({ queryKey: ['analytics'] });
    }
  });

  const filteredRecharges = useMemo(
    () => (recharges ?? []).filter((r: Recharge) => (filterCard ? r.cardNumber.includes(filterCard) : true)),
    [recharges, filterCard]
  );

  const columns: ColumnDef<Recharge>[] = [
    { header: 'Card Number', accessorKey: 'cardNumber' },
    { header: 'Amount', accessorKey: 'rechargeAmount' },
    { header: 'Payment', accessorKey: 'paymentMode' },
    { header: 'Date', cell: ({ row }) => new Date(row.original.date).toLocaleDateString() },
    {
      header: 'Action',
      cell: ({ row }) => (
        <button
          className="rounded bg-red-600 px-2 py-1 text-white"
          onClick={() => deleteMutation.mutate(row.original._id)}
          disabled={deleteMutation.isPending}
        >
          Delete
        </button>
      )
    }
  ];

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Recharges</h2>
      <form className="grid gap-3 rounded bg-white p-4 shadow md:grid-cols-3" onSubmit={(e) => { e.preventDefault(); mutation.mutate(); }}>
        <label className="text-sm">Customer
          <select className="w-full rounded border p-2" value={customerId} onChange={(e) => {
            setCustomerId(e.target.value);
            const c = customers?.find((x: any) => x._id === e.target.value);
            setCardNumber(c?.cardNumber ?? '');
          }}>
            <option value="">Select customer</option>
            {(customers ?? []).map((c: any) => <option key={c._id} value={c._id}>{c.customerName}</option>)}
          </select>
        </label>
        <FormInput label="Card Number" name="cardNumber" value={cardNumber} onChange={(e) => setCardNumber(e.target.value)} />
        <FormInput label="Recharge Amount" name="rechargeAmount" type="number" value={rechargeAmount} onChange={(e) => setRechargeAmount(Number(e.target.value))} />
        <FormInput label="Payment Mode" name="paymentMode" value={paymentMode} options={[{label:'Cash',value:'cash'},{label:'QR',value:'qr'},{label:'Card',value:'card'}]} onChange={(e) => setPaymentMode(e.target.value as 'cash' | 'qr' | 'card')} />
        <FormInput label="Date" name="date" type="date" value={date} onChange={(e) => setDate(e.target.value)} />
        <button className="rounded bg-blue-600 p-2 text-white">Add Recharge</button>
      </form>

      <div className="grid gap-2 md:grid-cols-2">
        <input className="rounded border p-2" placeholder="Filter by card number" value={filterCard} onChange={(e) => setFilterCard(e.target.value)} />
        <input className="rounded border p-2" type="date" value={filterDate} onChange={(e) => setFilterDate(e.target.value)} />
      </div>
      <DataTable columns={columns} data={filteredRecharges} />
    </div>
  );
}
