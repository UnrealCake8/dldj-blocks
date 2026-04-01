function escapeHtml(value = "") {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function escapeAttribute(value = "") {
  return escapeHtml(value).replaceAll("'", "&#39;");
}

function sanitizeCustomHtml(html = "") {
  return String(html)
    .replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, "")
    .replace(/\son\w+="[^"]*"/gi, "")
    .replace(/\son\w+='[^']*'/gi, "");
}

function attrs({
  id, className, href, src, alt, type, name, placeholder,
  cite, forAttr, rows, cols, width, height, value,
  controls, autoplay, loop, checked, selected
}) {
  const parts = [];
  if (id) parts.push(`id="${escapeAttribute(id)}"`);
  if (className) parts.push(`class="${escapeAttribute(className)}"`);
  if (href) parts.push(`href="${escapeAttribute(href)}"`);
  if (src) parts.push(`src="${escapeAttribute(src)}"`);
  if (alt) parts.push(`alt="${escapeAttribute(alt)}"`);
  if (type) parts.push(`type="${escapeAttribute(type)}"`);
  if (name) parts.push(`name="${escapeAttribute(name)}"`);
  if (placeholder) parts.push(`placeholder="${escapeAttribute(placeholder)}"`);
  if (cite) parts.push(`cite="${escapeAttribute(cite)}"`);
  if (forAttr) parts.push(`for="${escapeAttribute(forAttr)}"`);
  if (rows) parts.push(`rows="${escapeAttribute(rows)}"`);
  if (cols) parts.push(`cols="${escapeAttribute(cols)}"`);
  if (width) parts.push(`width="${escapeAttribute(width)}"`);
  if (height) parts.push(`height="${escapeAttribute(height)}"`);
  if (value) parts.push(`value="${escapeAttribute(value)}"`);
  if (controls) parts.push('controls');
  if (autoplay) parts.push('autoplay');
  if (loop) parts.push('loop');
  if (checked) parts.push('checked');
  if (selected) parts.push('selected');
  return parts.length ? " " + parts.join(" ") : "";
}

function indent(text, level = 1) {
  const prefix = "  ".repeat(level);
  return text
    .split("\n")
    .map((line) => (line.trim() ? prefix + line : line))
    .join("\n");
}

function statementBlock(block, inputName) {
  return block.getInputTargetBlock(inputName);
}

function nextBlock(block) {
  return block?.getNextBlock?.() || null;
}

function generateChildren(firstBlock, level = 1) {
  const parts = [];
  let current = firstBlock;

  while (current) {
    const generated = generateElement(current, level);
    if (generated) parts.push(generated);
    current = nextBlock(current);
  }

  return parts.join("\n");
}

