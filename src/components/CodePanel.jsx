async function copyCode(text) {
  await navigator.clipboard.writeText(text);
}

function CodeBlock({ title, value }) {
  return (
    <div className="codeBlock">
      <div className="codeBlockHeader">
        <span>{title}</span>
        <button className="copyButton" onClick={() => copyCode(value)}>
          Copy
        </button>
      </div>
      <pre>{value || `/* ${title} will appear here */`}</pre>
    </div>
  );
}

export default function CodePanel({ code }) {
  return (
    <div className="panel codePanel">
      <div className="panelHeader">Generated code</div>
      <div className="codeBlocks">
        <CodeBlock title="HTML" value={code.html} />
        <CodeBlock title="CSS" value={code.css} />
        <CodeBlock title="JS" value={code.js} />
      </div>
    </div>
  );
}
