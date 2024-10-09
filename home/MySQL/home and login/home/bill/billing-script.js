// Function to calculate GST and total amount
function calculateTotal() {
    // Get the values from the input fields
    const ratePerArticle = parseFloat(document.getElementById("rate-per-article").value) || 0;
    const gstPercentage = parseFloat(document.getElementById("gst").value) || 0;
    const freight = parseFloat(document.getElementById("freight").value) || 0;
    const noOfArticles = parseFloat(document.getElementById("no-articles").value) || 0;

    // Calculate subtotal (the total cost of articles without GST)
    const subtotal = ratePerArticle * noOfArticles;

    // Calculate GST amount based on the subtotal and the GST percentage
    const gstAmount = (subtotal * gstPercentage) / 100; // GST Calculation

    // Calculate total amount (subtotal + GST + freight)
    const totalAmount = subtotal + gstAmount + freight; // Total Calculation

    // Set values to the respective input fields
    document.getElementById("gst-amt").value = gstAmount.toFixed(2); // Show GST amount
    document.getElementById("total").value = totalAmount.toFixed(2); // Show total amount
}

// Function to add a new option
function addNewOption(selectId) {
    const select = document.getElementById(selectId);
    const newValue = prompt("Enter new value:");
    if (newValue) {
        const option = document.createElement("option");
        option.value = newValue;
        option.text = newValue;
        select.add(option);
    }
}

// Function to remove the selected option
function removeOption(selectId) {
    const select = document.getElementById(selectId);
    const selectedIndex = select.selectedIndex;
    if (selectedIndex > -1) {
        select.remove(selectedIndex);
    }
}

// Function to generate the bill preview
function generateBill() {
    document.getElementById("preview-lr-no").innerText = document.getElementById("lr-no").value;
    document.getElementById("preview-manual-bill-no").innerText = document.getElementById("manual-bill-no").value;
    document.getElementById("preview-bill-no").innerText = document.getElementById("bill-no").value;
    document.getElementById("preview-customer-name").innerText = document.getElementById("customer-name").value;
    document.getElementById("preview-goods").innerText = document.getElementById("goods").value;
    document.getElementById("preview-no-articles").innerText = document.getElementById("no-articles").value;
    document.getElementById("preview-gst-amt").innerText = document.getElementById("gst-amt").value;
    document.getElementById("preview-total").innerText = document.getElementById("total").value;

    document.getElementById("bill-preview").style.display = 'block'; // Show the bill preview
}


// Function to add a new goods entry
function addGoodsEntry() {
    const goodsTable = document.getElementById('goods-entries');
    const newRow = document.createElement('tr');

    newRow.innerHTML = `
        <td>
            <select class="goods" required>
                <option value="">Select Goods</option>
                <!-- Add goods options here -->
            </select>
        </td>
        <td><input type="number" class="no-articles" required oninput="calculateTotal(this)"></td>
        <td><input type="number" class="rate-per-article" required oninput="calculateTotal(this)"></td>
        <td>
            <select class="gst" required onchange="calculateTotal(this)">
                <option value="5">5%</option>
                <option value="12">12%</option>
                <option value="18">18%</option>
            </select>
        </td>
        <td><input type="number" class="gst-amt" required readonly></td>
        <td><input type="number" class="freight" required oninput="calculateTotal(this)"></td>
        <td><input type="number" class="total" required readonly></td>
        <td><button type="button" onclick="removeGoodsEntry(this)">Remove</button></td>
    `;
    goodsTable.appendChild(newRow);
}

// Function to remove a goods entry
function removeGoodsEntry(button) {
    const row = button.closest('tr');
    row.remove();
    calculateGrandTotal();
}

// Function to calculate total for each goods entry
function calculateTotal(input) {
    const row = input.closest('tr');
    const noOfArticles = row.querySelector('.no-articles').value || 0;
    const ratePerArticle = row.querySelector('.rate-per-article').value || 0;
    const gstRate = row.querySelector('.gst').value || 0;

    const gstAmount = (noOfArticles * ratePerArticle * gstRate) / 100;
    const freight = row.querySelector('.freight').value || 0;

    const totalAmount = (noOfArticles * ratePerArticle) + parseFloat(gstAmount) + parseFloat(freight);

    row.querySelector('.gst-amt').value = gstAmount.toFixed(2);
    row.querySelector('.total').value = totalAmount.toFixed(2);

    calculateGrandTotal();
}

// Function to calculate the grand total
function calculateGrandTotal() {
    const totalElements = document.querySelectorAll('.total');
    let grandTotal = 0;

    totalElements.forEach(element => {
        grandTotal += parseFloat(element.value) || 0;
    });

    document.getElementById('total-amount').innerText = grandTotal.toFixed(2);
}