function generateElement(block, level = 1) {
  const type = block.type;

  if (type === "container_block") {
    const tag = block.getFieldValue("TAG") || "div";
    const id = block.getFieldValue("ID");
    const className = block.getFieldValue("CLASS");
    const children = generateChildren(statementBlock(block, "CHILDREN"), level + 1);
    const open = `<${tag}${attrs({ id, className })}>`;
    const close = `</${tag}>`;

    if (children.trim()) {
      return `${"  ".repeat(level)}${open}\n${children}\n${"  ".repeat(level)}${close}`;
    }

    return `${"  ".repeat(level)}${open}${close}`;
  }

  if (type === "heading_block") {
    const tag = block.getFieldValue("LEVEL") || "h1";
    const text = escapeHtml(block.getFieldValue("TEXT"));
    const id = block.getFieldValue("ID");
    const className = block.getFieldValue("CLASS");
    return `${"  ".repeat(level)}<${tag}${attrs({ id, className })}>${text}</${tag}>`;
  }

  if (type === "paragraph_block") {
    const text = escapeHtml(block.getFieldValue("TEXT"));
    const id = block.getFieldValue("ID");
    const className = block.getFieldValue("CLASS");
    return `${"  ".repeat(level)}<p${attrs({ id, className })}>${text}</p>`;
  }

  if (type === "button_block") {
    const text = escapeHtml(block.getFieldValue("TEXT"));
    const id = block.getFieldValue("ID");
    const className = block.getFieldValue("CLASS");
    return `${"  ".repeat(level)}<button${attrs({ id, className })}>${text}</button>`;
  }

  if (type === "link_block") {
    const text = escapeHtml(block.getFieldValue("TEXT"));
    const href = block.getFieldValue("HREF");
    const id = block.getFieldValue("ID");
    const className = block.getFieldValue("CLASS");
    return `${"  ".repeat(level)}<a${attrs({ id, className, href })}>${text}</a>`;
  }

  if (type === "image_block") {
    const src = block.getFieldValue("SRC");
    const alt = block.getFieldValue("ALT");
    const id = block.getFieldValue("ID");
    const className = block.getFieldValue("CLASS");
    return `${"  ".repeat(level)}<img${attrs({ id, className, src, alt })} />`;
  }

  if (type === "input_block") {
    const inputType = block.getFieldValue("TYPE");
    const name = block.getFieldValue("NAME");
    const placeholder = block.getFieldValue("PLACEHOLDER");
    const id = block.getFieldValue("ID");
    const className = block.getFieldValue("CLASS");

    return `${"  ".repeat(level)}<input${attrs({
      id,
      className,
      type: inputType,
      name,
      placeholder
    })} />`;
  }

  if (type === "list_block") {
    const tag = block.getFieldValue("TAG") || "ul";
    const id = block.getFieldValue("ID");
    const className = block.getFieldValue("CLASS");
    const children = generateChildren(statementBlock(block, "ITEMS"), level + 1);
    const open = `<${tag}${attrs({ id, className })}>`;
    const close = `</${tag}>`;

    if (children.trim()) {
      return `${"  ".repeat(level)}${open}\n${children}\n${"  ".repeat(level)}${close}`;
    }

    return `${"  ".repeat(level)}${open}${close}`;
  }

  if (type === "list_item_block") {
    const text = escapeHtml(block.getFieldValue("TEXT"));
    const id = block.getFieldValue("ID");
    const className = block.getFieldValue("CLASS");
    return `${"  ".repeat(level)}<li${attrs({ id, className })}>${text}</li>`;
  }

if (type === "custom_html_block") {
    const rawHtml = block.getFieldValue("HTML") || "";
    const safeHtml = sanitizeCustomHtml(rawHtml);
    return `${"  ".repeat(level)}${safeHtml}`;
  }

  // Text blocks
  if (type === "span_block") {
    const text = escapeHtml(block.getFieldValue("TEXT"));
    const id = block.getFieldValue("ID");
    const className = block.getFieldValue("CLASS");
    return `${"  ".repeat(level)}<span${attrs({ id, className })}>${text}</span>`;
  }

  if (type === "blockquote_block") {
    const text = escapeHtml(block.getFieldValue("TEXT"));
    const cite = block.getFieldValue("CITE");
    const id = block.getFieldValue("ID");
    const className = block.getFieldValue("CLASS");
    return `${"  ".repeat(level)}<blockquote${attrs({ id, className, cite })}>${text}</blockquote>`;
  }

  if (type === "code_block") {
    const text = escapeHtml(block.getFieldValue("TEXT"));
    const id = block.getFieldValue("ID");
    const className = block.getFieldValue("CLASS");
    return `${"  ".repeat(level)}<code${attrs({ id, className })}>${text}</code>`;
  }

  if (type === "pre_block") {
    const id = block.getFieldValue("ID");
    const className = block.getFieldValue("CLASS");
    const children = generateChildren(statementBlock(block, "CHILDREN"), level + 1);
    const open = `<pre${attrs({ id, className })}>`;
    const close = `</pre>`;

    if (children.trim()) {
      return `${"  ".repeat(level)}${open}\n${children}\n${"  ".repeat(level)}${close}`;
    }

    return `${"  ".repeat(level)}${open}${close}`;
  }

  if (type === "br_block") {
    return `${"  ".repeat(level)}<br />`;
  }

  if (type === "hr_block") {
    const id = block.getFieldValue("ID");
    const className = block.getFieldValue("CLASS");
    return `${"  ".repeat(level)}<hr${attrs({ id, className })} />`;
  }

  // Media blocks
  if (type === "video_block") {
    const src = block.getFieldValue("SRC");
    const id = block.getFieldValue("ID");
    const className = block.getFieldValue("CLASS");
    const controls = block.getFieldValue("CONTROLS") === "TRUE";
    const autoplay = block.getFieldValue("AUTOPLAY") === "TRUE";
    const loop = block.getFieldValue("LOOP") === "TRUE";
    return `${"  ".repeat(level)}<video${attrs({ id, className, src, controls, autoplay, loop })}></video>`;
  }

  if (type === "audio_block") {
    const src = block.getFieldValue("SRC");
    const id = block.getFieldValue("ID");
    const className = block.getFieldValue("CLASS");
    const controls = block.getFieldValue("CONTROLS") === "TRUE";
    const autoplay = block.getFieldValue("AUTOPLAY") === "TRUE";
    const loop = block.getFieldValue("LOOP") === "TRUE";
    return `${"  ".repeat(level)}<audio${attrs({ id, className, src, controls, autoplay, loop })}></audio>`;
  }

  if (type === "iframe_block") {
    const src = block.getFieldValue("SRC");
    const width = block.getFieldValue("WIDTH");
    const height = block.getFieldValue("HEIGHT");
    const id = block.getFieldValue("ID");
    const className = block.getFieldValue("CLASS");
    return `${"  ".repeat(level)}<iframe${attrs({ id, className, src, width, height })}></iframe>`;
  }

  // Form blocks
  if (type === "textarea_block") {
    const name = block.getFieldValue("NAME");
    const placeholder = block.getFieldValue("PLACEHOLDER");
    const rows = block.getFieldValue("ROWS");
    const cols = block.getFieldValue("COLS");
    const id = block.getFieldValue("ID");
    const className = block.getFieldValue("CLASS");
    return `${"  ".repeat(level)}<textarea${attrs({ id, className, name, placeholder, rows, cols })}></textarea>`;
  }

  if (type === "select_block") {
    const name = block.getFieldValue("NAME");
    const id = block.getFieldValue("ID");
    const className = block.getFieldValue("CLASS");
    const options = generateChildren(statementBlock(block, "OPTIONS"), level + 1);
    const open = `<select${attrs({ id, className, name })}>`;
    const close = `</select>`;

    if (options.trim()) {
      return `${"  ".repeat(level)}${open}\n${options}\n${"  ".repeat(level)}${close}`;
    }

    return `${"  ".repeat(level)}${open}${close}`;
  }

  if (type === "option_block") {
    const value = block.getFieldValue("VALUE");
    const text = escapeHtml(block.getFieldValue("TEXT"));
    const selected = block.getFieldValue("SELECTED") === "TRUE";
    return `${"  ".repeat(level)}<option${attrs({ value, selected })}>${text}</option>`;
  }

  if (type === "checkbox_block") {
    const name = block.getFieldValue("NAME");
    const value = block.getFieldValue("VALUE");
    const checked = block.getFieldValue("CHECKED") === "TRUE";
    const id = block.getFieldValue("ID");
    const className = block.getFieldValue("CLASS");
    return `${"  ".repeat(level)}<input${attrs({ id, className, type: "checkbox", name, value, checked })} />`;
  }

  if (type === "radio_block") {
    const name = block.getFieldValue("NAME");
    const value = block.getFieldValue("VALUE");
    const checked = block.getFieldValue("CHECKED") === "TRUE";
    const id = block.getFieldValue("ID");
    const className = block.getFieldValue("CLASS");
    return `${"  ".repeat(level)}<input${attrs({ id, className, type: "radio", name, value, checked })} />`;
  }

  if (type === "label_block") {
    const text = escapeHtml(block.getFieldValue("TEXT"));
    const forAttr = block.getFieldValue("FOR");
    const id = block.getFieldValue("ID");
    const className = block.getFieldValue("CLASS");
    return `${"  ".repeat(level)}<label${attrs({ id, className, forAttr })}>${text}</label>`;
  }

  // Table blocks
  if (type === "table_block") {
    const id = block.getFieldValue("ID");
    const className = block.getFieldValue("CLASS");
    const children = generateChildren(statementBlock(block, "CHILDREN"), level + 1);
    const open = `<table${attrs({ id, className })}>`;
    const close = `</table>`;

    if (children.trim()) {
      return `${"  ".repeat(level)}${open}\n${children}\n${"  ".repeat(level)}${close}`;
    }

    return `${"  ".repeat(level)}${open}${close}`;
  }

  if (type === "table_row_block") {
    const id = block.getFieldValue("ID");
    const className = block.getFieldValue("CLASS");
    const cells = generateChildren(statementBlock(block, "CELLS"), level + 1);
    const open = `<tr${attrs({ id, className })}>`;
    const close = `</tr>`;

    if (cells.trim()) {
      return `${"  ".repeat(level)}${open}\n${cells}\n${"  ".repeat(level)}${close}`;
    }

    return `${"  ".repeat(level)}${open}${close}`;
  }

  if (type === "table_header_block") {
    const text = escapeHtml(block.getFieldValue("TEXT"));
    const id = block.getFieldValue("ID");
    const className = block.getFieldValue("CLASS");
    return `${"  ".repeat(level)}<th${attrs({ id, className })}>${text}</th>`;
  }

  if (type === "table_cell_block") {
    const text = escapeHtml(block.getFieldValue("TEXT"));
    const id = block.getFieldValue("ID");
    const className = block.getFieldValue("CLASS");
    return `${"  ".repeat(level)}<td${attrs({ id, className })}>${text}</td>`;
  }

  return "";
}

