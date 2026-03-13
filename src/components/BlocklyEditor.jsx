
import { useEffect, useRef } from "react";
import * as Blockly from "blockly";

export default function BlocklyEditor({ setWorkspace, onWorkspaceChange }) {
  const blocklyDiv = useRef(null);

  useEffect(() => {
    Blockly.defineBlocksWithJsonArray([
      {
        type: "page_style",
        message0: "Page style background %1 primary button color %2",
        args0: [
          { type: "field_input", name: "BG", text: "#f3f4f6" },
          { type: "field_input", name: "PRIMARY", text: "#22c55e" },
        ],
        previousStatement: null,
        nextStatement: null,
        colour: 210,
      },

      {
        type: "text_block",
        message0: "Text %1",
        args0: [{ type: "field_input", name: "TEXT", text: "Hello world" }],
        previousStatement: null,
        nextStatement: null,
        colour: 200,
      },

      {
        type: "heading_block",
        message0: "Heading %1 level %2",
        args0: [
          { type: "field_input", name: "TEXT", text: "Section title" },
          {
            type: "field_dropdown",
            name: "LEVEL",
            options: [
              ["H1", "h1"],
              ["H2", "h2"],
              ["H3", "h3"],
            ],
          },
        ],
        previousStatement: null,
        nextStatement: null,
        colour: 260,
      },

      {
        type: "button_block",
        message0: "Button %1",
        args0: [{ type: "field_input", name: "LABEL", text: "Click me" }],
        previousStatement: null,
        nextStatement: null,
        colour: 50,
      },

      {
        type: "image_block",
        message0: "Image url %1 alt %2",
        args0: [
          {
            type: "field_input",
            name: "SRC",
            text: "https://placehold.co/400x200",
          },
          {
            type: "field_input",
            name: "ALT",
            text: "Placeholder image",
          },
        ],
        previousStatement: null,
        nextStatement: null,
        colour: 20,
      },

      {
        type: "divider_block",
        message0: "Divider",
        previousStatement: null,
        nextStatement: null,
        colour: 120,
      },

      {
        type: "onclick_event",
        message0: "On click change text to %1",
        args0: [{ type: "field_input", name: "VALUE", text: "Clicked!" }],
        previousStatement: null,
        nextStatement: null,
        colour: 330,
      },
    ]);

    const workspaceInstance = Blockly.inject(blocklyDiv.current, {
      toolbox: `
      <xml>
        <category name="Page" colour="#0ea5e9">
          <block type="page_style"></block>
        </category>
        <category name="Content" colour="#4f46e5">
          <block type="heading_block"></block>
          <block type="text_block"></block>
          <block type="button_block"></block>
        </category>
        <category name="Media" colour="#f97316">
          <block type="image_block"></block>
        </category>
        <category name="Layout" colour="#10b981">
          <block type="divider_block"></block>
        </category>
        <category name="Interaction" colour="#ec4899">
          <block type="onclick_event"></block>
        </category>
      </xml>`,
    });

    setWorkspace(workspaceInstance);
    workspaceInstance.addChangeListener(() => {
      if (onWorkspaceChange) {
        onWorkspaceChange(workspaceInstance);
      }
    });
  }, [setWorkspace, onWorkspaceChange]);

  return <div ref={blocklyDiv} className="editorCanvas"></div>;
}
