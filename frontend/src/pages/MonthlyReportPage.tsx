import { useQuery } from '@tanstack/react-query';
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import ChartCard from '../components/ChartCard';
import StatCard from '../components/StatCard';
import { dashboardApi, reportApi } from '../services/api';

export default function MonthlyReportPage() {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth() + 1;

  const { data: monthly } = useQuery({ queryKey: ['monthly', year, month], queryFn: () => reportApi.monthly(year, month).then((r) => r.data) });
  const { data: analytics } = useQuery({ queryKey: ['analytics-monthly'], queryFn: () => dashboardApi.analytics().then((r) => r.data) });

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Monthly Report</h2>
      <div className="grid gap-3 md:grid-cols-3 xl:grid-cols-4">
        <StatCard title="Total Sales" value={monthly?.totalSales ?? 0} />
        <StatCard title="Total Recharge Amount" value={monthly?.totalRechargeAmount ?? 0} />
        <StatCard title="Total Coin Collection" value={monthly?.totalCoinCollection ?? 0} />
        <StatCard title="Total QR Payments" value={monthly?.totalQrPayments ?? 0} />
        <StatCard title="Total New Cards" value={monthly?.totalNewCards ?? 0} />
        <StatCard title="Total Customers" value={monthly?.totalCustomers ?? 0} />
        <StatCard title="Total 20L Jar Usage" value={monthly?.total20LJarUsage ?? 0} />
      </div>
      <ChartCard title="Monthly Analytics">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={analytics?.monthlyRevenueChart ?? []}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="_id" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="revenue" fill="#7c3aed" />
          </BarChart>
        </ResponsiveContainer>
      </ChartCard>
    </div>
  );
}
