
function copyCode(text){
  navigator.clipboard.writeText(text);
}

function CodeBlock({title,value}){

  return(
    <div className="codeBlock">

      <div className="codeBlockHeader">
        <span>{title}</span>
        <button className="copyButton" onClick={()=>copyCode(value)}>Copy</button>
      </div>

      <pre>{value}</pre>

    </div>
  )

}

export default function CodePanel({code}){

  return(

    <div className="panel">

      <div className="panelHeader">Generated Code</div>

      <CodeBlock title="HTML" value={code.html}/>
      <CodeBlock title="CSS" value={code.css}/>
      <CodeBlock title="JS" value={code.js}/>

    </div>

  )

}
