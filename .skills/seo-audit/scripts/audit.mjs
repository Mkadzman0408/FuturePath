#!/usr/bin/env node

import fs from 'fs';
import path from 'path';

// CLI Arguments
const args = process.argv.slice(2);
if (args.length < 2) {
  console.log(`
🚀 SEO Audit Automated CLI Helper
Usage: node audit.mjs <file-path> <primary-keyword> [secondary-keywords,...]

Example:
  node audit.mjs ./blog/post.md "supabase integration" "next.js,ssr"
  `);
  process.exit(0);
}

const filePath = path.resolve(args[0]);
const primaryKeyword = args[1].toLowerCase();
const secondaryKeywords = args[2] ? args[2].split(',').map(k => k.trim().toLowerCase()) : [];

if (!fs.existsSync(filePath)) {
  console.error(`❌ Error: File not found at path "${filePath}"`);
  process.exit(1);
}

const content = fs.readFileSync(filePath, 'utf8');

console.log(`\n🔎 Commencing automated SEO audit for file: ${path.basename(filePath)}`);
console.log(`🎯 Primary Keyword: "${primaryKeyword}"`);
if (secondaryKeywords.length > 0) {
  console.log(`🏷️  Secondary Keywords: ${secondaryKeywords.map(k => `"${k}"`).join(', ')}`);
}
console.log(`------------------------------------------------------------`);

// 1. Text Parsing & Clean Up
const plainText = content.replace(/<[^>]*>/g, '').replace(/[#*`_\[\]()]/g, ''); // Strip HTML tags and markdown symbols
const words = plainText.toLowerCase().match(/\b\w+\b/g) || [];
const totalWordCount = words.length;

// 2. Keyword Frequency & Density
const escapedKw = primaryKeyword.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
const kwRegex = new RegExp(`\\b${escapedKw}\\b`, 'gi');
const kwMatches = content.match(kwRegex) || [];
const kwCount = kwMatches.length;
const kwDensity = totalWordCount > 0 ? ((kwCount / totalWordCount) * 100).toFixed(2) : 0;

// 3. Header Analysis
const lines = content.split('\n');
const headings = [];
let h1Count = 0;
let h2Count = 0;
let h3Count = 0;
let h1Text = '';
let hasKwInH1 = false;
let hasKwInH2 = false;

lines.forEach((line) => {
  const mdHeadingMatch = line.match(/^(#{1,6})\s+(.+)$/);
  if (mdHeadingMatch) {
    const level = mdHeadingMatch[1].length;
    const text = mdHeadingMatch[2].trim();
    headings.push({ level, text });
    if (level === 1) {
      h1Count++;
      h1Text = text;
      if (text.toLowerCase().includes(primaryKeyword)) hasKwInH1 = true;
    }
    if (level === 2) {
      h2Count++;
      if (text.toLowerCase().includes(primaryKeyword)) hasKwInH2 = true;
    }
    if (level === 3) h3Count++;
  }
});

// 4. Link & Image Analysis
const markdownLinkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
const htmlLinkRegex = /<a\s+[^>]*href="([^"]*)"[^>]*>(.*?)<\/a>/g;
const links = [];
let mdLinkMatch;
while ((mdLinkMatch = markdownLinkRegex.exec(content)) !== null) {
  links.push(mdLinkMatch[2]);
}
let htmlLinkMatch;
while ((htmlLinkMatch = htmlLinkRegex.exec(content)) !== null) {
  links.push(htmlLinkMatch[1]);
}

const markdownImgRegex = /!\[([^\]]*)\]\(([^)]+)\)/g;
const images = [];
let mdImgMatch;
while ((mdImgMatch = markdownImgRegex.exec(content)) !== null) {
  images.push({ alt: mdImgMatch[1], src: mdImgMatch[2] });
}

// 5. Paragraph Length Check
const rawParagraphs = content.split(/\n{2,}/);
const paragraphs = rawParagraphs.map(p => p.trim()).filter(p => p.length > 50 && !p.startsWith('#') && !p.startsWith('-') && !p.startsWith('`'));
let longParagraphsCount = 0;

