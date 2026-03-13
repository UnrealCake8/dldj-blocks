
import { useEffect, useRef } from "react";
import * as Blockly from "blockly";

export default function BlocklyEditor({ setWorkspace }) {

  const blocklyDiv = useRef(null);

  useEffect(() => {

    Blockly.defineBlocksWithJsonArray([

      {
        type: "text_block",
        message0: "Text %1",
        args0: [
          { type: "field_input", name: "TEXT", text: "Hello world" }
        ],
        previousStatement: null,
        nextStatement: null,
        colour: 160
      },

      {
        type: "button_block",
        message0: "Button %1",
        args0: [
          { type: "field_input", name: "LABEL", text: "Click me" }
        ],
        previousStatement: null,
        nextStatement: null,
        colour: 230
      },

      {
        type: "onclick_event",
        message0: "On click change text to %1",
        args0: [
          { type: "field_input", name: "VALUE", text: "Clicked!" }
        ],
        previousStatement: null,
        nextStatement: null,
        colour: 20
      }

    ]);

    const workspaceInstance = Blockly.inject(blocklyDiv.current, {
      toolbox: `
      <xml>
        <category name="Structure">
          <block type="text_block"></block>
          <block type="button_block"></block>
        </category>
        <category name="Interaction">
          <block type="onclick_event"></block>
        </category>
      </xml>`
    });

    setWorkspace(workspaceInstance);

  }, [setWorkspace]);

  return <div ref={blocklyDiv} className="editorCanvas"></div>;
}
