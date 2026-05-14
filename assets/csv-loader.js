/**
 * CSV Loader & Template Renderer for CMI Lab website.
 * All page content is driven by CSV files in /data/.
 */

const DATA_BASE = (function () {
  const s = document.currentScript;
  const base = s ? s.getAttribute('data-base') || '' : '';
  return base;
})();

function csvParse(text) {
  const lines = text.trim().split('\n');
  if (lines.length < 2) return [];
  const headers = parseCsvLine(lines[0]);
  const rows = [];
  for (let i = 1; i < lines.length; i++) {
    const vals = parseCsvLine(lines[i]);
    const obj = {};
    headers.forEach((h, idx) => { obj[h.trim()] = (vals[idx] || '').trim(); });
    rows.push(obj);
  }
  return rows;
}

function parseCsvLine(line) {
  const result = [];
  let cur = '';
  let inQuotes = false;
  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (ch === '"') {
      if (inQuotes && line[i + 1] === '"') { cur += '"'; i++; }
      else { inQuotes = !inQuotes; }
    } else if (ch === ',' && !inQuotes) {
      result.push(cur); cur = '';
    } else {
      cur += ch;
    }
  }
  result.push(cur);
  return result;
}

async function loadCSV(filename) {
  const resp = await fetch(DATA_BASE + 'data/' + filename);
  if (!resp.ok) throw new Error('Failed to load ' + filename);
  const text = await resp.text();
  return csvParse(text);
}

async function loadSiteConfig() {
  const rows = await loadCSV('site.csv');
  const cfg = {};
  rows.forEach(r => { cfg[r.key] = { zh: r.zh, en: r.en }; });
  return cfg;
}

function el(tag, attrs, ...children) {
  const e = document.createElement(tag);
  if (attrs) Object.entries(attrs).forEach(([k, v]) => {
    if (k === 'className') e.className = v;
    else if (k === 'innerHTML') e.innerHTML = v;
    else e.setAttribute(k, v);
  });
  children.forEach(c => {
    if (typeof c === 'string') e.appendChild(document.createTextNode(c));
    else if (c) e.appendChild(c);
  });
  return e;
}

window.CMI = { loadCSV, loadSiteConfig, csvParse, el, DATA_BASE };