function generateCss(workspace) {
  const rules = [];
  const topBlocks = workspace.getTopBlocks(true);

  topBlocks.forEach((block) => {
    if (block.type === "style_rule_block") {
      const selector = block.getFieldValue("SELECTOR")?.trim();
      const property = block.getFieldValue("PROPERTY")?.trim();
      const value = block.getFieldValue("VALUE")?.trim();

      if (selector && property && value) {
        rules.push(`${selector} {\n  ${property}: ${value};\n}`);
      }
    }
  });

const baseCss = `
body {
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 32px;
  line-height: 1.5;
}

img,
video,
iframe {
  max-width: 100%;
  height: auto;
  display: block;
}

button {
  cursor: pointer;
}

input,
textarea,
select,
button {
  font: inherit;
}

table {
  border-collapse: collapse;
  width: 100%;
}

th,
td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}

th {
  background-color: #f2f2f2;
  font-weight: bold;
}

blockquote {
  margin: 1em 0;
  padding-left: 1em;
  border-left: 3px solid #ccc;
}

pre {
  background-color: #f5f5f5;
  padding: 1em;
  border-radius: 4px;
  overflow-x: auto;
}

code {
  background-color: #f5f5f5;
  padding: 0.2em 0.4em;
  border-radius: 3px;
  font-family: monospace;
}
`.trim();

  return [baseCss, ...rules].join("\n\n");
}

