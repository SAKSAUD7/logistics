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

// Function to save the bill (simulation)
function saveBill() {
    alert("Bill saved successfully!");
    // Here you can implement saving logic (e.g., save to database)
}

// Function to modify the bill (simulation)
function modifyBill() {
    alert("Modify Bill functionality not implemented yet.");
    // Implement modify logic
}

// Function to delete the bill (simulation)
function deleteBill() {
    alert("Delete Bill functionality not implemented yet.");
    // Implement delete logic
}

// Function to close the form
function closeForm() {
    document.getElementById("billing-form").reset();
    document.getElementById("goods-form").reset();
    document.getElementById("billing-details-form").reset();
    document.getElementById("bill-preview").style.display = 'none';
}
