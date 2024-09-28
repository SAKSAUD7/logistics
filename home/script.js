// Function to display main section
function showSection(sectionId) {
    const sections = document.querySelectorAll('.content-section');
    sections.forEach(section => {
        section.style.display = 'none'; // Hide all sections
    });
    document.getElementById(sectionId).style.display = 'block'; // Show selected section
}

// Function to display billing sub-section
function showBillingSection(sectionId) {
    const billingSections = document.querySelectorAll('.billing-section');
    billingSections.forEach(section => {
        section.style.display = 'none'; // Hide all billing sections
    });
    document.getElementById(sectionId).style.display = 'block'; // Show selected billing section
}

// Set default section on load
window.onload = function() {
    showSection('vehicle-records'); // Default to vehicle records
    showBillingSection('bill'); // Default to billing tab
};

// Vehicle Records Functions
function addVehicleRow() {
    const tableBody = document.getElementById('vehicle-body');

    // Create a new row
    const newRow = document.createElement('tr');

    // Create cells for the new row
    newRow.innerHTML = `
        <td><input type="file" onchange="previewImage(event)"></td>
        <td><input type="text" placeholder="Vehicle Name"></td>
        <td><input type="date" onchange="checkInsuranceExpiry(this)"></td>
        <td><button onclick="alert('Alert for insurance expiry!')">Set Alert</button></td>
    `;

    // Append the new row to the table body
    tableBody.appendChild(newRow);
}

function previewImage(event) {
    const file = event.target.files[0];
    if (file) {
        const img = document.createElement('img');
        img.src = URL.createObjectURL(file);
        img.style.width = '100px';
        img.style.height = '100px';
        event.target.parentElement.appendChild(img);
    }
}

function checkInsuranceExpiry(input) {
    const expiryDate = new Date(input.value);
    const today = new Date();

    // Check if the insurance is expiring in the next 30 days
    if ((expiryDate - today) <= 30 * 24 * 60 * 60 * 1000 && expiryDate >= today) {
        alert('Insurance is expiring soon!');
    }
}

// Calculator Functions
let calcDisplay = document.getElementById('calc-display');

function appendValue(value) {
    calcDisplay.value += value;
}

function clearDisplay() {
    calcDisplay.value = '';
}

function calculateResult() {
    try {
        calcDisplay.value = eval(calcDisplay.value);
    } catch (error) {
        calcDisplay.value = 'Error';
    }
}

// Notepad Functions
let notepadContent = document.getElementById('notepad-content');

function saveNote() {
    const note = notepadContent.value;
    localStorage.setItem('savedNote', note);
    alert("Note saved!");
}

function clearNote() {
    notepadContent.value = '';
    localStorage.removeItem('savedNote');
    alert("Note cleared!");
}

// Load saved note on page load
window.onload = function() {
    const savedNote = localStorage.getItem('savedNote');
    if (savedNote) {
        notepadContent.value = savedNote;
    }
};
