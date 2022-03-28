var start, clicks, highest = 0;
		var span = document.getElementById("CPStext");
		var going = false;
		setInterval(doTickLoop, 125);

		clicks = -1;
			    start=performance.now();
			    ticks=0;
			    span = document.getElementById("CPStext");
				times = new Array(0);
				going = true;

		function beep()
		{
			clicks++;
		}
		var ticks = 0, seconds = 5;
		var times;
		var time, rltime = 0, rt1 = 0;
		function doTickLoop()
		{
		    if(going)
		    {

			    if(span == null)
				{
					span = document.getElementById("CPStext");
				}

		        time = 1/(((performance.now()-start)/1000)/clicks);
				rt1 += (time-rt1)/2
				rltime += (rt1-rltime)/2;
				
				times.push(rltime);
			    if(rltime>highest)
				{
				    highest=rltime;
				}
		        start=performance.now();
		        span.textContent = rltime.toFixed(2) + " clicks per second";
				
				
				ticks++;
				clicks=0;
		    }
			draw();
			
		}
		function draw() 
		{
		    //draw backcolor
            var canvas = document.getElementById("Graph");
            if (canvas.getContext) {
            var ctx = canvas.getContext("2d");
			ctx.fillStyle = 'rgba(10, 10, 20, 1)';
            ctx.fillRect(0, 0, 400, 250);
			var i1=1;
			var i2=times.length;
			if(times.length>100)
			{
			    i1=times.length-100;
				i2=100;
			}
			var i3 = 1;
			//draw graph Lines
			ctx.strokeStyle = 'rgba(70, 70, 100, 1)';
            ctx.beginPath();
            ctx.moveTo(60,50);
            ctx.lineTo(400,50);
            ctx.stroke();

			ctx.beginPath();
            ctx.moveTo(60,100);
            ctx.lineTo(400,100);
            ctx.stroke();

			ctx.beginPath();
            ctx.moveTo(60,150);
            ctx.lineTo(400,150);
            ctx.stroke();
			//draw graph numbers
			ctx.fillStyle = 'rgba(70, 70, 100, 1)';
			ctx.font = "15px Lucida Console";
            ctx.fillText(highest.toFixed(1), 20, 11);

			ctx.fillStyle = 'rgba(70, 70, 100, 1)';
			ctx.font = "15px Lucida Console";
            ctx.fillText((highest*0.75).toFixed(1), 20, 55.5);

			ctx.fillStyle = 'rgba(70, 70, 100, 1)';
			ctx.font = "15px Lucida Console";
            ctx.fillText((highest*0.5).toFixed(1), 20, 105.5);

			ctx.fillStyle = 'rgba(70, 70, 100, 1)';
			ctx.font = "15px Lucida Console";
            ctx.fillText((highest*0.25).toFixed(1), 20, 155.5);

			ctx.fillStyle = 'rgba(70, 70, 100, 1)';
			ctx.font = "15px Lucida Console";
            ctx.fillText("0.0", 20, 199);

			//draw graph itself
			for(let i = i1; i < times.length; i++)
			{
			    ctx.strokeStyle = 'rgba(150, 150, 200, 1)';
                ctx.beginPath();
                ctx.moveTo((i3-1)*(340/i2)+60, 200-(times[i-1]*(200/highest)));
                ctx.lineTo(i3*(340/i2)+60, 200-(times[i]*(200/highest)));
                ctx.stroke();
				i3++
			}
        }
}