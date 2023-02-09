function addCode() 
{
   var tag = document.createElement("p");
   var text = document.createTextNode("Daniel Aspinwall 2023 | dbaspinwall1@gmail.com | Message Of The Day: " + getMOTD());
   var text1 = document.createTextNode("-This site is currently in development.-");
   var footerLineElement = document.createElement("div");
   footerLineElement.className = "footerLine";
   tag.appendChild(footerLineElement);
   tag.appendChild(text);
   tag.appendChild(document.createElement("br"));
   tag.appendChild(text1);
   var element = document.getElementById("bottomText");
   element.style.fontSize = "18px";
   element.style.color = "#ffffff70";
   element.style.position = "absolute";
   element.style.textAlign = "center";
   element.style.left = "0px";
   element.style.right = "0px";
   element.style.bottom = "0px";
   element.style.margin = "0px";
   element.appendChild(tag);
}
window.onload = addCode;

function getMOTD()
{
   var motd = "";
   var motdArray = [
      "I'm a programmer, not a designer.",
      "I swear i didn't copy and paste this from stackoverflow",
      "int sad = 1;",
      "A programmer is a tool that converts caffeine into code.",
      "Programming is 10% coding, 90% Google searching.",
      "I'm not lazy, I'm just very relaxed.",
      "Try Minecraft!",
      "Wishlist Karlson on steam now, gamers!",
      "Danny by C418 is the best, and that is scientific fact.",
      "My favorite color is #1df1a9",
      "Optimization is for nerds.",
      ];
   var randomNumber = new Date().getDate() % motdArray.length;
   motd = motdArray[randomNumber];
   return motd;
}