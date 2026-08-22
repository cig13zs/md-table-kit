const sample = "Feature\tStatus\tNotes\nOffline Execution\tSupported\t100% Client-Side\nZero Telemetry\tEnforced\tNo data collected\nMIT License\tActive\tOpen source portfolio";

const inputEl = document.getElementById('input');
const outputEl = document.getElementById('output');
const statsEl = document.getElementById('output-stats') || document.getElementById('stats');

function process() {
  const txt = inputEl.value;
  if (!txt.trim()) { outputEl.value = ''; if (statsEl) statsEl.textContent = 'Empty input'; return; }
  try {
    const rows = MDTableKit.parseText(txt);
    const md = MDTableKit.toMarkdownTable(rows);
    outputEl.value = md;
    if (statsEl) statsEl.textContent = `Generated table: ${rows.length} rows`;
  } catch (err) {
    outputEl.value = 'Error: ' + err.message;
  }
}

document.getElementById('btn-run').addEventListener('click', process);
inputEl.addEventListener('input', process);
document.getElementById('btn-sample').addEventListener('click', () => { inputEl.value = sample; process(); });
document.getElementById('btn-copy').addEventListener('click', () => { navigator.clipboard.writeText(outputEl.value); alert('Copied Markdown Table!'); });
if (document.getElementById('btn-clear')) document.getElementById('btn-clear').addEventListener('click', () => { inputEl.value = ''; outputEl.value = ''; });
