;(function (root, factory) {
  if (typeof module === 'object' && module.exports) module.exports = factory();
  else root.MDTableKit = factory();
})(typeof self !== 'undefined' ? self : this, function () {

  function parseText(input) {
    const lines = input.trim().split(/\r?\n/).filter(l => l.trim().length > 0);
    if (!lines.length) return [];
    
    // Check if markdown table
    if (lines[0].includes('|')) {
      const rows = [];
      for (const line of lines) {
        if (/^\s*\|?\s*:?-+:?\s*\|/.test(line)) continue;
        const cells = line.split('|').map(c => c.trim());
        if (cells.length > 1) {
          if (cells[0] === '') cells.shift();
          if (cells[cells.length - 1] === '') cells.pop();
          rows.push(cells);
        }
      }
      if (rows.length) return rows;
    }

    const isTab = lines[0].includes('\t');
    const delim = isTab ? '\t' : ',';
    return lines.map(line => line.split(delim).map(c => c.trim()));
  }

  function toMarkdownTable(rows, alignment) {
    if (!rows || !rows.length) return '';
    alignment = alignment || 'left';
    
    const colCount = rows.reduce((max, r) => Math.max(max, r.length), 0);
    const colWidths = Array(colCount).fill(3);

    for (const r of rows) {
      for (let i = 0; i < colCount; i++) {
        const len = (r[i] || '').length;
        if (len > colWidths[i]) colWidths[i] = len;
      }
    }

    const pad = (str, len) => (str + ' '.repeat(len)).slice(0, len);
    const result = [];

    // Header
    const headerRow = rows[0] || [];
    const hCells = [];
    for (let i = 0; i < colCount; i++) hCells.push(pad(headerRow[i] || ('Col ' + (i + 1)), colWidths[i]));
    result.push('| ' + hCells.join(' | ') + ' |');

    // Separator
    const sCells = [];
    for (let i = 0; i < colCount; i++) {
      const w = colWidths[i];
      if (alignment === 'center') sCells.push(':' + '-'.repeat(Math.max(1, w - 2)) + ':');
      else if (alignment === 'right') sCells.push('-'.repeat(Math.max(2, w - 1)) + ':');
      else sCells.push('-'.repeat(w));
    }
    result.push('| ' + sCells.join(' | ') + ' |');

    // Data rows
    for (let i = 1; i < rows.length; i++) {
      const r = rows[i];
      const dCells = [];
      for (let j = 0; j < colCount; j++) dCells.push(pad(r[j] || '', colWidths[j]));
      result.push('| ' + dCells.join(' | ') + ' |');
    }

    return result.join('\n');
  }

  return { parseText: parseText, toMarkdownTable: toMarkdownTable };
});
