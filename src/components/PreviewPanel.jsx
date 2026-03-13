function escapeClosingScriptTag(value) {
  return value.replace(/<\/script>/gi, "<\\/script>");
}

export default function PreviewPanel({ code }) {
  const srcDoc = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <style>${code.css}</style>
</head>
<body>
${code.html}
<script>${escapeClosingScriptTag(code.js)}</script>
</body>
</html>`;

  return (
    <div className="panel previewPanel">
      <div className="panelHeader">Preview</div>
      <iframe
        title="U8Code Preview"
        className="previewFrame"
        sandbox="allow-scripts"
        srcDoc={srcDoc}
      />
    </div>
  );
}
