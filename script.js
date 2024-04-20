document.getElementById("plotBtn").addEventListener("click", function() {
    const userInput = document.getElementById("plotInput").value.trim();
    if (!userInput) {
        alert("Please enter a plot to access the features.");
        return;
    }

    const header = document.getElementById('mainHeader');
    header.textContent += " for ";
    header.textContent += userInput;
});