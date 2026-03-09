import { useQuery } from '@tanstack/react-query';
import { Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid, LineChart, Line } from 'recharts';
import { fetchAnalytics, fetchSummary } from '../api/services';
import StatCard from '../components/StatCard';

export default function DashboardPage() {
  const { data: summary } = useQuery({ queryKey: ['summary'], queryFn: () => fetchSummary().then((r) => r.data) });
  const { data: analytics } = useQuery({ queryKey: ['analytics'], queryFn: () => fetchAnalytics().then((r) => r.data) });

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Dashboard</h2>
      <div className="grid grid-cols-1 gap-3 md:grid-cols-4">
        <StatCard title="Today Total Sales" value={summary?.todaySales ?? 0} />
        <StatCard title="Today Recharge" value={summary?.todayRechargeAmount ?? 0} />
        <StatCard title="Today Coin Collection" value={summary?.todayCoinCollection ?? 0} />
        <StatCard title="Total Card Users Today" value={summary?.totalCardUsersToday ?? 0} />
        <StatCard title="Today QR/UPI" value={summary?.todayQrPayments ?? 0} />
        <StatCard title="20L Jar Usage" value={summary?.total20LJarUsage ?? 0} />
        <StatCard title="Total Customers" value={summary?.totalCustomers ?? 0} />
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <div className="h-72 rounded bg-white p-4 shadow">
          <h3 className="font-semibold">Daily Sales Trend</h3>
          <ResponsiveContainer width="100%" height="90%">
            <LineChart data={analytics?.salesTrend ?? []}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="reportDate" />
              <YAxis />
              <Tooltip />
              <Line dataKey="totalWaterValue" stroke="#2563eb" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="h-72 rounded bg-white p-4 shadow">
          <h3 className="font-semibold">Payment Distribution</h3>
          <ResponsiveContainer width="100%" height="90%">
            <PieChart>
              <Pie data={analytics?.paymentDistribution ?? []} dataKey="value" nameKey="_id" outerRadius={80} fill="#60a5fa" />
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
