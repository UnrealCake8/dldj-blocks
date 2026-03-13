
export function generateCode(model){

let html="";
let css="";
let js="";

let textId=null;
let buttonId=null;

model.forEach((node,index)=>{

if(node.type==="text_block"){
textId="text-"+index;
html+=`<p id="${textId}">${node.text}</p>`;
}

if(node.type==="button_block"){
buttonId="btn-"+index;
html+=`<button id="${buttonId}">${node.label}</button>`;
}

});

model.forEach(node=>{

if(node.type==="onclick_event" && buttonId && textId){

js+=`
document.getElementById("${buttonId}").onclick = () => {
document.getElementById("${textId}").textContent="${node.value}";
};
`

}

});

css=`
body{
font-family:Arial;
padding:40px;
}
button{
padding:10px 18px;
font-size:16px;
}
`;

return{html,css,js}

}
