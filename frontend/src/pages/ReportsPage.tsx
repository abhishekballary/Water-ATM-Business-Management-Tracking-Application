import { useQuery } from '@tanstack/react-query';
import { fetchMonthlyReport, fetchReports } from '../api/services';

export default function ReportsPage() {
  const now = new Date();
  const { data: daily } = useQuery({ queryKey: ['reports'], queryFn: () => fetchReports().then((r) => r.data) });
  const { data: monthly } = useQuery({
    queryKey: ['monthly-report'],
    queryFn: () => fetchMonthlyReport(now.getFullYear(), now.getMonth() + 1).then((r) => r.data)
  });

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Daily & Monthly Reports</h2>
      <div className="rounded bg-white p-4 shadow">
        <h3 className="font-semibold">Monthly Summary</h3>
        <p>Total Sales: {monthly?.totalSales ?? 0}</p>
        <p>Total Recharges: {monthly?.totalRechargeAmount ?? 0}</p>
        <p>Total Coin Collection: {monthly?.totalCoinCollection ?? 0}</p>
        <p>Total QR Payments: {monthly?.totalQrPayments ?? 0}</p>
        <p>20L Jar Usage: {monthly?.total20LJarUsage ?? 0}</p>
      </div>
      <div className="rounded bg-white p-4 shadow">
        <h3 className="font-semibold">Daily Reports Count: {daily?.length ?? 0}</h3>
      </div>
    </div>
  );
}
