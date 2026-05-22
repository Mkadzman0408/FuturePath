---
name: seo-audit
description: Perform comprehensive SEO audits on blog articles, content drafts, and web pages. Use when asked to optimize articles for search engines, verify keyword distribution, check title/meta tags, or audit reading engagement.
license: MIT
metadata:
  version: "1.0"
  author: SEO-Specialist-Agent
---

# Blog Article SEO Audit Guide

This skill guides the agent in performing a comprehensive On-Page SEO and content readability audit for blog articles, generating a structured PDF-ready report.

## 📋 Audit Workflow

When asked to audit an article, follow these steps:

1. **Information Gathering**:
   - Identify the **Target Primary Keyword** (and secondary keywords if any).
   - Identify the **Target Audience** and **Search Intent** (Informational, Transactional, Navigational, Commercial).
   - Get the article text (Markdown, HTML, or raw text) and the proposed Title and Meta Description.

2. **Automated Analysis**:
   - Run the bundled audit script `scripts/audit.mjs` (if a file path is provided) to get a quantitative analysis of character lengths, tag hierarchy, links, and keyword distribution.

3. **Qualitative Evaluation**:
   - **Keyword Placement**: Verify keyword presence in Title (preferably at start), Meta Description, H1, first 100 words, and at least one H2.
   - **Heading Hierarchy**: Ensure H1 is unique, and subheadings nest logically (H2 -> H3 -> H4).
   - **Internal/External Linking**: Look for natural places to insert contextually relevant links.
   - **Readability & Engagement**: Check for excessively long paragraphs (keep to 2-3 sentences), transition words, passive voice, and clear formatting (bullet points, bold text).
   - **Rich Results**: Recommend Schema markup opportunities (Article, FAQ) and Featured Snippet optimization (direct definitions or numbered lists).

4. **Deliver Report**:
   - Provide a beautifully structured, comprehensive audit report using the **SEO Audit Report Template** below.

---

## 📐 Strict SEO Standards Checklist

### 1. Meta Tags & URL
*   **SEO Title**: 50–60 characters. Must contain primary keyword near the beginning.
*   **Meta Description**: 120–160 characters. Must contain the primary keyword and a clear Call-To-Action (CTA).
*   **URL Slug**: Short, lowercase, hyphen-separated, containing only the primary keyword (e.g., `/blog/supabase-nextjs-setup` instead of `/blog/how-to-setup-supabase-with-nextjs-easily-2026`).

### 2. Heading Structure & Keywords
*   **H1 (Title)**: Exactly one per page. Must contain the primary keyword.
*   **H2/H3 (Subheadings)**: Incorporate secondary keywords naturally. No H3 should exist without a parent H2.
*   **Keyword Density**: Maintain between **1.0% to 2.0%** for the primary keyword. Avoid keyword stuffing.

### 3. Readability & Engagement
*   **Paragraph Length**: Maximum 3 sentences. Break down blocks of text to satisfy mobile readers.
*   **Visual Assets**: Every ~300 words should be broken up by a visual element (image, code block, quote block, callout card, or bulleted list).
*   **Alt Text**: Every image must have descriptive alt text containing secondary keywords where natural.

---

## 📄 SEO Audit Report Template

```markdown
# 🔍 SEO Audit Report: [Article Title]

## 📊 Executive Summary
*   **Primary Keyword**: `[keyword]`
*   **Search Intent**: `[Intent Type]`
*   **SEO Score**: `[X/100]` (Based on script calculations and manual checks)
*   **Critical Actions Required**:
    1.  `[Action 1]`
    2.  `[Action 2]`

---

## 🛠️ On-Page Technical Meta Audit

| Element | Current | Recommended | Status |
| :--- | :--- | :--- | :--- |
| **SEO Title** | `[Title] ([Len] Chars)` | `[Rec Title] (50-60 Chars)` | `[✅ Optimized / ⚠️ Too Long / ❌ Missing]` |
| **Meta Description**| `[Desc] ([Len] Chars)` | `[Rec Desc] (120-160 Chars)` | `[✅ Optimized / ⚠️ Too Short / ❌ No CTA]` |
| **URL Slug** | `[Slug]` | `[Rec Slug]` | `[✅ Perfect / ⚠️ Suboptimal]` |

---

## 🧱 Content Architecture & Keyword Analysis

### Heading Hierarchy Verification
`[Render a visual bulleted hierarchy, e.g.:]`
- 🟢 H1: [H1 Title] (Contains Keyword)
  - 🟢 H2: [H2 Title 1]
    - 🟢 H3: [H3 Title]
  - 🟡 H2: [H2 Title 2] (Missing secondary keywords)

### Keyword Distribution Heatmap
*   **Intro (First 100 words)**: `[✅ Present / ❌ Missing]`
*   **Heading Placement**: `[✅ Found in H1 & H2s / ⚠️ Only in H1]`
*   **Body Density**: `[X.X%]` (Target: 1%–2%)
*   **Conclusion**: `[✅ Present / ❌ Missing]`

---

## ✍️ Readability & User Experience (UX)
*   **Average Paragraph Length**: `[Short/Medium/Long]`
*   **Passive Voice**: `[Low/Medium/High]`
*   **Formatting Check**: `[e.g., Good use of bullet points and bolding / Needs more spacing]`

---

## 💡 Rich Results & Optimization Suggestions
*   **Featured Snippet Opportunity**: `[Identify a section to convert into a Q&A definition block or a numbered list]`
*   **Recommended Schema Markup**:
    ```json
    // Add recommended JSON-LD Schema example here (Article, FAQSchema, etc.)
    ```
```