// Function to generate the bill preview
function generateBill() {
    // Update bill preview with the values from the form
    document.getElementById('preview-from').innerText = document.getElementById('from').value;
    document.getElementById('preview-to').innerText = document.getElementById('to').value;
    document.getElementById('preview-consignor').innerText = document.getElementById('consigner').value;
    document.getElementById('preview-consignee').innerText = document.getElementById('consignee').value;
    document.getElementById('preview-consignee-address').innerText = document.getElementById('consignee-address').value;

    const goodsEntries = document.getElementById('goods-entries').children;
    const previewGoodsDetails = document.getElementById('preview-goods-details');
    previewGoodsDetails.innerHTML = '';

    for (const row of goodsEntries) {
        const goods = row.querySelector('.goods').value;
        const noOfArticles = row.querySelector('.no-articles').value;
        const ratePerArticle = row.querySelector('.rate-per-article').value;
        const gstRate = row.querySelector('.gst').value;
        const gstAmount = row.querySelector('.gst-amt').value;
        const freight = row.querySelector('.freight').value;
        const total = row.querySelector('.total').value;

        const newRow = `<tr>
            <td style="border: 1px solid black; padding: 8px;">${goods}</td>
            <td style="border: 1px solid black; padding: 8px;">${noOfArticles}</td>
            <td style="border: 1px solid black; padding: 8px;">${ratePerArticle}</td>
            <td style="border: 1px solid black; padding: 8px;">${gstRate}</td>
            <td style="border: 1px solid black; padding: 8px;">${gstAmount}</td>
            <td style="border: 1px solid black; padding: 8px;">${freight}</td>
            <td style="border: 1px solid black; padding: 8px;">${total}</td>
        </tr>`;
        previewGoodsDetails.innerHTML += newRow;
    }
}

//<!-- Consignor and Consignee Section -->

const consignersList = ["Raghu", "Aggarwal", "Consigner 3"];
const consigneesList = ["Consignee 1", "Consignee 2", "Consignee 3"];

// Function to populate Consignors and Consignees
function populateSelectOptions(selectElementId, optionsArray) {
    const selectElement = document.getElementById(selectElementId);
    selectElement.innerHTML = '<option value="">Select ' + selectElementId + '</option>';
    optionsArray.forEach(option => {
        const newOption = document.createElement('option');
        newOption.value = option;
        newOption.textContent = option;
        selectElement.appendChild(newOption);
    });
}

// Call the function to populate the select elements on page load
populateSelectOptions('consigner', consignersList);
populateSelectOptions('consignee', consigneesList);


function addNewOption(selectId) {
    const selectElement = document.getElementById(selectId);
    const newOptionValue = prompt("Enter new " + selectId);
    
    if (newOptionValue) {
        const newOption = document.createElement('option');
        newOption.value = newOptionValue;
        newOption.textContent = newOptionValue;
        selectElement.appendChild(newOption);
    }
}


function removeOption(selectId) {
    const selectElement = document.getElementById(selectId);
    selectElement.options[selectElement.selectedIndex].remove();
}



//<!-- Goods Info Section -->

const goodsList = [
    { id: 1, name: "a Item A" },
    { id: 2, name: "b Item B" },
    { id: 3, name: "c Item C" },
    { id: 4, name: "d Item D" },
    // Add more items as needed
];

// Function to populate the goods dropdown
function populateGoodsDropdown(selectElement) {
    selectElement.innerHTML = ''; // Clear existing options
    const defaultOption = document.createElement('option');
    defaultOption.value = '';
    defaultOption.textContent = 'Select Goods';
    selectElement.appendChild(defaultOption);

    goodsList.forEach(good => {
        const option = document.createElement('option');
        option.value = good.id; // Use the item's id as the value
        option.textContent = good.name; // Use the item's name as the text
        selectElement.appendChild(option);
    });
}

