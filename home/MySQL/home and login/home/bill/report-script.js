document.addEventListener("DOMContentLoaded", function () {
    // Fetch saved bills from localStorage and display them in the report table
    loadReports(); // Changed from loadSavedBills to loadReports

    // Search functionality
    const searchInput = document.getElementById("search-input");
    searchInput.addEventListener("input", searchReports);
}); 

function loadReports() {
    console.log("Loading reports..."); // Add this line
    const reportsBody = document.getElementById('reportsBody');
    if (!reportsBody) {
        console.error("reportsBody element not found!");
        return;
    }
    reportsBody.innerHTML = ''; // Clear the existing content

    const bills = JSON.parse(localStorage.getItem('bills')) || [];
    console.log("Bills fetched:", bills);

     // Filter out null entries in the bills array
     const validBills = bills.filter(bill => bill !== null);
     console.log("Valid bills:", validBills);

    if (validBills.length === 0) {
        reportsBody.innerHTML = '<tr><td colspan="10">No bills saved.</td></tr>';
        return;
    }

    validBills.forEach((bill, index) => {
        const total = bill.total; // Use the total saved in the bill object directly
        const row = `<tr>
            <td>${bill.lrNo}</td>
            <td>${bill.date}</td>
            <td>${bill.gstPaidBy}</td>
            <td>${bill.paymentMode}</td>
            <td>${bill.from}</td>
            <td>${bill.to}</td>
            <td>${bill.consignor}</td>
            <td>${bill.consignorAddress}</td>
            <td>${bill.consignorInvoiceNo}</td>
            <td>${bill.consignee}</td>
            <td>${bill.consigneeAddress}</td>
            <td>${bill.consigneeInvoiceNo}</td>
            <td>${total}</td>
            <td>
                <button onclick="editBill(${index})">Edit</button>
                <button onclick="deleteBill(${index})">Delete</button>
            </td>
        </tr>`;
        console.log("Adding row for bill:", bill); // Log the bill being added
        reportsBody.innerHTML += row;
    });
}

               

// Ensure loadReports is called when reports section is displayed
document.getElementById("goToReportsBtn").addEventListener("click", function () {
    loadReports(); // Ensure that reports are loaded when button is clicked
    const reportsSection = document.getElementById("reports-section");
    reportsSection.scrollIntoView({ behavior: 'smooth' });
});


// Function to search reports
function searchReports() {
    const filter = document.getElementById("search-input").value.toUpperCase();
    const table = document.getElementById("reports-table");
    const tr = table.getElementsByTagName("tr");

    for (let i = 1; i < tr.length; i++) {
        let td = tr[i].getElementsByTagName("td");
        let match = false;

        for (let j = 0; j < td.length; j++) {
            if (td[j]) {
                if (td[j].innerHTML.toUpperCase().indexOf(filter) > -1) {
                    match = true;
                    break;
                }
            }
        }

        tr[i].style.display = match ? "" : "none";
    }
}

// Function to sort table by column
function sortTable(columnIndex) {
    const table = document.getElementById("reports-table");
    let switching = true;
    let shouldSwitch;
    let switchCount = 0;
    let dir = "asc";

    while (switching) {
        switching = false;
        const rows = table.rows;

        for (let i = 1; i < rows.length - 1; i++) {
            shouldSwitch = false;

            const x = rows[i].getElementsByTagName("TD")[columnIndex];
            const y = rows[i + 1].getElementsByTagName("TD")[columnIndex];

            if (dir === "asc") {
                if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
                    shouldSwitch = true;
                    break;
                }
            } else if (dir === "desc") {
                if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
                    shouldSwitch = true;
                    break;
                }
            }
        }

        if (shouldSwitch) {
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            switching = true;
            switchCount++;
        } else {
            if (switchCount === 0 && dir === "asc") {
                dir = "desc";
                switching = true;
            }
        }
    }
}

// Function to edit a bill
function editBill(index) {
    const bills = JSON.parse(localStorage.getItem("bills")) || [];
    const bill = bills[index];

    // Redirect to billing form and load the selected bill
    window.location.href = "index1.html";
    localStorage.setItem("editBillIndex", index); // Save the index for editing in the form
}

// Function to delete a bill
function deleteBill(index) {
    const bills = JSON.parse(localStorage.getItem("bills")) || [];
    bills.splice(index, 1);
    localStorage.setItem("bills", JSON.stringify(bills));
    loadReports(); // Refresh the report table after deletion
}
