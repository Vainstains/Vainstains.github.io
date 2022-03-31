
function drawCircle(ctx, x, y, radius, fill, stroke, strokeWidth) {
  ctx.beginPath()
  ctx.arc(x, y, radius, 0, 2 * Math.PI, false)
  if (fill) {
    ctx.fillStyle = fill
    ctx.fill()
  }
  if (stroke) {
    ctx.lineWidth = strokeWidth
    ctx.strokeStyle = stroke
    ctx.stroke()
  }
}


function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}

var x = new Array(0);
var y = new Array(0);
for(let i = 0; i < 3; i++)
    {
x.push(getRandomArbitrary(50,550));
y.push(getRandomArbitrary(50,250));
}

var acc = 1;

setInterval(doTickLoop, 33);

function processClick(mx,my){
    for(let i = 0; i < x.length; i++)
    {
        let x1=mx-x[i];
        let y1=my-y[i];
        let dist = Math.sqrt((x1*x1)+(y1*y1));
        if(dist<23)
        {
            x[i]=getRandomArbitrary(50,550);
            y[i]=getRandomArbitrary(50,250);
            acc = (acc+acc+(1-(Math.max(dist-2,0)/20)))/3;
            document.getElementById("Acc").textContent=(acc*100).toFixed(2)+"% Accuracy";
        }
    }
}

var canvas;
var a = false

  function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
      x: evt.clientX - rect.left,
      y: evt.clientY - rect.top
    };
  }
  

		function beep()
		{
			
		}
		function doTickLoop()
		{
			draw();
			if(!a){
                canvas.addEventListener('mousedown', function(evt) {
    var mousePos = getMousePos(canvas, evt);
    processClick(mousePos.x, mousePos.y);
  }, false);
  a=true;
            }
		}
		function draw() 
		{

		    //draw backcolor
            canvas = document.getElementById("Graph");
            if (canvas.getContext) {
            var ctx = canvas.getContext("2d");
			ctx.fillStyle = 'rgba(10, 10, 20, 1)';
            ctx.fillRect(0, 0, 600, 300);
			for(let i = 0; i < x.length; i++)
			{
			    drawCircle(ctx, x[i], y[i], 20, 'rgba(190, 20, 20, 0)','rgba(190, 20, 20, 1)', 2);
			    drawCircle(ctx, x[i], y[i], 3, 'rgba(190, 20, 20, 0)','rgba(20, 190, 20, 1)', 2);

			}

			var centerX = canvas.width / 2;
            var centerY = canvas.height / 2;
            var radius = 70;
            
            
        }
}