paragraphs.forEach(p => {
  const pWords = p.match(/\b\w+\b/g) || [];
  if (pWords.length > 80) { // Paragraphs with more than 80 words are too long
    longParagraphsCount++;
  }
});

// 6. First 100 Words Check
const first100Words = words.slice(0, 100).join(' ');
const keywordInIntro = first100Words.includes(primaryKeyword);

// 7. Score Calculation
let score = 100;
const deductions = [];

if (totalWordCount < 300) {
  score -= 15;
  deductions.push('🔴 Word count is under 300 words (Thin content)');
} else if (totalWordCount < 600) {
  score -= 5;
  deductions.push('🟡 Word count is short (Under 600 words)');
}

if (h1Count !== 1) {
  score -= 15;
  deductions.push(`🔴 H1 count is ${h1Count}. Exactly one H1 tag is required.`);
} else if (!hasKwInH1) {
  score -= 10;
  deductions.push('🔴 H1 tag does not contain the primary keyword.');
}

if (kwCount === 0) {
  score -= 20;
  deductions.push('🔴 Primary keyword is not found anywhere in the content.');
} else if (kwDensity < 0.5) {
  score -= 10;
  deductions.push(`🔴 Primary keyword density is too low (${kwDensity}%). Target: 1.0% - 2.0%`);
} else if (kwDensity > 2.5) {
  score -= 15;
  deductions.push(`🔴 Primary keyword density is too high (${kwDensity}%) - Risk of keyword stuffing.`);
}

if (!keywordInIntro) {
  score -= 10;
  deductions.push('🔴 Primary keyword is missing from the first 100 words (introduction).');
}

if (h2Count === 0) {
  score -= 10;
  deductions.push('🔴 No H2 tags found. Content structure needs subheadings.');
} else if (!hasKwInH2) {
  score -= 5;
  deductions.push('🟡 None of your H2 headings contain the primary keyword.');
}

if (links.length === 0) {
  score -= 10;
  deductions.push('🔴 No links (internal or external) found in the content.');
}

let missingAltCount = 0;
images.forEach(img => {
  if (!img.alt || img.alt.trim() === '') missingAltCount++;
});
if (missingAltCount > 0) {
  score -= 5;
  deductions.push(`🟡 Found ${missingAltCount} image(s) missing descriptive Alt Text.`);
}

if (longParagraphsCount > 0) {
  score -= 5;
  deductions.push(`🟡 Found ${longParagraphsCount} paragraph(s) that are too long (>80 words). Break them down for readability.`);
}

// Ensure score doesn't go below 0
score = Math.max(0, score);

// Output Results
console.log(`\n📈 AUDIT RESULTS`);
console.log(`============================================================`);
console.log(`🏆 SEO Audit Score: ${score}/100`);
if (score >= 90) {
  console.log(`🟢 Status: Excellent! The article is highly optimized.`);
} else if (score >= 70) {
  console.log(`🟡 Status: Good. A few minor optimizations needed.`);
} else {
  console.log(`🔴 Status: Needs Work. Critical SEO elements are missing.`);
}
console.log(`============================================================`);

console.log(`\n📊 QUANTITATIVE METRICS:`);
console.log(`  • Total Word Count       : ${totalWordCount} words`);
console.log(`  • Primary Keyword Count  : ${kwCount} occurrences`);
console.log(`  • Primary Keyword Density: ${kwDensity}% (Ideal: 1% - 2%)`);
console.log(`  • Headings               : H1: ${h1Count}, H2: ${h2Count}, H3: ${h3Count}`);
console.log(`  • Links Detected         : ${links.length}`);
console.log(`  • Images Detected        : ${images.length} (Missing Alt: ${missingAltCount})`);
console.log(`  • Long Paragraphs (>80w) : ${longParagraphsCount}`);

if (deductions.length > 0) {
  console.log(`\n⚠️  OPTIMIZATION RECOMMENDATIONS:`);
  deductions.forEach(d => console.log(`  ${d}`));
} else {
  console.log(`\n🎉 Outstanding! No critical issues found.`);
}

console.log(`\n------------------------------------------------------------\n`);
