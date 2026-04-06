export function exportToCSV(data, filename = "transactions.csv") {
    if (!data.length) return;

    //Define fixed column order
    const headers = ["date", "type", "category", "amount", "note"];

    // Header row
    const headerRow = headers.join(",");

    const rows = data.map((item) =>
        headers
            .map((key) => {
                let value = item[key] ?? "";

                // Format date
                if (key === "date" && value) {
                    const d = new Date(value);
                    value = isNaN(d) ? value : d.toLocaleDateString("en-GB");
                }

                // Escape quotes properly
                value = String(value).replace(/"/g, '""');

                return `"${value}"`;
            })
            .join(",")
    );

    const csv = [headerRow, ...rows].join("\n");

    // Add BOM for Excel (fixes weird characters)
    const blob = new Blob(["\uFEFF" + csv], {
        type: "text/csv;charset=utf-8;",
    });

    const url = window.URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
  }