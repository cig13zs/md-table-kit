const assert = require('assert');
const MDTableKit = require('./core');

const tsv = 'ID\tName\tRole\n1\tAlice\tAdmin\n2\tBob\tUser';
const rows = MDTableKit.parseText(tsv);
const md = MDTableKit.toMarkdownTable(rows);
assert.strictEqual(md.includes('| ID  | Name  | Role  |'), true);
assert.strictEqual(md.includes('| 1   | Alice | Admin |'), true);
console.log('ok, all MDTableKit assertions passed');