// Function to add a goods entry
function addGoodsEntry() {
    const goodsEntries = document.getElementById("goods-entries");
    const newRow = document.createElement("tr");

    newRow.innerHTML = `
        <td>
            <select class="goods" required onchange="populateGoodsDropdown(this)">
                <!-- Options will be populated by JavaScript -->
            </select>
        </td>
        <td><input type="number" class="no-articles" required oninput="calculateTotal(this)"></td>
        <td><input type="number" class="rate-per-article" required oninput="calculateTotal(this)"></td>
        <td>
            <select class="gst" required onchange="calculateTotal(this)">
                <option value="5">5%</option>
                <option value="12">12%</option>
                <option value="18">18%</option>
            </select>
        </td>
        <td><input type="number" class="gst-amt" required readonly></td>
        <td><input type="number" class="freight" required oninput="calculateTotal(this)"></td>
        <td><input type="number" class="total" required readonly></td>
        <td><button type="button" onclick="removeGoodsEntry(this)">Remove</button></td>
    `;

    goodsEntries.appendChild(newRow);
    // Populate the new goods dropdown
    const goodsSelect = newRow.querySelector('.goods');
    populateGoodsDropdown(goodsSelect);
}

// Call this function when the page loads to populate any existing rows
window.onload = function() {
    const goodsSelects = document.querySelectorAll('.goods');
    goodsSelects.forEach(select => {
        populateGoodsDropdown(select);
    });
}





// Function to print the bill preview
function printBill() {
    const printContents = document.getElementById("bill-preview").innerHTML;
    const newWindow = window.open('', '', 'width=600,height=400');
    newWindow.document.write('<html><head><title>Print Bill</title></head><body>');
    newWindow.document.write(printContents);
    newWindow.document.write('</body></html>');
    newWindow.document.close();
    newWindow.print();
}


document.getElementById("billing-form").addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent the form from submitting the traditional way

    // Get values from the form
    const lrNo = document.getElementById("lr-no").value;
    const manualBillNo = document.getElementById("manual-bill-no").value;
    const billNo = document.getElementById("bill-no").value;
    const customerName = document.getElementById("customer-name").value;
    const fromLocation = document.getElementById("from").value;
    const toLocation = document.getElementById("to").value;
    const consignor = document.getElementById("consignor").value;
    const consignee = document.getElementById("consignee").value;
    const goods = document.getElementById("goods").value;
    const noArticles = parseInt(document.getElementById("no-articles").value);
    const ratePerArticle = parseFloat(document.getElementById("rate-per-article").value);
    const gstAmt = parseFloat(document.getElementById("gst-amt").value);
    const freight = parseFloat(document.getElementById("freight").value);
    const total = parseFloat(document.getElementById("total").value);

    // Create a bill object
    const bill = {
        lrNo,
        manualBillNo,
        billNo,
        customerName,
        fromLocation,
        toLocation,
        consignor,
        consignee,
        goods,
        noArticles,
        ratePerArticle,
        gstAmt,
        freight,
        total,
    };

    // Save to local storage
    saveBill(bill);
    displayBills();
    this.reset(); // Reset the form
});

// Function to save bill to local storage
function saveBill(bill) {
    let bills = JSON.parse(localStorage.getItem("bills")) || [];
    bills.push(bill);
    localStorage.setItem("bills", JSON.stringify(bills));
}

// Function to display bills
function displayBills() {
    const billList = document.getElementById("bill-list");
    billList.innerHTML = ""; // Clear existing list
    const bills = JSON.parse(localStorage.getItem("bills")) || [];

    bills.forEach((bill, index) => {
        const billItem = document.createElement("div");
        billItem.innerHTML = `
            <p><strong>LR No:</strong> ${bill.lrNo}</p>
            <p><strong>Manual Bill No:</strong> ${bill.manualBillNo}</p>
            <p><strong>Bill No:</strong> ${bill.billNo}</p>
            <p><strong>Customer Name:</strong> ${bill.customerName}</p>
            <p><strong>From:</strong> ${bill.fromLocation}</p>
            <p><strong>To:</strong> ${bill.toLocation}</p>
            <p><strong>Consignor:</strong> ${bill.consignor}</p>
            <p><strong>Consignee:</strong> ${bill.consignee}</p>
            <p><strong>Goods:</strong> ${bill.goods}</p>
            <p><strong>No. of Articles:</strong> ${bill.noArticles}</p>
            <p><strong>Rate per Article:</strong> ${bill.ratePerArticle}</p>
            <p><strong>GST Amount:</strong> ${bill.gstAmt}</p>
            <p><strong>Freight:</strong> ${bill.freight}</p>
            <p><strong>Total:</strong> ${bill.total}</p>
            <button onclick="deleteBill(${index})">Delete</button>
            <hr>
        `;
        billList.appendChild(billItem);
    });
}

// Function to delete a bill
function deleteBill(index) {
    let bills = JSON.parse(localStorage.getItem("bills")) || [];
    bills.splice(index, 1); // Remove the bill at the given index
    localStorage.setItem("bills", JSON.stringify(bills));
    displayBills(); // Update the displayed bills
}

// Display bills when the page loads
displayBills();