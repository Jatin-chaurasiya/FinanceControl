import fs from 'fs';
import path from 'path';

const COMPONENTS_DIR = path.join(process.cwd(), 'src', 'components');

function isJsxFile(name) {
  return name.endsWith('.jsx') || name.endsWith('.js') || name.endsWith('.tsx');
}

function countLines(content) {
  const lines = content.split(/\r?\n/);
  let total = lines.length;
  let blank = 0;
  let commentOnly = 0;
  let inBlock = false;

  for (let raw of lines) {
    const line = raw.replace(/\t/g, '    ');
    const trimmed = line.trim();
    if (trimmed === '') {
      blank++;
      continue;
    }

    // Handle block comments /* ... */
    if (inBlock) {
      commentOnly++;
      if (trimmed.includes('*/')) {
        inBlock = false;
      }
      continue;
    }

    if (trimmed.startsWith('/*')) {
      commentOnly++;
      if (!trimmed.includes('*/')) inBlock = true;
      continue;
    }

    // JSX comment single-line: {/* ... */}
    if (trimmed.startsWith('{/*') && trimmed.endsWith('*/}')) {
      commentOnly++;
      continue;
    }

    // JS single-line comment
    if (trimmed.startsWith('//')) {
      commentOnly++;
      continue;
    }

    // If line is a JSX comment that starts with {/* but doesn't end, treat as comment-only
    if (trimmed.startsWith('{/*') && !trimmed.endsWith('*/}')) {
      commentOnly++;
      // no reliable multi-line JSX comment handling; assume single-line for most cases
      continue;
    }

    // Otherwise consider it source
  }

  const sloc = total - blank - commentOnly;
  return { total, blank, commentOnly, sloc };
}

function walkDir(dir) {
  const res = [];
  const items = fs.readdirSync(dir, { withFileTypes: true });
  for (const it of items) {
    const full = path.join(dir, it.name);
    if (it.isDirectory()) {
      res.push(...walkDir(full));
    } else if (it.isFile() && isJsxFile(it.name)) {
      res.push(full);
    }
  }
  return res;
}

function main() {
  if (!fs.existsSync(COMPONENTS_DIR)) {
    console.error('Components directory not found:', COMPONENTS_DIR);
    process.exit(1);
  }

  const files = walkDir(COMPONENTS_DIR).filter(f => f.endsWith('.jsx'));
  if (files.length === 0) {
    console.log('No .jsx files found under src/components');
    return;
  }

  let totals = { total: 0, blank: 0, commentOnly: 0, sloc: 0 };
  const results = [];

  for (const file of files) {
    const content = fs.readFileSync(file, 'utf8');
    const counts = countLines(content);
    results.push({ file: path.relative(process.cwd(), file).replace(/\\/g, '/'), ...counts });
    totals.total += counts.total;
    totals.blank += counts.blank;
    totals.commentOnly += counts.commentOnly;
    totals.sloc += counts.sloc;
  }

  // Print results
  console.log('\nCode count report for src/components (JSX files):\n');
  for (const r of results) {
    console.log(`${r.file}: total=${r.total}, blank=${r.blank}, comments=${r.commentOnly}, sloc=${r.sloc}`);
  }
  console.log('\nTotals:');
  console.log(`files: ${results.length}, total lines=${totals.total}, blank=${totals.blank}, comments=${totals.commentOnly}, sloc=${totals.sloc}\n`);
}

main();
