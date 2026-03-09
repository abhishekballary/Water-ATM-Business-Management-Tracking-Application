import { useQuery } from '@tanstack/react-query';
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { fetchAnalytics } from '../api/services';

export default function PaymentAnalyticsPage() {
  const { data } = useQuery({ queryKey: ['payment-analytics'], queryFn: () => fetchAnalytics().then((r) => r.data) });

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Payment Analytics</h2>
      <div className="h-80 rounded bg-white p-4 shadow">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data?.paymentDistribution ?? []}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="_id" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#10b981" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
