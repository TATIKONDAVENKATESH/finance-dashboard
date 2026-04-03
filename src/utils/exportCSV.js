export function exportToCSV(data, filename = "transactions.csv") {
    if (!data.length) return;

    const headers = Object.keys(data[0]).join(",");

    const rows = data
        .map((obj) =>
            Object.values(obj)
                .map((val) => `"${val}"`)
                .join(",")
        )
        .join("\n");

    const csv = `${headers}\n${rows}`;

    const blob = new Blob([csv], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
  }