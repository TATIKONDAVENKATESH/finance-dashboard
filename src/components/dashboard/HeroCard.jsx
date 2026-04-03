import { formatCurrency } from "../../utils/formatCurrency";

export default function HeroCard({ balance }) {
  return (
    <div className="md:col-span-2 p-6 rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg hover:scale-[1.02] transition-transform">

      <p className="text-sm opacity-80">Total Balance</p>

      <h1
        className={`text-4xl font-bold mt-2 ${balance < 0 ? "text-red-300" : "text-white"
          }`}
      >
        {formatCurrency(balance)}
      </h1>

    </div>
  );
}