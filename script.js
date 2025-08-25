async function scanWebsite() {
    const url = document.getElementById("urlInput").value;
    if (!url) {
        alert("Please enter a URL");
        return;
    }

    document.getElementById("results").innerHTML = "Scanning...";

    try {
        const response = await fetch("https://sesame-scanner-backend.onrender.com/scan", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ url: url })
        });

        const data = await response.json();

        let output = "<h3>Scan Results</h3><ul>";
        for (const [issue, detail] of Object.entries(data.issues)) {
            output += `<li><strong>${issue}:</strong> ${detail}</li>`;
        }
        output += "</ul>";

        document.getElementById("results").innerHTML = output;

    } catch (error) {
        document.getElementById("results").innerHTML = "Error: " + error.message;
    }
}
