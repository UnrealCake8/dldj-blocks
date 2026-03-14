import { useCallback, useMemo, useState } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import BlocklyEditor from "./components/BlocklyEditor";
import PreviewPanel from "./components/PreviewPanel";
import CodePanel from "./components/CodePanel";
import { generateCodeFromWorkspace } from "./generator/codeGenerator";
import LoginPage from "./LoginPage";
import SignupPage from "./SignupPage";
import DashboardPage from "./DashboardPage";

function BuilderPage() {
  const [workspace, setWorkspace] = useState(null);
  const [code, setCode] = useState({ html: "", css: "", js: "" });
  const [autoGenerate, setAutoGenerate] = useState(true);

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
    regenerate(workspace);
  }, [workspace, regenerate]);

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
          <Link className="secondaryButton navLinkButton" to="/dashboard">
            Dashboard
          </Link>
          <Link className="secondaryButton navLinkButton" to="/login">
            Login
          </Link>
          <Link className="secondaryButton navLinkButton" to="/signup">
            Sign up
          </Link>

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
          <div className="sectionHeader">Blocks editor</div>
          <BlocklyEditor
            onWorkspaceReady={handleWorkspaceReady}
            onWorkspaceChange={handleWorkspaceChange}
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

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<BuilderPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
      </Routes>
    </BrowserRouter>
  );
}
