export default function StatCard({ title, value }: { title: string; value: number }) {
  return (
    <div className="rounded bg-white p-4 shadow">
      <p className="text-sm text-slate-500">{title}</p>
      <p className="text-2xl font-bold">₹ {value.toLocaleString()}</p>
    </div>
  );
}
