export default function ChartCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="h-80 rounded bg-white p-4 shadow">
      <h3 className="mb-2 font-semibold">{title}</h3>
      <div className="h-[90%]">{children}</div>
    </div>
  );
}
