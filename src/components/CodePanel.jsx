async function copyCode(text) {
  await navigator.clipboard.writeText(text);
}

function CodeBlock({ title, value, fallback }) {
  return (
    <div className="codeBlock">
      <div className="codeBlockHeader">
        <span>{title}</span>
        <button className="copyButton" onClick={() => copyCode(value || "")}>
          Copy
        </button>
      </div>
      <pre>{value || fallback}</pre>
    </div>
  );
}

export default function CodePanel({ code }) {
  return (
    <div className="panel codePanel">
      <div className="panelHeader">Generated code</div>
      <div className="codeBlocks">
        <CodeBlock title="HTML" value={code.fullHtml || code.html} fallback="<!-- HTML will appear here -->" />
        <CodeBlock title="CSS" value={code.css} fallback="/* CSS will appear here */" />
        <CodeBlock title="JS" value={code.js} fallback="// JS will appear here" />
      </div>
    </div>
  );
}
