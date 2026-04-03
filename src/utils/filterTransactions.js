export function filterByDateRange(transactions, range) {
    if (range === "all") return transactions;

    const now = new Date();

    return transactions.filter((t) => {
        const txDate = new Date(t.date);
        const diffDays = (now - txDate) / (1000 * 60 * 60 * 24);

        if (range === "30") return diffDays <= 30;
        if (range === "90") return diffDays <= 90;

        return true;
    });
  }