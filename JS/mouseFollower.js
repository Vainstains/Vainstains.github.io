window.addEventListener('DOMContentLoaded', (evt) => {
    let buttons = [];
    let buttonOffsets = []
    let test = document.getElementsByTagName("button");
    for(let i = 0; i < test.length; i+=1)
    {
        buttons.push(false)
        buttonOffsets.push({x:0,y:0});
        test[i].addEventListener("mouseleave", function (event) {
            buttons[i] = false;
          }, false);
          test[i].addEventListener("mouseover", function (event) {
            buttons[i] = true;
          }, false);
    }
    function testformouse(){
        boolOut = false;
        for(let i = 0; i < buttons.length; i+=1)
        {
            boolOut |= buttons[i];
        }
        return boolOut;
    }
    function getPosition( element ) {
        var rect = element.getBoundingClientRect();
        return {
            x: rect.left,
            y: rect.top
        };
    }
    function updateButtons(){
        for(let i = 0; i < buttons.length; i+=1){
            if(!buttons[i]){
                buttonOffsets[i].x += -buttonOffsets[i].x;
                buttonOffsets[i].y += -buttonOffsets[i].y;
            }
            else{
                buttonOrigin = getPosition(test[i]);
                buttonOrigin.x += test[i].offsetWidth/2;
                buttonOrigin.y += test[i].offsetHeight/2;
                buttonOrigin.x -= buttonOffsets[i].x;
                buttonOrigin.y -= buttonOffsets[i].y;
                buttonOffsets[i].x += (mx - buttonOrigin.x)/3;
                buttonOffsets[i].y += (my - buttonOrigin.y)/3;
                buttonOffsets[i].x += -buttonOffsets[i].x/1.4;
                buttonOffsets[i].y += -buttonOffsets[i].y/1.4;
            }
            test[i].style.transform = "translate("+buttonOffsets[i].x+"px, "+buttonOffsets[i].y+"px)";
        }
    }
    function getclosesttomouse(){
        let closest = 999999;
        let resX = 0, resY = 0, resSy = 0, resSx = 0;
        for(let i = 0; i < buttons.length; i+=1){
            elmt = test[i];
            pos = getPosition(elmt);
            dist = Math.sqrt((((pos.x + elmt.offsetWidth/2)-mx)*((pos.x + elmt.offsetWidth/2)-mx))+(((pos.y + elmt.offsetHeight/2)-my)*((pos.y + elmt.offsetHeight/2)-my)));
            
            if(dist < closest)
            {
                closest = dist;
                resX = pos.x + elmt.offsetWidth/2;
                resY = pos.y + elmt.offsetHeight/2;
                resSx = elmt.offsetWidth;
                resSx = elmt.offsetHeight;
            }
            if(buttons[i]){
                return {
                    x: pos.x + elmt.offsetWidth/2,
                    y: pos.y + elmt.offsetHeight/2,
                    w: elmt.offsetWidth,
                    h: elmt.offsetHeight,
                    dst:0
                };
            }
        }
        return {
            x: resX,
            y: resY,
            w: resSx,
            h: resSy,
            dst:Math.max(closest, 50)
        };
    }

    let div = document.createElement("div");
    div.id = "mouseFollow" ;
    div.style.position = "absolute";
    div.style.width = "30px";
    div.style.height = "30px";
    div.style.top = 0;
    div.style.left = 0;
    div.style.borderTopLeftRadius= "50%";
    div.style.borderTopRightRadius="50%";
    div.style.borderBottomLeftRadius= "50%";
    div.style.borderBottomRightRadius="50%";
    div.style.border = "solid 2px rgba(255,255,255,0.2)";
    div.style.outline = "solid 8px rgba(255,255,255,0.03)";
    div.style.pointerEvents = "none"
    div.style.overflow = "hidden";
    div.style.zIndex = 9999;
    let div1 = document.createElement("div");
    div1.id = "mouseFollow1" ;
    div1.style.position = "absolute";
    div1.style.width = "20px";
    div1.style.height = "20px";
    div1.style.top = 0;
    div1.style.left = 0;
    div1.style.borderTopLeftRadius= "50%";
    div1.style.borderTopRightRadius="50%";
    div1.style.borderBottomLeftRadius= "50%";
    div1.style.borderBottomRightRadius="50%";
    div1.style.border = "solid 2px rgba(255,255,255,0.2)";
    div1.style.pointerEvents = "none"
    div1.style.overflow = "hidden";
    div1.style.zIndex = 9999;

    document.body.appendChild(div);
    document.body.appendChild(div1);

    let mx = 0, my = 0;

    let posX = 0, posY = 0;
    let size = 30;
    let posX1 = 0, posY1 = 0;
    let size1 = 30;
    let opacity = 0;
    let opacity1 = 0;
    window.addEventListener("mousemove", (evt)=>{
        mx = evt.pageX; my = evt.pageY;
    });
    setInterval(function(){
        updateButtons();
        if(testformouse()) {
            let pos = getclosesttomouse();

            size += (30-size)*0.0815;
            posX += ((pos.x+pos.x+pos.x+pos.x+pos.x+mx)/6-posX)*0.11;
            posY += ((pos.y+pos.y+pos.y+pos.y+pos.y+my)/6-posY)*0.11;
            
            size1 += (15-size1)*0.15;
            posX1 += ((pos.x+mx*2)/3-posX1)*0.11;
            posY1 += ((pos.y+my*2)/3-posY1)*0.11;
            opacity += (0.5-opacity) * 0.04;
            opacity1 += (0.7-opacity1) * 0.08;
        }
        else { 
            let pos = getclosesttomouse();
            let relX = (pos.x-mx)/(pos.dst*pos.dst*pos.dst*2);
            let relY = (pos.y-my)/(pos.dst*pos.dst*pos.dst*2);
            if(pos.dst > 90) {
                relX = 0;
                relY = 0;
            }
            size += ((4 + 400/pos.dst)-size)*0.1;
            size1 += ((8 + 600/pos.dst)-size1)*0.1;
            posX += (mx-posX + relX*150000)*0.125;
            posY += (my-posY + relY*150000)*0.125;
            posX1 += (posX-posX1 - relX*101000)*0.113;
            posY1 += (posY-posY1 - relY*101000)*0.113;
            
            opacity += (0.1-opacity) * 0.15;
            opacity1 += (0.1-opacity1) * 0.08;
        }

        div.style.border = "solid 1px rgba(255,255,255,"+opacity+")";
        div.style.outline = "solid 6px rgba(255,255,255,"+(opacity/5)+")";
        div1.style.border = "solid 1px rgba(255,255,255,"+opacity1+")";

        
        div.style.top = (posY-(div.offsetHeight/2)) + "px";
        div.style.left = (posX-(div.offsetWidth/2)) + "px";

        div1.style.width = size1 + "px";
        div1.style.height = size1 + "px";
        div1.style.top = (posY1-(div1.offsetHeight/2)) + "px";
        div1.style.left = (posX1-(div1.offsetWidth/2)) + "px";
    }, 10);
});