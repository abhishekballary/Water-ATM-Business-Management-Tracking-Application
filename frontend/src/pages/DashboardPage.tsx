import { useQuery } from '@tanstack/react-query';
import { Bar, BarChart, CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import ChartCard from '../components/ChartCard';
import StatCard from '../components/StatCard';
import { dashboardApi } from '../services/api';

export default function DashboardPage() {
  const { data: summary } = useQuery({ queryKey: ['summary'], queryFn: () => dashboardApi.summary().then((r) => r.data) });
  const { data: analytics } = useQuery({ queryKey: ['analytics'], queryFn: () => dashboardApi.analytics().then((r) => r.data) });

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Dashboard</h2>
      <div className="grid grid-cols-1 gap-3 md:grid-cols-3 xl:grid-cols-6">
        <StatCard title="Today Sales" value={summary?.todaySales ?? 0} />
        <StatCard title="Today Recharge" value={summary?.todayRechargeAmount ?? 0} />
        <StatCard title="Coin Collection" value={summary?.coinRevenue ?? 0} />
        <StatCard title="QR Payments" value={summary?.qrRevenue ?? 0} />
        <StatCard title="Total Customers" value={summary?.totalCustomers ?? 0} />
        <StatCard title="20L Jar Usage" value={summary?.totalJarUsage ?? 0} />
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <ChartCard title="Daily Sales Chart">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={analytics?.dailySalesChart ?? []}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="_id" />
              <YAxis />
              <Tooltip />
              <Line dataKey="sales" stroke="#2563eb" />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>
        <ChartCard title="Monthly Revenue Chart">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={analytics?.monthlyRevenueChart ?? []}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="_id" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="revenue" fill="#0ea5e9" />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
        <ChartCard title="Recharge Activity Chart">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={analytics?.rechargeActivityChart ?? []}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="_id" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="amount" fill="#16a34a" />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>
    </div>
  );
}
