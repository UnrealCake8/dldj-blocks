import { useEffect, useRef } from "react";
import * as Blockly from "blockly";
import { defineU8CodeBlocks, toolboxXml } from "../blocks/definitions";

function saveWorkspace(workspace) {
  try {
    const state = Blockly.serialization.workspaces.save(workspace);
    localStorage.setItem("u8code-workspace", JSON.stringify(state));
  } catch {
    // ignore save issues
  }
}

export default function BlocklyEditor({
  onWorkspaceReady,
  onWorkspaceChange,
  externalWorkspaceState,
  workspaceKey
}) {
  const blocklyDiv = useRef(null);
  const workspaceRef = useRef(null);
  const readyRef = useRef(onWorkspaceReady);
  const changeRef = useRef(onWorkspaceChange);
  const lastLoadedKeyRef = useRef(null);

  useEffect(() => {
    window.Blockly = Blockly;
    readyRef.current = onWorkspaceReady;
    changeRef.current = onWorkspaceChange;
  }, [onWorkspaceReady, onWorkspaceChange]);

  useEffect(() => {
    defineU8CodeBlocks();

    const workspace = Blockly.inject(blocklyDiv.current, {
      toolbox: toolboxXml,
      trashcan: true,
      grid: {
        spacing: 24,
        length: 3,
        colour: "#e5e7eb",
        snap: true
      },
      move: {
        scrollbars: true,
        drag: true,
        wheel: true
      },
      zoom: {
        controls: true,
        wheel: true,
        startScale: 0.9,
        maxScale: 1.6,
        minScale: 0.5,
        scaleSpeed: 1.1
      }
    });

    workspaceRef.current = workspace;

    try {
      const saved = localStorage.getItem("u8code-workspace");
      if (saved) {
        const state = JSON.parse(saved);
        Blockly.serialization.workspaces.load(state, workspace);
      }
    } catch {
      // ignore broken local data
    }

    readyRef.current?.(workspace);

    const listener = (event) => {
      if (event.type === Blockly.Events.UI) return;
      saveWorkspace(workspace);
      changeRef.current?.(workspace);
    };

    const resizeWorkspace = () => {
      if (workspaceRef.current) {
        Blockly.svgResize(workspaceRef.current);
      }
    };

    workspace.addChangeListener(listener);
    const timeoutId = setTimeout(resizeWorkspace, 100);
    window.addEventListener("resize", resizeWorkspace);

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener("resize", resizeWorkspace);
      workspace.removeChangeListener(listener);
      workspace.dispose();
      workspaceRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (!workspaceRef.current) return;
    if (!externalWorkspaceState) return;
    if (!workspaceKey) return;
    if (lastLoadedKeyRef.current === workspaceKey) return;

    workspaceRef.current.clear();
    Blockly.serialization.workspaces.load(externalWorkspaceState, workspaceRef.current);
    lastLoadedKeyRef.current = workspaceKey;
    readyRef.current?.(workspaceRef.current);
    changeRef.current?.(workspaceRef.current);
  }, [externalWorkspaceState, workspaceKey]);

  return <div ref={blocklyDiv} className="editorCanvas" />;
}
