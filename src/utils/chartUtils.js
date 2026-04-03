export function groupByMonth(transactions) {
  const map = {};

  transactions.forEach((t) => {
    const month = t.date.slice(0, 7); // "2026-04"

    if (!map[month]) {
      map[month] = { month, income: 0, expense: 0 };
    }

    if (t.type === "income") map[month].income += t.amount;
    else map[month].expense += t.amount;
  });

  return Object.values(map).map((m) => ({
    ...m,
    balance: m.income - m.expense,
  }));
}

export function categoryBreakdown(transactions) {
  const map = {};

  transactions
    .filter((t) => t.type === "expense")
    .forEach((t) => {
      if (!map[t.category]) map[t.category] = 0;
      map[t.category] += t.amount;
    });

  return Object.keys(map).map((key) => ({
    name: key,
    value: map[key],
  }));
}