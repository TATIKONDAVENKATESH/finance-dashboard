// Calculate total income
export function getIncome(transactions) {
    return transactions
        .filter((t) => t.type === "income")
        .reduce((sum, t) => sum + t.amount, 0);
}

// Calculate total expense
export function getExpense(transactions) {
    return transactions
        .filter((t) => t.type === "expense")
        .reduce((sum, t) => sum + t.amount, 0);
}

// Calculate balance
export function getBalance(transactions) {
    const income = getIncome(transactions);
    const expense = getExpense(transactions);
    return income - expense;
}

// Highest spending category
export function getHighestSpendingCategory(transactions) {
    const map = {};

    transactions
        .filter((t) => t.type === "expense")
        .forEach((t) => {
            if (!map[t.category]) map[t.category] = 0;
            map[t.category] += t.amount;
        });

    let maxCategory = null;
    let maxAmount = 0;

    for (let category in map) {
        if (map[category] > maxAmount) {
            maxAmount = map[category];
            maxCategory = category;
        }
    }

    return { category: maxCategory, amount: maxAmount };
}

// Monthly comparison (latest vs previous month)
export function getMonthlyComparison(transactions) {
    const monthly = {};

    transactions.forEach((t) => {
        const month = t.date.slice(0, 7);

        if (!monthly[month]) {
            monthly[month] = { income: 0, expense: 0 };
        }

        if (t.type === "income") {
            monthly[month].income += t.amount;
        } else {
            monthly[month].expense += t.amount;
        }
    });

    const months = Object.keys(monthly).sort();

    if (months.length < 2) return null;

    const last = monthly[months[months.length - 1]];
    const prev = monthly[months[months.length - 2]];

    return {
        incomeChange: last.income - prev.income,
        expenseChange: last.expense - prev.expense,
    };
}

export function getAllMonthlyComparisons(transactions) {
    const monthly = {};

    transactions.forEach((t) => {
        const month = t.date.slice(0, 7); // YYYY-MM

        if (!monthly[month]) {
            monthly[month] = { income: 0, expense: 0 };
        }

        if (t.type === "income") {
            monthly[month].income += t.amount;
        } else {
            monthly[month].expense += t.amount;
        }
    });

    const months = Object.keys(monthly).sort();

    if (months.length < 2) return [];

    const result = [];

    for (let i = 1; i < months.length; i++) {
        const current = monthly[months[i]];
        const prev = monthly[months[i - 1]];

        result.push({
            month: months[i],
            incomeChange: current.income - prev.income,
            expenseChange: current.expense - prev.expense,
        });
    }

    return result;
}

export function getMonthlyHighestSpending(transactions) {
    const monthly = {};

    transactions
        .filter((t) => t.type === "expense")
        .forEach((t) => {
            const month = t.date.slice(0, 7);

            if (!monthly[month]) {
                monthly[month] = {};
            }

            if (!monthly[month][t.category]) {
                monthly[month][t.category] = 0;
            }

            monthly[month][t.category] += t.amount;
        });

    const result = {};

    for (let month in monthly) {
        let maxCategory = null;
        let maxAmount = 0;

        for (let category in monthly[month]) {
            if (monthly[month][category] > maxAmount) {
                maxAmount = monthly[month][category];
                maxCategory = category;
            }
        }

        result[month] = {
            category: maxCategory,
            amount: maxAmount,
        };
    }

    return result;
}