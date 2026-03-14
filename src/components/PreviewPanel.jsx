function buildDocument(code) {
  const html = code.html && code.html.trim()
    ? code.html
    : '<section style="padding:32px;text-align:center;"><h2>Preview</h2><p>Add blocks to see your site here.</p></section>';

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <style>${code.css || ""}</style>
</head>
<body>
${html}
<script>${(code.js || "").replace(/<\/script>/gi, "<\\/script>")}<\/script>
</body>
</html>`;
}

export default function PreviewPanel({ code }) {
  const doc = buildDocument(code);

  return (
    <div className="panel previewPanel">
      <div className="panelHeader">Preview</div>
      <iframe
        key={doc}
        title="U8Code Preview"
        className="previewFrame"
        sandbox="allow-scripts allow-same-origin"
        srcDoc={doc}
      />
    </div>
  );
}
