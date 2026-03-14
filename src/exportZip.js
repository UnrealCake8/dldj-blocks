
import JSZip from "jszip";
import { saveAs } from "file-saver";

export async function exportProjectZip(code, projectName="u8code-site") {
  const zip = new JSZip();

  const html = code.fullHtml || `<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>${projectName}</title>
<link rel="stylesheet" href="styles.css" />
</head>
<body>
${code.html || ""}
<script src="script.js"></script>
</body>
</html>`;

  zip.file("index.html", html);
  zip.file("styles.css", code.css || "");
  zip.file("script.js", code.js || "");

  const blob = await zip.generateAsync({ type: "blob" });
  saveAs(blob, `${projectName}.zip`);
}
