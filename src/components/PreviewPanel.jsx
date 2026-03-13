
function escapeScript(js) {
  return js.replace(/<\/script>/gi, "<\\/script>");
}

export default function PreviewPanel({ code }) {

  const srcDoc = `
  <html>
  <head>
  <style>${code.css}</style>
  </head>
  <body>
  ${code.html}
  <script>${escapeScript(code.js)}</script>
  </body>
  </html>
  `;

  return (
    <div className="panel">
      <div className="panelHeader">Preview</div>
      <iframe className="previewFrame" srcDoc={srcDoc}></iframe>
    </div>
  );
}
