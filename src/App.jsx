import { useMemo, useState } from "react";
import BlocklyEditor from "./components/BlocklyEditor";
import PreviewPanel from "./components/PreviewPanel";
import CodePanel from "./components/CodePanel";
import { generateCodeFromWorkspace } from "./generator/codeGenerator";

function App() {
  const [workspace, setWorkspace] = useState(null);
  const [code, setCode] = useState({ html: "", css: "", js: "" });
  const [autoGenerate, setAutoGenerate] = useState(true);

  const title = useMemo(() => "U8Code", []);

  function regenerate(currentWorkspace) {
    if (!currentWorkspace) {
      setCode({ html: "", css: "", js: "" });
      return;
    }
    const nextCode = generateCodeFromWorkspace(currentWorkspace);
    setCode(nextCode);
  }

  function handleWorkspaceReady(nextWorkspace) {
    setWorkspace(nextWorkspace);
    regenerate(nextWorkspace);
  }

  function handleWorkspaceChange(nextWorkspace) {
    if (autoGenerate) {
      regenerate(nextWorkspace);
    }
  }

  function handleGenerate() {
    regenerate(workspace);
  }

  function handleReset() {
    if (!workspace) return;
    workspace.clear();
    localStorage.removeItem("u8code-workspace");
    regenerate(workspace);
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

export default App;
