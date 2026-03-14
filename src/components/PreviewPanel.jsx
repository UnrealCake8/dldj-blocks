function buildDocument(code) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <style>${code.css || ""}</style>
</head>
<body>
${code.html || ""}
<script>${(code.js || "").replace(/<\/script>/gi, "<\\/script>")}<\/script>
</body>
</html>`;
}

export default function PreviewPanel({ code }) {
  return (
    <div className="panel previewPanel">
      <div className="panelHeader">Preview</div>
      <iframe
        title="U8Code Preview"
        className="previewFrame"
        sandbox="allow-scripts"
        srcDoc={buildDocument(code)}
      />
    </div>
  );
}