function generateAction(actionBlock) {
  const type = actionBlock.type;

  if (type === "set_text_action") {
    const targetId = actionBlock.getFieldValue("TARGET_ID") || "";
    const text = JSON.stringify(actionBlock.getFieldValue("TEXT") || "");
    return `const el = document.getElementById(${JSON.stringify(targetId)});
if (el) {
  el.textContent = ${text};
}`;
  }

  if (type === "alert_action") {
    const message = JSON.stringify(actionBlock.getFieldValue("MESSAGE") || "");
    return `alert(${message});`;
  }

  if (type === "console_log_action") {
    const message = JSON.stringify(actionBlock.getFieldValue("MESSAGE") || "");
    return `console.log(${message});`;
  }

  if (type === "show_element_action") {
    const targetId = actionBlock.getFieldValue("TARGET_ID") || "";
    return `const el = document.getElementById(${JSON.stringify(targetId)});
if (el) {
  el.style.display = "block";
}`;
  }

  if (type === "hide_element_action") {
    const targetId = actionBlock.getFieldValue("TARGET_ID") || "";
    return `const el = document.getElementById(${JSON.stringify(targetId)});
if (el) {
  el.style.display = "none";
}`;
  }

  if (type === "toggle_class_action") {
    const targetId = actionBlock.getFieldValue("TARGET_ID") || "";
    const className = actionBlock.getFieldValue("CLASS_NAME") || "";
    return `const el = document.getElementById(${JSON.stringify(targetId)});
if (el) {
  el.classList.toggle(${JSON.stringify(className)});
}`;
  }

  if (type === "add_class_action") {
    const targetId = actionBlock.getFieldValue("TARGET_ID") || "";
    const className = actionBlock.getFieldValue("CLASS_NAME") || "";
    return `const el = document.getElementById(${JSON.stringify(targetId)});
if (el) {
  el.classList.add(${JSON.stringify(className)});
}`;
  }

  if (type === "remove_class_action") {
    const targetId = actionBlock.getFieldValue("TARGET_ID") || "";
    const className = actionBlock.getFieldValue("CLASS_NAME") || "";
    return `const el = document.getElementById(${JSON.stringify(targetId)});
if (el) {
  el.classList.remove(${JSON.stringify(className)});
}`;
  }

  if (type === "set_style_action") {
    const targetId = actionBlock.getFieldValue("TARGET_ID") || "";
    const property = actionBlock.getFieldValue("PROPERTY") || "";
    const value = actionBlock.getFieldValue("VALUE") || "";
    return `const el = document.getElementById(${JSON.stringify(targetId)});
if (el) {
  el.style[${JSON.stringify(property)}] = ${JSON.stringify(value)};
}`;
  }

  if (type === "set_attribute_action") {
    const targetId = actionBlock.getFieldValue("TARGET_ID") || "";
    const attributeName = actionBlock.getFieldValue("ATTRIBUTE_NAME") || "";
    const value = actionBlock.getFieldValue("VALUE") || "";
    return `const el = document.getElementById(${JSON.stringify(targetId)});
if (el) {
  el.setAttribute(${JSON.stringify(attributeName)}, ${JSON.stringify(value)});
}`;
  }

  if (type === "scroll_to_action") {
    const targetId = actionBlock.getFieldValue("TARGET_ID") || "";
    const behavior = actionBlock.getFieldValue("BEHAVIOR") || "smooth";
    return `const el = document.getElementById(${JSON.stringify(targetId)});
if (el) {
  el.scrollIntoView({ behavior: ${JSON.stringify(behavior)} });
}`;
  }

  if (type === "get_value_action") {
    const inputId = actionBlock.getFieldValue("INPUT_ID") || "";
    const outputId = actionBlock.getFieldValue("OUTPUT_ID") || "";
    return `const input = document.getElementById(${JSON.stringify(inputId)});
const output = document.getElementById(${JSON.stringify(outputId)});
if (input && output) {
  output.textContent = input.value;
}`;
  }

  if (type === "set_local_storage_action") {
    const key = actionBlock.getFieldValue("KEY") || "";
    const value = actionBlock.getFieldValue("VALUE") || "";
    return `localStorage.setItem(${JSON.stringify(key)}, ${JSON.stringify(value)});`;
  }

  if (type === "get_local_storage_action") {
    const key = actionBlock.getFieldValue("KEY") || "";
    const targetId = actionBlock.getFieldValue("TARGET_ID") || "";
    return `const value = localStorage.getItem(${JSON.stringify(key)});
const el = document.getElementById(${JSON.stringify(targetId)});
if (el && value !== null) {
  el.textContent = value;
}`;
  }

  return "";
}

