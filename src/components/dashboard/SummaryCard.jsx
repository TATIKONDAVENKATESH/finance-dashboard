import { formatCurrency } from "../../utils/formatCurrency";

export default function SummaryCard({ title, value }) {
  return (
    <div className="p-5 rounded-2xl bg-white/10 backdrop-blur-lg border border-white/10 shadow-lg hover:bg-white/15 transition">

      <p className="text-gray-400 text-sm">{title}</p>

      <h2 className="text-2xl font-bold text-white mt-2">
        {formatCurrency(value)}
      </h2>

    </div>
  );
}