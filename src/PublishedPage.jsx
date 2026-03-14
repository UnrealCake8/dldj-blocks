import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "./supabaseClient";

function buildDocument(project) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${project.name}</title>
  <style>${project.css_code || ""}</style>
</head>
<body>
${project.html_code || "<p>Nothing published yet.</p>"}
<script>${(project.js_code || "").replace(/<\/script>/gi, "<\\/script>")}<\/script>
</body>
</html>`;
}

export default function PublishedPage() {
  const { slug } = useParams();
  const [project, setProject] = useState(null);
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    async function loadProject() {
      if (!supabase) {
        setStatus("missing-env");
        return;
      }

      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .eq("published_slug", slug)
        .eq("is_published", true)
        .single();

      if (error || !data) {
        setStatus("not-found");
        return;
      }

      setProject(data);
      setStatus("ready");
    }

    loadProject();
  }, [slug]);

  const srcDoc = useMemo(() => (project ? buildDocument(project) : ""), [project]);

  if (status === "loading") return <main className="publishedState">Loading published site…</main>;
  if (status === "missing-env") return <main className="publishedState">Supabase environment variables are missing.</main>;
  if (status === "not-found") return <main className="publishedState">This published site was not found.</main>;

  return (
    <main className="publishedPage">
      <div className="publishedBar">
        <strong>{project.name}</strong>
        <span>Published with U8Code</span>
      </div>

      <iframe
        key={project.published_slug}
        title={project.name}
        className="publishedFrame"
        sandbox="allow-scripts allow-same-origin"
        srcDoc={srcDoc}
      />
    </main>
  );
}
