import { useQuery } from '@tanstack/react-query';
import { fetchCustomers } from '../api/services';

export default function CustomerAnalyticsPage() {
  const { data } = useQuery({ queryKey: ['customers-analytics'], queryFn: () => fetchCustomers().then((r) => r.data) });
  const regular = (data ?? []).filter((c: any) => c.rechargeCount >= 3);
  const inactive = (data ?? []).filter((c: any) => c.status === 'inactive');

  return (
    <div className="space-y-3">
      <h2 className="text-2xl font-bold">Customer Analytics</h2>
      <div className="rounded bg-white p-4 shadow">Regular Customers (3+ recharges): {regular.length}</div>
      <div className="rounded bg-white p-4 shadow">Inactive Customers: {inactive.length}</div>
    </div>
  );
}
