import { ColumnDef } from '@tanstack/react-table';
import { useQuery } from '@tanstack/react-query';
import DataTable from '../components/DataTable';
import { fetchRecharges } from '../api/services';
import { Recharge } from '../types';

const columns: ColumnDef<Recharge>[] = [
  { header: 'Recharge ID', accessorKey: 'rechargeId' },
  { header: 'Customer ID', accessorKey: 'customerId' },
  { header: 'Card Number', accessorKey: 'cardNumber' },
  { header: 'Amount', accessorKey: 'rechargeAmount' },
  { header: 'Payment Mode', accessorKey: 'paymentMode' }
];

export default function RechargesPage() {
  const { data } = useQuery({ queryKey: ['recharges'], queryFn: () => fetchRecharges().then((r) => r.data) });
  return (
    <div>
      <h2 className="mb-4 text-2xl font-bold">Recharges</h2>
      <DataTable columns={columns} data={data ?? []} />
    </div>
  );
}
