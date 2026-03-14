import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "./supabaseClient";

function slugify(value) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 40);
}

function makeSlug(name) {
  return `${slugify(name || "project")}-${crypto.randomUUID().slice(0, 6)}`;
}

export default function DashboardPage() {
  const [projects, setProjects] = useState([]);
  const [user, setUser] = useState(null);
  const [status, setStatus] = useState("loading");
  const navigate = useNavigate();

  async function loadProjects() {
    if (!supabase) {
      setStatus("missing-env");
      return;
    }

    const {
      data: { user: currentUser }
    } = await supabase.auth.getUser();

    if (!currentUser) {
      navigate("/login");
      return;
    }

    setUser(currentUser);

    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .eq("user_id", currentUser.id)
      .order("updated_at", { ascending: false });

    if (error) {
      console.error(error);
      setStatus("error");
      return;
    }

    setProjects(data || []);
    setStatus("ready");
  }

  async function createProject() {
    if (!supabase || !user) return;

    if (projects.length >= 2) {
      alert("You can only have 2 projects for now.");
      return;
    }

    const name = window.prompt("Project name", "Untitled Project");
    if (!name) return;

    const starter = {
      user_id: user.id,
      name,
      workspace_json: {},
      html_code: '<section class="hero">\n  <h1>Hello from U8Code</h1>\n  <p>Edit this project in the builder.</p>\n</section>',
      css_code: '.hero { padding: 48px; text-align: center; }',
      js_code: '',
      is_published: false,
      published_slug: null
    };

    const { data, error } = await supabase
      .from("projects")
      .insert(starter)
      .select()
      .single();

    if (error) {
      alert(error.message);
      return;
    }

    navigate(`/?project=${data.id}`);
  }

  async function togglePublish(project) {
    if (!supabase) return;

    const updates = project.is_published
      ? { is_published: false }
      : { is_published: true, published_slug: project.published_slug || makeSlug(project.name) };

    const { error } = await supabase
      .from("projects")
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq("id", project.id);

    if (error) {
      alert(error.message);
      return;
    }

    loadProjects();
  }

  async function deleteProject(projectId) {
    if (!supabase) return;
    if (!window.confirm("Delete this project?")) return;

    const { error } = await supabase
      .from("projects")
      .delete()
      .eq("id", projectId);

    if (error) {
      alert(error.message);
      return;
    }

    loadProjects();
  }

  async function logout() {
    if (!supabase) return;
    await supabase.auth.signOut();
    navigate("/");
  }

  if (status === "loading") {
    loadProjects();
    return <main className="dashboardPage"><p>Loading dashboard…</p></main>;
  }

  if (status === "missing-env") {
    return <main className="dashboardPage"><p>Supabase environment variables are missing.</p></main>;
  }

  return (
    <main className="dashboardPage">
      <div className="dashboardTop">
        <div>
          <h1>Your Projects</h1>
          <p className="dashboardSubtext">{projects.length} / 2 projects used</p>
          {user?.email ? <p className="dashboardUser">{user.email}</p> : null}
        </div>

        <div className="dashboardActions">
          <button className="primaryButton" onClick={createProject}>
            New Project
          </button>
          <button className="secondaryButton darkButton" onClick={logout}>
            Logout
          </button>
        </div>
      </div>

      <div className="projectGrid">
        {projects.map((project) => (
          <article key={project.id} className="projectCard">
            <h3>{project.name}</h3>
            <p className="projectMeta">{project.is_published ? "Published" : "Draft"}</p>

            <div className="projectCardActions">
              <Link className="secondaryButton darkButton smallLinkButton" to={`/?project=${project.id}`}>
                Open
              </Link>

              <button className="secondaryButton darkButton" onClick={() => togglePublish(project)}>
                {project.is_published ? "Unpublish" : "Publish"}
              </button>

              <button className="secondaryButton darkButton" onClick={() => deleteProject(project.id)}>
                Delete
              </button>
            </div>

            {project.is_published && project.published_slug ? (
              <a className="publishedLink" href={`/p/${project.published_slug}`} target="_blank" rel="noreferrer">
                View live site
              </a>
            ) : null}
          </article>
        ))}
      </div>
    </main>
  );
}
