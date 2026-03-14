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

function attrs({ id, className, href, src, alt, type, name, placeholder }) {
  const parts = [];
  if (id) parts.push(`id="${escapeAttribute(id)}"`);
  if (className) parts.push(`class="${escapeAttribute(className)}"`);
  if (href) parts.push(`href="${escapeAttribute(href)}"`);
  if (src) parts.push(`src="${escapeAttribute(src)}"`);
  if (alt) parts.push(`alt="${escapeAttribute(alt)}"`);
  if (type) parts.push(`type="${escapeAttribute(type)}"`);
  if (name) parts.push(`name="${escapeAttribute(name)}"`);
  if (placeholder) parts.push(`placeholder="${escapeAttribute(placeholder)}"`);
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

img {
  max-width: 100%;
  height: auto;
  display: block;
}

button {
  cursor: pointer;
}

input,
button {
  font: inherit;
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

  return "";
}

function generateJs(workspace) {
  const topBlocks = workspace.getTopBlocks(true);
  const handlers = [];

  topBlocks.forEach((block) => {
    if (block.type !== "on_click_block") return;

    const targetId = block.getFieldValue("TARGET_ID") || "";
    const actions = [];
    let actionBlock = block.getInputTargetBlock("ACTIONS");

    while (actionBlock) {
      const generated = generateAction(actionBlock);
      if (generated) actions.push(generated);
      actionBlock = nextBlock(actionBlock);
    }

    if (targetId && actions.length) {
      handlers.push(`{
  const trigger = document.getElementById(${JSON.stringify(targetId)});
  if (trigger) {
    trigger.addEventListener("click", () => {
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

  const bodyHtml = pageBlock
    ? generateChildren(statementBlock(pageBlock, "BODY"), 0)
    : topBlocks
        .filter((block) =>
          [
            "container_block",
            "heading_block",
            "paragraph_block",
            "button_block",
            "link_block",
            "image_block",
            "input_block",
            "list_block",
            "list_item_block"
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
  <title>U8Code Project</title>
  <link rel="stylesheet" href="styles.css" />
</head>
<body>
${bodyHtml || "  <!-- Add blocks to your page -->"}
  <script src="script.js"></script>
</body>
</html>`;

  return { html: bodyHtml || "", css, js, fullHtml };
}
