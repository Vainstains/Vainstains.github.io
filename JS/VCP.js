function addCode() 
{
   var tag = document.createElement("p");
   var text = document.createTextNode("This site is currently in develpoment.");
   tag.appendChild(text);
   var element = document.getElementById("bottomText");
   element.appendChild(tag);
}
addCode();