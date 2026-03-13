import { useEffect, useRef } from "react";
import * as Blockly from "blockly";
import { defineU8CodeBlocks, toolboxXml } from "../blocks/definitions";

function loadWorkspace(workspace) {
  try {
    const saved = localStorage.getItem("u8code-workspace");
    if (!saved) return;
    const state = JSON.parse(saved);
    Blockly.serialization.workspaces.load(state, workspace);
  } catch {
    // ignore invalid local data
  }
}

function saveWorkspace(workspace) {
  try {
    const state = Blockly.serialization.workspaces.save(workspace);
    localStorage.setItem("u8code-workspace", JSON.stringify(state));
  } catch {
    // ignore save issues
  }
}

export default function BlocklyEditor({ onWorkspaceReady, onWorkspaceChange }) {
  const blocklyDiv = useRef(null);

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

    loadWorkspace(workspace);
    onWorkspaceReady?.(workspace);

    const listener = (event) => {
      if (event.type === Blockly.Events.UI) return;
      saveWorkspace(workspace);
      onWorkspaceChange?.(workspace);
    };

    workspace.addChangeListener(listener);

    return () => {
      workspace.removeChangeListener(listener);
      workspace.dispose();
    };
  }, [onWorkspaceReady, onWorkspaceChange]);

  return <div ref={blocklyDiv} className="editorCanvas" />;
}
