// script.js
const backendUrl = "https://sesame-scanner-backend.onrender.com"; // <-- keep this

document.getElementById("scanBtn").addEventListener("click", runScan);
document.getElementById("urlInput").addEventListener("keypress", function(e){
  if (e.key === "Enter") runScan();
});

async function runScan() {
  const target = document.getElementById("urlInput").value.trim();
  const status = document.getElementById("status");
  const results = document.getElementById("results");
  results.innerHTML = "";
  if (!target) {
    status.innerText = "Please enter a URL.";
    return;
  }
  status.innerText = "Scanning… (quick preview)";
  try {
    const resp = await fetch(`${backendUrl}/scan`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url: target })
    });
    if (!resp.ok) {
      const e = await resp.json().catch(()=>({error:resp.statusText}));
      status.innerText = "Scan failed: " + (e.error || resp.status);
      return;
    }
    const data = await resp.json();
    status.innerText = `Preview (${data.issues_preview.length} shown)`; 
    if (!data.issues_preview || !data.issues_preview.length) {
      results.innerHTML = `<div class="issue"><h3>No quick issues found</h3><p class="dim">Contact Sesame for full assessment.</p></div>`;
      return;
    }
    // Render issues preview
    for (const it of data.issues_preview) {
      const div = document.createElement("div");
      div.className = "issue";
      const title = it.title || it.issue || it.type || "Issue";
      const severity = it.severity ? `<strong>Severity:</strong> ${it.severity}` : "";
      const desc = it.description || it.title || "";
      div.innerHTML = `<h3>${title}</h3><p>${severity}</p><p>${desc}</p>`;
      results.appendChild(div);
    }
    if (data.locked_count && data.locked_count > 0) {
      const more = document.createElement("div");
      more.className = "issue";
      more.innerHTML = `<h3>+${data.locked_count} more findings (locked)</h3>
        <p class="dim">Contact <b>Sesame Technologies</b> for the full assessment.</p>`;
      results.appendChild(more);
    } else {
      const note = document.createElement("div");
      note.className = "issue";
      note.innerHTML = `<p class="dim">This was a quick preview. Contact <b>Sesame Technologies</b> for a full security audit.</p>`;
      results.appendChild(note);
    }
  } catch (err) {
    status.innerText = "Error connecting to backend";
    results.innerHTML = `<div class="issue"><h3>Error</h3><p class="dim">${err.message}</p></div>`;
    console.error(err);
  }
}