function generateJs(workspace) {
  const topBlocks = workspace.getTopBlocks(true);
  const handlers = [];

  topBlocks.forEach((block) => {
    const targetId = block.getFieldValue("TARGET_ID") || "";
    const actions = [];
    let actionBlock = block.getInputTargetBlock("ACTIONS");

    while (actionBlock) {
      const generated = generateAction(actionBlock);
      if (generated) actions.push(generated);
      actionBlock = nextBlock(actionBlock);
    }

    if (!targetId || !actions.length) return;

    // Handle on_click_block
    if (block.type === "on_click_block") {
      handlers.push(`{
  const trigger = document.getElementById(${JSON.stringify(targetId)});
  if (trigger) {
    trigger.addEventListener("click", () => {
${indent(actions.join("\n"), 3)}
    });
  }
}`);
    }

    // Handle on_submit_block
    if (block.type === "on_submit_block") {
      handlers.push(`{
  const trigger = document.getElementById(${JSON.stringify(targetId)});
  if (trigger) {
    trigger.addEventListener("submit", (e) => {
      e.preventDefault();
${indent(actions.join("\n"), 3)}
    });
  }
}`);
    }

    // Handle on_input_block
    if (block.type === "on_input_block") {
      handlers.push(`{
  const trigger = document.getElementById(${JSON.stringify(targetId)});
  if (trigger) {
    trigger.addEventListener("input", () => {
${indent(actions.join("\n"), 3)}
    });
  }
}`);
    }

    // Handle on_hover_block
    if (block.type === "on_hover_block") {
      handlers.push(`{
  const trigger = document.getElementById(${JSON.stringify(targetId)});
  if (trigger) {
    trigger.addEventListener("mouseenter", () => {
${indent(actions.join("\n"), 3)}
    });
  }
}`);
    }
  });

  return handlers.join("\n\n");
}

