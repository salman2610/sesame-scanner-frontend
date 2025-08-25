async function runScan() {
  const url = document.getElementById("urlInput").value;
  const resultsBox = document.getElementById("results");
  resultsBox.textContent = "Scanning " + url + " ...";

  try {
    const response = await fetch("https://YOUR-BACKEND-URL.onrender.com/scan", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url })
    });

    const data = await response.json();
    resultsBox.textContent = JSON.stringify(data, null, 2);
  } catch (err) {
    resultsBox.textContent = "Error: " + err;
  }
}
