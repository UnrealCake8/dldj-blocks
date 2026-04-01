import * as Blockly from "blockly";

let initialized = false;

export function defineU8CodeBlocks() {
  if (initialized) return;
  initialized = true;

Blockly.defineBlocksWithJsonArray([
    // Page block
    {
      type: "page_block",
      message0: "Page title %1 body %2",
      args0: [
        { type: "field_input", name: "TITLE", text: "U8Code Project" },
        { type: "input_statement", name: "BODY" }
      ],
      colour: 230
    },

    // Layout blocks
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
      type: "pre_block",
      message0: "preformatted id %1 class %2 children %3",
      args0: [
        { type: "field_input", name: "ID", text: "" },
        { type: "field_input", name: "CLASS", text: "" },
        { type: "input_statement", name: "CHILDREN" }
      ],
      previousStatement: null,
      nextStatement: null,
      colour: 190
    },

    // Text blocks
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
      type: "span_block",
      message0: "span text %1 id %2 class %3",
      args0: [
        { type: "field_input", name: "TEXT", text: "Inline text" },
        { type: "field_input", name: "ID", text: "" },
        { type: "field_input", name: "CLASS", text: "" }
      ],
      previousStatement: null,
      nextStatement: null,
      colour: 210
    },
    {
      type: "blockquote_block",
      message0: "blockquote text %1 cite %2 id %3 class %4",
      args0: [
        { type: "field_multilinetext", name: "TEXT", text: "This is a quote." },
        { type: "field_input", name: "CITE", text: "" },
        { type: "field_input", name: "ID", text: "" },
        { type: "field_input", name: "CLASS", text: "" }
      ],
      previousStatement: null,
      nextStatement: null,
      colour: 210
    },
    {
      type: "code_block",
      message0: "inline code %1 id %2 class %3",
      args0: [
        { type: "field_input", name: "TEXT", text: "console.log('Hello')" },
        { type: "field_input", name: "ID", text: "" },
        { type: "field_input", name: "CLASS", text: "" }
      ],
      previousStatement: null,
      nextStatement: null,
      colour: 210
    },
    {
      type: "br_block",
      message0: "line break",
      previousStatement: null,
      nextStatement: null,
      colour: 210
    },
    {
      type: "hr_block",
      message0: "horizontal rule id %1 class %2",
      args0: [
        { type: "field_input", name: "ID", text: "" },
        { type: "field_input", name: "CLASS", text: "" }
      ],
      previousStatement: null,
      nextStatement: null,
      colour: 210
    },

    // Media blocks
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
      type: "video_block",
      message0: "video src %1 controls %2 autoplay %3 loop %4 id %5 class %6",
      args0: [
        { type: "field_input", name: "SRC", text: "video.mp4" },
        { type: "field_checkbox", name: "CONTROLS", checked: true },
        { type: "field_checkbox", name: "AUTOPLAY", checked: false },
        { type: "field_checkbox", name: "LOOP", checked: false },
        { type: "field_input", name: "ID", text: "" },
        { type: "field_input", name: "CLASS", text: "" }
      ],
      previousStatement: null,
      nextStatement: null,
      colour: 20
    },
    {
      type: "audio_block",
      message0: "audio src %1 controls %2 autoplay %3 loop %4 id %5 class %6",
      args0: [
        { type: "field_input", name: "SRC", text: "audio.mp3" },
        { type: "field_checkbox", name: "CONTROLS", checked: true },
        { type: "field_checkbox", name: "AUTOPLAY", checked: false },
        { type: "field_checkbox", name: "LOOP", checked: false },
        { type: "field_input", name: "ID", text: "" },
        { type: "field_input", name: "CLASS", text: "" }
      ],
      previousStatement: null,
      nextStatement: null,
      colour: 20
    },
    {
      type: "iframe_block",
      message0: "iframe src %1 width %2 height %3 id %4 class %5",
      args0: [
        { type: "field_input", name: "SRC", text: "https://example.com" },
        { type: "field_input", name: "WIDTH", text: "600" },
        { type: "field_input", name: "HEIGHT", text: "400" },
        { type: "field_input", name: "ID", text: "" },
        { type: "field_input", name: "CLASS", text: "" }
      ],
      previousStatement: null,
      nextStatement: null,
      colour: 20
    },

    // Form blocks
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
      type: "textarea_block",
      message0: "textarea name %1 placeholder %2 rows %3 cols %4 id %5 class %6",
      args0: [
        { type: "field_input", name: "NAME", text: "message" },
        { type: "field_input", name: "PLACEHOLDER", text: "Enter text here" },
        { type: "field_input", name: "ROWS", text: "4" },
        { type: "field_input", name: "COLS", text: "50" },
        { type: "field_input", name: "ID", text: "" },
        { type: "field_input", name: "CLASS", text: "" }
      ],
      previousStatement: null,
      nextStatement: null,
      colour: 100
    },
    {
      type: "select_block",
      message0: "select name %1 id %2 class %3 options %4",
      args0: [
        { type: "field_input", name: "NAME", text: "choice" },
        { type: "field_input", name: "ID", text: "" },
        { type: "field_input", name: "CLASS", text: "" },
        { type: "input_statement", name: "OPTIONS" }
      ],
      previousStatement: null,
      nextStatement: null,
      colour: 100
    },
    {
      type: "option_block",
      message0: "option value %1 text %2 selected %3",
      args0: [
        { type: "field_input", name: "VALUE", text: "1" },
        { type: "field_input", name: "TEXT", text: "Option 1" },
        { type: "field_checkbox", name: "SELECTED", checked: false }
      ],
      previousStatement: null,
      nextStatement: null,
      colour: 100
    },
    {
      type: "checkbox_block",
      message0: "checkbox name %1 value %2 checked %3 id %4 class %5",
      args0: [
        { type: "field_input", name: "NAME", text: "agree" },
        { type: "field_input", name: "VALUE", text: "yes" },
        { type: "field_checkbox", name: "CHECKED", checked: false },
        { type: "field_input", name: "ID", text: "" },
        { type: "field_input", name: "CLASS", text: "" }
      ],
      previousStatement: null,
      nextStatement: null,
      colour: 100
    },
    {
      type: "radio_block",
      message0: "radio name %1 value %2 checked %3 id %4 class %5",
      args0: [
        { type: "field_input", name: "NAME", text: "option" },
        { type: "field_input", name: "VALUE", text: "1" },
        { type: "field_checkbox", name: "CHECKED", checked: false },
        { type: "field_input", name: "ID", text: "" },
        { type: "field_input", name: "CLASS", text: "" }
      ],
      previousStatement: null,
      nextStatement: null,
      colour: 100
    },
    {
      type: "label_block",
      message0: "label text %1 for %2 id %3 class %4",
      args0: [
        { type: "field_input", name: "TEXT", text: "Label text" },
        { type: "field_input", name: "FOR", text: "" },
        { type: "field_input", name: "ID", text: "" },
        { type: "field_input", name: "CLASS", text: "" }
      ],
      previousStatement: null,
      nextStatement: null,
      colour: 100
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
      colour: 100
    },

    // Table blocks
    {
      type: "table_block",
      message0: "table id %1 class %2 children %3",
      args0: [
        { type: "field_input", name: "ID", text: "" },
        { type: "field_input", name: "CLASS", text: "" },
        { type: "input_statement", name: "CHILDREN" }
      ],
      previousStatement: null,
      nextStatement: null,
      colour: 160
    },
    {
      type: "table_row_block",
      message0: "table row id %1 class %2 cells %3",
      args0: [
        { type: "field_input", name: "ID", text: "" },
        { type: "field_input", name: "CLASS", text: "" },
        { type: "input_statement", name: "CELLS" }
      ],
      previousStatement: null,
      nextStatement: null,
      colour: 160
    },
    {
      type: "table_header_block",
      message0: "table header text %1 id %2 class %3",
      args0: [
        { type: "field_input", name: "TEXT", text: "Header" },
        { type: "field_input", name: "ID", text: "" },
        { type: "field_input", name: "CLASS", text: "" }
      ],
      previousStatement: null,
      nextStatement: null,
      colour: 160
    },
    {
      type: "table_cell_block",
      message0: "table cell text %1 id %2 class %3",
      args0: [
        { type: "field_input", name: "TEXT", text: "Cell" },
        { type: "field_input", name: "ID", text: "" },
        { type: "field_input", name: "CLASS", text: "" }
      ],
      previousStatement: null,
      nextStatement: null,
      colour: 160
    },

    // Lists and links
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
      colour: 130
    },

    // Advanced
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

    // CSS
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

    // Event blocks
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
      type: "on_submit_block",
      message0: "on submit of form id %1 actions %2",
      args0: [
        { type: "field_input", name: "TARGET_ID", text: "myForm" },
        { type: "input_statement", name: "ACTIONS" }
      ],
      previousStatement: null,
      nextStatement: null,
      colour: 330
    },
    {
      type: "on_input_block",
      message0: "on input of id %1 actions %2",
      args0: [
        { type: "field_input", name: "TARGET_ID", text: "myInput" },
        { type: "input_statement", name: "ACTIONS" }
      ],
      previousStatement: null,
      nextStatement: null,
      colour: 330
    },
    {
      type: "on_hover_block",
      message0: "on hover of id %1 actions %2",
      args0: [
        { type: "field_input", name: "TARGET_ID", text: "myElement" },
        { type: "input_statement", name: "ACTIONS" }
      ],
      previousStatement: null,
      nextStatement: null,
      colour: 330
    },

    // Action blocks
    {
      type: "alert_action",
      message0: "alert %1",
      args0: [{ type: "field_input", name: "MESSAGE", text: "Hello from U8Code" }],
      previousStatement: null,
      nextStatement: null,
      colour: 345
    },
    {
      type: "console_log_action",
      message0: "console log %1",
      args0: [{ type: "field_input", name: "MESSAGE", text: "Debug message" }],
      previousStatement: null,
      nextStatement: null,
      colour: 345
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
      type: "show_element_action",
      message0: "show element id %1",
      args0: [{ type: "field_input", name: "TARGET_ID", text: "myElement" }],
      previousStatement: null,
      nextStatement: null,
      colour: 345
    },
    {
      type: "hide_element_action",
      message0: "hide element id %1",
      args0: [{ type: "field_input", name: "TARGET_ID", text: "myElement" }],
      previousStatement: null,
      nextStatement: null,
      colour: 345
    },
    {
      type: "toggle_class_action",
      message0: "toggle class %1 on id %2",
      args0: [
        { type: "field_input", name: "CLASS_NAME", text: "active" },
        { type: "field_input", name: "TARGET_ID", text: "myElement" }
      ],
      previousStatement: null,
      nextStatement: null,
      colour: 345
    },
    {
      type: "add_class_action",
      message0: "add class %1 to id %2",
      args0: [
        { type: "field_input", name: "CLASS_NAME", text: "highlight" },
        { type: "field_input", name: "TARGET_ID", text: "myElement" }
      ],
      previousStatement: null,
      nextStatement: null,
      colour: 345
    },
    {
      type: "remove_class_action",
      message0: "remove class %1 from id %2",
      args0: [
        { type: "field_input", name: "CLASS_NAME", text: "highlight" },
        { type: "field_input", name: "TARGET_ID", text: "myElement" }
      ],
      previousStatement: null,
      nextStatement: null,
      colour: 345
    },
    {
      type: "set_style_action",
      message0: "set style %1 of id %2 to %3",
      args0: [
        { type: "field_input", name: "PROPERTY", text: "color" },
        { type: "field_input", name: "TARGET_ID", text: "myElement" },
        { type: "field_input", name: "VALUE", text: "red" }
      ],
      previousStatement: null,
      nextStatement: null,
      colour: 345
    },
    {
      type: "set_attribute_action",
      message0: "set attribute %1 of id %2 to %3",
      args0: [
        { type: "field_input", name: "ATTRIBUTE_NAME", text: "disabled" },
        { type: "field_input", name: "TARGET_ID", text: "myButton" },
        { type: "field_input", name: "VALUE", text: "true" }
      ],
      previousStatement: null,
      nextStatement: null,
      colour: 345
    },
    {
      type: "scroll_to_action",
      message0: "scroll to id %1 behavior %2",
      args0: [
        { type: "field_input", name: "TARGET_ID", text: "mySection" },
        {
          type: "field_dropdown",
          name: "BEHAVIOR",
          options: [
            ["smooth", "smooth"],
            ["auto", "auto"]
          ]
        }
      ],
      previousStatement: null,
      nextStatement: null,
      colour: 345
    },
    {
      type: "get_value_action",
      message0: "get value from id %1 and show in id %2",
      args0: [
        { type: "field_input", name: "INPUT_ID", text: "myInput" },
        { type: "field_input", name: "OUTPUT_ID", text: "output" }
      ],
      previousStatement: null,
      nextStatement: null,
      colour: 345
    },
    {
      type: "set_local_storage_action",
      message0: "set localStorage key %1 to value %2",
      args0: [
        { type: "field_input", name: "KEY", text: "username" },
        { type: "field_input", name: "VALUE", text: "John" }
      ],
      previousStatement: null,
      nextStatement: null,
      colour: 345
    },
    {
      type: "get_local_storage_action",
      message0: "get localStorage key %1 and show in id %2",
      args0: [
        { type: "field_input", name: "KEY", text: "username" },
        { type: "field_input", name: "TARGET_ID", text: "output" }
      ],
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

  <category name="Layout" colour="#8b5cf6">
    <block type="container_block"></block>
    <block type="pre_block"></block>
  </category>

  <category name="Text" colour="#a855f7">
    <block type="heading_block"></block>
    <block type="paragraph_block"></block>
    <block type="span_block"></block>
    <block type="blockquote_block"></block>
    <block type="code_block"></block>
    <block type="br_block"></block>
    <block type="hr_block"></block>
  </category>

  <category name="Media" colour="#ef4444">
    <block type="image_block"></block>
    <block type="video_block"></block>
    <block type="audio_block"></block>
    <block type="iframe_block"></block>
  </category>

  <category name="Forms" colour="#10b981">
    <block type="input_block"></block>
    <block type="textarea_block"></block>
    <block type="select_block"></block>
    <block type="option_block"></block>
    <block type="checkbox_block"></block>
    <block type="radio_block"></block>
    <block type="label_block"></block>
    <block type="button_block"></block>
  </category>

  <category name="Tables" colour="#06b6d4">
    <block type="table_block"></block>
    <block type="table_row_block"></block>
    <block type="table_header_block"></block>
    <block type="table_cell_block"></block>
  </category>

  <category name="Lists & Links" colour="#14b8a6">
    <block type="list_block"></block>
    <block type="list_item_block"></block>
    <block type="link_block"></block>
  </category>

  <category name="Advanced" colour="#6b7280">
    <block type="custom_html_block"></block>
  </category>

  <category name="CSS" colour="#ec4899">
    <block type="style_rule_block"></block>
  </category>

  <category name="Events" colour="#f97316">
    <block type="on_click_block"></block>
    <block type="on_submit_block"></block>
    <block type="on_input_block"></block>
    <block type="on_hover_block"></block>
  </category>

  <category name="Actions" colour="#f59e0b">
    <block type="alert_action"></block>
    <block type="console_log_action"></block>
    <block type="set_text_action"></block>
    <block type="show_element_action"></block>
    <block type="hide_element_action"></block>
    <block type="toggle_class_action"></block>
    <block type="add_class_action"></block>
    <block type="remove_class_action"></block>
    <block type="set_style_action"></block>
    <block type="set_attribute_action"></block>
    <block type="scroll_to_action"></block>
    <block type="get_value_action"></block>
    <block type="set_local_storage_action"></block>
    <block type="get_local_storage_action"></block>
  </category>
</xml>
`;