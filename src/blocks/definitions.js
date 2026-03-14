import * as Blockly from "blockly";

let initialized = false;

export function defineU8CodeBlocks() {
  if (initialized) return;
  initialized = true;

  Blockly.defineBlocksWithJsonArray([
    {
      type: "page_block",
      message0: "Page title %1 body %2",
      args0: [
        { type: "field_input", name: "TITLE", text: "U8Code Project" },
        { type: "input_statement", name: "BODY" }
      ],
      colour: 230
    },
    {
      type: "container_block",
      message0: "%1 id %2 class %3 children %4",
      args0: [
        {
          type: "field_dropdown",
          name: "TAG",
          options: [
            ["div", "div"],
            ["section", "section"],
            ["header", "header"],
            ["main", "main"],
            ["footer", "footer"],
            ["nav", "nav"],
            ["article", "article"],
            ["form", "form"]
          ]
        },
        { type: "field_input", name: "ID", text: "" },
        { type: "field_input", name: "CLASS", text: "" },
        { type: "input_statement", name: "CHILDREN" }
      ],
      previousStatement: null,
      nextStatement: null,
      colour: 190
    },
    {
      type: "heading_block",
      message0: "heading %1 text %2 id %3 class %4",
      args0: [
        {
          type: "field_dropdown",
          name: "LEVEL",
          options: [
            ["h1", "h1"],
            ["h2", "h2"],
            ["h3", "h3"],
            ["h4", "h4"],
            ["h5", "h5"],
            ["h6", "h6"]
          ]
        },
        { type: "field_input", name: "TEXT", text: "Welcome to U8Code" },
        { type: "field_input", name: "ID", text: "" },
        { type: "field_input", name: "CLASS", text: "" }
      ],
      previousStatement: null,
      nextStatement: null,
      colour: 260
    },
    {
      type: "paragraph_block",
      message0: "paragraph text %1 id %2 class %3",
      args0: [
        { type: "field_multilinetext", name: "TEXT", text: "This is a paragraph." },
        { type: "field_input", name: "ID", text: "" },
        { type: "field_input", name: "CLASS", text: "" }
      ],
      previousStatement: null,
      nextStatement: null,
      colour: 210
    },
    {
      type: "button_block",
      message0: "button text %1 id %2 class %3",
      args0: [
        { type: "field_input", name: "TEXT", text: "Click me" },
        { type: "field_input", name: "ID", text: "ctaBtn" },
        { type: "field_input", name: "CLASS", text: "" }
      ],
      previousStatement: null,
      nextStatement: null,
      colour: 40
    },
    {
      type: "link_block",
      message0: "link text %1 href %2 id %3 class %4",
      args0: [
        { type: "field_input", name: "TEXT", text: "Visit website" },
        { type: "field_input", name: "HREF", text: "https://example.com" },
        { type: "field_input", name: "ID", text: "" },
        { type: "field_input", name: "CLASS", text: "" }
      ],
      previousStatement: null,
      nextStatement: null,
      colour: 50
    },
    {
      type: "image_block",
      message0: "image src %1 alt %2 id %3 class %4",
      args0: [
        { type: "field_input", name: "SRC", text: "https://placehold.co/600x300" },
        { type: "field_input", name: "ALT", text: "Placeholder image" },
        { type: "field_input", name: "ID", text: "" },
        { type: "field_input", name: "CLASS", text: "" }
      ],
      previousStatement: null,
      nextStatement: null,
      colour: 20
    },
    {
      type: "input_block",
      message0: "input type %1 name %2 placeholder %3 id %4 class %5",
      args0: [
        {
          type: "field_dropdown",
          name: "TYPE",
          options: [
            ["text", "text"],
            ["email", "email"],
            ["password", "password"],
            ["number", "number"],
            ["tel", "tel"]
          ]
        },
        { type: "field_input", name: "NAME", text: "fieldName" },
        { type: "field_input", name: "PLACEHOLDER", text: "Type here" },
        { type: "field_input", name: "ID", text: "" },
        { type: "field_input", name: "CLASS", text: "" }
      ],
      previousStatement: null,
      nextStatement: null,
      colour: 100
    },
    {
      type: "list_block",
      message0: "%1 id %2 class %3 items %4",
      args0: [
        {
          type: "field_dropdown",
          name: "TAG",
          options: [
            ["ul", "ul"],
            ["ol", "ol"]
          ]
        },
        { type: "field_input", name: "ID", text: "" },
        { type: "field_input", name: "CLASS", text: "" },
        { type: "input_statement", name: "ITEMS" }
      ],
      previousStatement: null,
      nextStatement: null,
      colour: 130
    },
    {
      type: "list_item_block",
      message0: "list item text %1 id %2 class %3",
      args0: [
        { type: "field_input", name: "TEXT", text: "List item" },
        { type: "field_input", name: "ID", text: "" },
        { type: "field_input", name: "CLASS", text: "" }
      ],
      previousStatement: null,
      nextStatement: null,
      colour: 130
    },
    {
      type: "custom_html_block",
      message0: "custom HTML %1",
      args0: [
        {
          type: "field_multilinetext",
          name: "HTML",
          text: "<div class='card'>Hello</div>"
        }
      ],
      previousStatement: null,
      nextStatement: null,
      colour: 10
    },
    {
      type: "style_rule_block",
      message0: "style selector %1 property %2 value %3",
      args0: [
        { type: "field_input", name: "SELECTOR", text: "body" },
        { type: "field_input", name: "PROPERTY", text: "background" },
        { type: "field_input", name: "VALUE", text: "#f8fafc" }
      ],
      previousStatement: null,
      nextStatement: null,
      colour: 290
    },
    {
      type: "on_click_block",
      message0: "on click of id %1 actions %2",
      args0: [
        { type: "field_input", name: "TARGET_ID", text: "ctaBtn" },
        { type: "input_statement", name: "ACTIONS" }
      ],
      previousStatement: null,
      nextStatement: null,
      colour: 330
    },
    {
      type: "set_text_action",
      message0: "set text of id %1 to %2",
      args0: [
        { type: "field_input", name: "TARGET_ID", text: "heroText" },
        { type: "field_input", name: "TEXT", text: "Clicked!" }
      ],
      previousStatement: null,
      nextStatement: null,
      colour: 345
    },
    {
      type: "alert_action",
      message0: "alert %1",
      args0: [{ type: "field_input", name: "MESSAGE", text: "Hello from U8Code" }],
      previousStatement: null,
      nextStatement: null,
      colour: 345
    }
  ]);
}

export const toolboxXml = `
<xml xmlns="https://developers.google.com/blockly/xml">
  <category name="Page" colour="#3b82f6">
    <block type="page_block"></block>
  </category>

  <category name="HTML Structure" colour="#8b5cf6">
    <block type="container_block"></block>
    <block type="heading_block"></block>
    <block type="paragraph_block"></block>
    <block type="button_block"></block>
    <block type="link_block"></block>
    <block type="image_block"></block>
    <block type="input_block"></block>
    <block type="list_block"></block>
    <block type="list_item_block"></block>
    <block type="custom_html_block"></block>
  </category>

  <category name="CSS" colour="#ec4899">
    <block type="style_rule_block"></block>
  </category>

  <category name="JavaScript" colour="#f97316">
    <block type="on_click_block"></block>
    <block type="set_text_action"></block>
    <block type="alert_action"></block>
  </category>
</xml>
`;