export function generateCodeFromWorkspace(workspace) {
  const topBlocks = workspace.getTopBlocks(true);
  const pageBlock = topBlocks.find((block) => block.type === "page_block");
  const pageTitle = pageBlock?.getFieldValue("TITLE")?.trim() || "U8Code Project";

const bodyHtml = pageBlock
    ? generateChildren(statementBlock(pageBlock, "BODY"), 0)
    : topBlocks
        .filter((block) =>
          [
            "container_block",
            "pre_block",
            "heading_block",
            "paragraph_block",
            "span_block",
            "blockquote_block",
            "code_block",
            "br_block",
            "hr_block",
            "button_block",
            "link_block",
            "image_block",
            "video_block",
            "audio_block",
            "iframe_block",
            "input_block",
            "textarea_block",
            "select_block",
            "option_block",
            "checkbox_block",
            "radio_block",
            "label_block",
            "list_block",
            "list_item_block",
            "table_block",
            "table_row_block",
            "table_header_block",
            "table_cell_block",
            "custom_html_block"
          ].includes(block.type)
        )
        .map((block) => generateElement(block, 0))
        .join("\n");

  const css = generateCss(workspace);
  const js = generateJs(workspace);

  const fullHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${escapeHtml(pageTitle)}</title>
  <link rel="stylesheet" href="styles.css" />
</head>
<body>
${bodyHtml || "  <!-- Add blocks to your page -->"}
  <script src="script.js"></script>
</body>
</html>`;

  return {
    html: bodyHtml || "",
    css,
    js,
    fullHtml
  };
}