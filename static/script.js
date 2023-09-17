document.addEventListener("DOMContentLoaded", function () {
    const groupSelect = document.getElementById("group-select");
    const groupButton = document.getElementById("group-button");
    const groupedDataDiv = document.getElementById("grouped-data");
    const dataTable = document.getElementById("data-table");

    groupButton.addEventListener("click", function () {
        const selectedColumn = groupSelect.value;
        if (!selectedColumn) {
            alert("Please select a column to group by.");
            return;
        }

        // Get the index of the selected column in the table header
        const columnIndex = Array.from(dataTable.rows[0].cells).findIndex((cell) => cell.textContent === selectedColumn);

        // Create an object to store grouped rows
        const groupedRows = {};

        // Iterate through the rows in the table (skip the header row)
        for (let i = 1; i < dataTable.rows.length; i++) {
            const row = dataTable.rows[i];
            const cell = row.cells[columnIndex];
            const cellValue = cell.textContent.trim();

            // If the group already exists, append the row to it; otherwise, create a new group
            if (groupedRows[cellValue]) {
                groupedRows[cellValue].push(row.outerHTML);
            } else {
                groupedRows[cellValue] = [row.outerHTML];
            }
        }

        // Render the grouped data
        const groupedDataHtml = Object.keys(groupedRows).map((groupKey) => {
            return `<h3>${selectedColumn}: ${groupKey}</h3><table>${groupedRows[groupKey].join("")}</table>`;
        });

        groupedDataDiv.innerHTML = groupedDataHtml.join("");
    });
});
