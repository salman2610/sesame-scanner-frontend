// script.js

async function runScan() {
    const url = document.getElementById("targetUrl").value;
    const resultsDiv = document.getElementById("results");

    if (!url) {
        resultsDiv.innerText = "⚠️ Please enter a target URL";
        return;
    }

    resultsDiv.innerText = "⏳ Running scan, please wait...";

    try {
        const response = await fetch("https://sesame-scanner-backend.onrender.com/scan", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ url: url })
        });

        if (!response.ok) {
            throw new Error(`Server error: ${response.status}`);
        }

        const data = await response.json();
        resultsDiv.innerText = JSON.stringify(data, null, 2);
    } catch (error) {
        resultsDiv.innerText = `❌ Error: ${error.message}`;
        console.error(error);
    }
}
