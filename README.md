# U8Code

U8Code is a Blockly-powered visual website builder that generates real **HTML, CSS, and JavaScript**.

## What's included

- Renamed app and package to **U8Code**
- Live preview
- Copy buttons for HTML, CSS, and JS
- Auto-save to localStorage
- More HTML-like blocks:
  - page
  - generic container tags (`div`, `section`, `header`, `main`, `footer`, `nav`, `article`, `form`)
  - headings
  - paragraph
  - button
  - link
  - image
  - input
  - lists and list items
- CSS blocks:
  - selector + property + value
- JS interaction blocks:
  - on click
  - set text
  - alert

## Run locally

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Deploy to Netlify

- Build command: `npm run build`
- Publish directory: `dist`

## How to use

1. Add a **Page** block.
2. Put content blocks inside the Page block's **body**.
3. Add optional **Style rule** blocks as separate top-level blocks.
4. Add optional **On click** blocks as separate top-level blocks.
5. U8Code generates HTML, CSS, and JS automatically.

## Tips

- For interactions, give elements an **id**.
- Example:
  - Button id: `ctaBtn`
  - Paragraph id: `heroText`
  - Event block: `On click of ctaBtn -> set text of heroText to Hello`
