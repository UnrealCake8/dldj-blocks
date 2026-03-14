import { useCallback, useEffect, useMemo, useState } from "react";
import { BrowserRouter, Link, Route, Routes, useNavigate, useSearchParams } from "react-router-dom";
import BlocklyEditor from "./components/BlocklyEditor";
import PreviewPanel from "./components/PreviewPanel";
import CodePanel from "./components/CodePanel";
import { generateCodeFromWorkspace } from "./generator/codeGenerator";
import LoginPage from "./LoginPage";
import SignupPage from "./SignupPage";
import DashboardPage from "./DashboardPage";
import PublishedPage from "./PublishedPage";
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

function BuilderPage({ user, onLogout }) {
  const [workspace, setWorkspace] = useState(null);
  const [code, setCode] = useState({ html: "", css: "", js: "" });
  const [autoGenerate, setAutoGenerate] = useState(true);
  const [searchParams] = useSearchParams();
  const [currentProjectId, setCurrentProjectId] = useState(null);
  const [projectName, setProjectName] = useState("Untitled Project");
  const [remoteWorkspaceState, setRemoteWorkspaceState] = useState(null);
  const [workspaceKey, setWorkspaceKey] = useState(null);

  const title = useMemo(() => "U8Code", []);

  const regenerate = useCallback((currentWorkspace) => {
    if (!currentWorkspace) {
      setCode({ html: "", css: "", js: "" });
      return;
    }
    const nextCode = generateCodeFromWorkspace(currentWorkspace);
    setCode(nextCode);
  }, []);

  const handleWorkspaceReady = useCallback(
    (nextWorkspace) => {
      setWorkspace(nextWorkspace);
      regenerate(nextWorkspace);
    },
    [regenerate]
  );

  const handleWorkspaceChange = useCallback(
    (nextWorkspace) => {
      if (autoGenerate) {
        regenerate(nextWorkspace);
      }
    },
    [autoGenerate, regenerate]
  );

  const handleGenerate = useCallback(() => {
    regenerate(workspace);
  }, [workspace, regenerate]);

  const handleReset = useCallback(() => {
    if (!workspace) return;
    workspace.clear();
    localStorage.removeItem("u8code-workspace");
    setCurrentProjectId(null);
    setProjectName("Untitled Project");
    regenerate(workspace);
  }, [workspace, regenerate]);

  useEffect(() => {
    async function loadProject() {
      const projectId = searchParams.get("project");
      if (!projectId || !supabase || !user) return;

      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .eq("id", projectId)
        .eq("user_id", user.id)
        .single();

      if (error || !data) return;

      setCurrentProjectId(data.id);
      setProjectName(data.name || "Untitled Project");
      setRemoteWorkspaceState(data.workspace_json || {});
      setWorkspaceKey(`${data.id}:${data.updated_at || ""}`);
    }

    loadProject();
  }, [searchParams, user]);

  async function saveProject({ publish = false } = {}) {
    if (!user || !supabase || !workspace) {
      alert("Please log in first.");
      return;
    }

    const name = window.prompt("Project name", projectName || "Untitled Project");
    if (!name) return;

    const workspaceState = window.Blockly
      ? window.Blockly.serialization.workspaces.save(workspace)
      : {};

    if (!currentProjectId) {
      const { count } = await supabase
        .from("projects")
        .select("*", { count: "exact", head: true })
        .eq("user_id", user.id);

      if ((count || 0) >= 2) {
        alert("You can only have 2 projects for now.");
        return;
      }

      const insertData = {
        user_id: user.id,
        name,
        workspace_json: workspaceState,
        html_code: code.html,
        css_code: code.css,
        js_code: code.js,
        is_published: publish,
        published_slug: publish ? makeSlug(name) : null
      };

      const { data, error } = await supabase
        .from("projects")
        .insert(insertData)
        .select()
        .single();

      if (error) {
        alert(error.message);
        return;
      }

      setCurrentProjectId(data.id);
      setProjectName(data.name);
      if (publish && data.published_slug) {
        window.open(`/p/${data.published_slug}`, "_blank");
      }
      alert(publish ? "Project saved and published." : "Project saved.");
      return;
    }

    const updates = {
      name,
      workspace_json: workspaceState,
      html_code: code.html,
      css_code: code.css,
      js_code: code.js,
      updated_at: new Date().toISOString()
    };

    if (publish) {
      updates.is_published = true;
      updates.published_slug = searchParams.get("slug") || makeSlug(name);
    }

    const { data, error } = await supabase
      .from("projects")
      .update(updates)
      .eq("id", currentProjectId)
      .eq("user_id", user.id)
      .select()
      .single();

    if (error) {
      alert(error.message);
      return;
    }

    setProjectName(data.name);
    alert(publish ? "Project published." : "Project saved.");
    if (publish && data.published_slug) {
      window.open(`/p/${data.published_slug}`, "_blank");
    }
  }

  return (
    <div className="appShell">
      <header className="topbar">
        <div className="branding">
          <h1>{title}</h1>
          <p className="subtitle">
            Build visually, generate real HTML, CSS, and JavaScript.
          </p>
        </div>

        <div className="topbarActions">
          {user ? (
            <>
              <Link className="secondaryButton navLinkButton" to="/dashboard">
                Dashboard
              </Link>
              <button className="secondaryButton" onClick={() => saveProject()}>
                Save
              </button>
              <button className="secondaryButton" onClick={() => saveProject({ publish: true })}>
                Publish
              </button>
              <button className="secondaryButton" onClick={onLogout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link className="secondaryButton navLinkButton" to="/login">
                Login
              </Link>
              <Link className="secondaryButton navLinkButton" to="/signup">
                Sign up
              </Link>
            </>
          )}

          <label className="toggleControl">
            <input
              type="checkbox"
              checked={autoGenerate}
              onChange={(event) => setAutoGenerate(event.target.checked)}
            />
            <span>Auto-generate</span>
          </label>

          <button className="secondaryButton" onClick={handleReset}>
            Reset
          </button>

          <button className="primaryButton" onClick={handleGenerate}>
            Generate
          </button>
        </div>
      </header>

      <main className="mainLayout">
        <section className="editorSection">
          <div className="sectionHeader">
            Blocks editor {currentProjectId ? `• ${projectName}` : ""}
          </div>
          <BlocklyEditor
            onWorkspaceReady={handleWorkspaceReady}
            onWorkspaceChange={handleWorkspaceChange}
            externalWorkspaceState={remoteWorkspaceState}
            workspaceKey={workspaceKey}
          />
        </section>

        <section className="outputSection">
          <PreviewPanel code={code} />
          <CodePanel code={code} />
        </section>
      </main>
    </div>
  );
}

function AppRoutes() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (!supabase) return;

    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user || null);
    });

    const { data: subscription } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
    });

    return () => {
      subscription.subscription.unsubscribe();
    };
  }, []);

  async function logout() {
    if (!supabase) return;
    await supabase.auth.signOut();
    setUser(null);
  }

  return (
    <Routes>
      <Route path="/" element={<BuilderPage user={user} onLogout={logout} />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="/p/:slug" element={<PublishedPage />} />
    </Routes>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}
