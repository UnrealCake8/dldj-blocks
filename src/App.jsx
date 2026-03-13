
import { useState } from "react";
import BlocklyEditor from "./components/BlocklyEditor";
import PreviewPanel from "./components/PreviewPanel";
import CodePanel from "./components/CodePanel";
import { generateCode } from "./generator/codeGenerator";

function App() {
  const [code, setCode] = useState({ html: "", css: "", js: "" });
  const [workspace, setWorkspace] = useState(null);
  const [autoGenerate, setAutoGenerate] = useState(true);

  function generateFromWorkspace(currentWorkspace) {
    if (!currentWorkspace) return;

    const blocks = currentWorkspace.getTopBlocks(true);
    const model = [];

    blocks.forEach((block) => {
      model.push({
        type: block.type,
        text: block.getFieldValue("TEXT") || "",
        label: block.getFieldValue("LABEL") || "",
        value: block.getFieldValue("VALUE") || "",
        level: block.getFieldValue("LEVEL") || "",
        src: block.getFieldValue("SRC") || "",
        alt: block.getFieldValue("ALT") || "",
        bg: block.getFieldValue("BG") || "",
        primary: block.getFieldValue("PRIMARY") || "",
      });
    });

    const result = generateCode(model);
    setCode(result);
  }

  function handleGenerate() {
    generateFromWorkspace(workspace);
  }

  function handleWorkspaceChange(nextWorkspace) {
    setWorkspace(nextWorkspace);
    if (autoGenerate) {
      generateFromWorkspace(nextWorkspace);
    }
  }

  function handleClearOutput() {
    setCode({ html: "", css: "", js: "" });
  }

  function handleResetBlocks() {
    if (workspace) {
      workspace.clear();
    }
    setCode({ html: "", css: "", js: "" });
  }

  return (
    <div className="appShell">
      <header className="topbar">
        <div className="branding">
          <h1>Visual Web Builder</h1>
          <p className="subtitle">Drag blocks, preview instantly, copy code.</p>
        </div>

        <div className="topbarActions">
          <label className="toggleControl">
            <input
              type="checkbox"
              checked={autoGenerate}
              onChange={(e) => setAutoGenerate(e.target.checked)}
            />
            <span>Live preview</span>
          </label>

          <button className="secondaryButton" onClick={handleClearOutput}>
            Clear output
          </button>

          <button className="secondaryButton" onClick={handleResetBlocks}>
            Reset blocks
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
            setWorkspace={setWorkspace}
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
