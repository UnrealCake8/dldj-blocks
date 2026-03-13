
export function generateCode(model) {
  const htmlParts = [];
  const cssParts = [];
  const jsParts = [];

  let textId = null;
  let buttonId = null;
  let backgroundColor = null;
  let primaryColor = null;

  model.forEach((node, index) => {
    if (node.type === "page_style") {
      if (node.bg) backgroundColor = node.bg;
      if (node.primary) primaryColor = node.primary;
    }

    if (node.type === "text_block") {
      textId = "text-" + index;
      htmlParts.push(`<p id="${textId}">${node.text}</p>`);
    }

    if (node.type === "heading_block") {
      const level = node.level || "h2";
      const safeLevel = ["h1", "h2", "h3"].includes(level) ? level : "h2";
      const headingId = "heading-" + index;
      textId = headingId;
      htmlParts.push(
        `<${safeLevel} id="${headingId}">${node.text}</${safeLevel}>`
      );
    }

    if (node.type === "button_block") {
      buttonId = "btn-" + index;
      htmlParts.push(`<button id="${buttonId}">${node.label}</button>`);
    }

    if (node.type === "image_block") {
      const src = node.src || "https://placehold.co/400x200";
      const alt = node.alt || "Image";
      htmlParts.push(
        `<img src="${src}" alt="${alt}" style="max-width:100%;height:auto;border-radius:12px;"/>`
      );
    }

    if (node.type === "divider_block") {
      htmlParts.push(`<hr />`);
    }
  });

  model.forEach((node) => {
    if (node.type === "onclick_event" && buttonId && textId) {
      jsParts.push(`
document.getElementById("${buttonId}").onclick = () => {
  document.getElementById("${textId}").textContent = "${node.value}";
};
`);
    }
  });

  const bodyBg = backgroundColor || "#f3f4f6";
  const primary = primaryColor || "#22c55e";

  cssParts.push(`
body{
  font-family: Arial, sans-serif;
  padding: 40px;
  background: ${bodyBg};
}
button{
  padding: 10px 18px;
  font-size: 16px;
  border-radius: 8px;
  border: none;
  background: ${primary};
  color: white;
  cursor: pointer;
}
button:hover{
  filter: brightness(1.05);
}
img{
  display: block;
  margin-bottom: 16px;
}
hr{
  border: 0;
  border-top: 1px solid #e5e7eb;
  margin: 16px 0;
}
`);

  const html = htmlParts.join("\n");
  const css = cssParts.join("\n");
  const js = jsParts.join("\n");

  return { html, css, js };
}
