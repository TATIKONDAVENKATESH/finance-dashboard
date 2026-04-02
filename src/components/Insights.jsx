export default function Insights({ data }) {
  const expenses = data.filter(d => d.type === "expense");

  const highest = expenses.reduce((max, curr) =>
    curr.amount > max.amount ? curr : max, expenses[0]
  );

  return (
    <div className="bg-white p-4 rounded-2xl shadow mt-4">
      <h2 className="font-bold mb-2">Insights</h2>
      <p>Highest spending: {highest?.category} (₹{highest?.amount})</p>
    </div>
  );
}