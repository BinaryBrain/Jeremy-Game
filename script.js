$(function () {
	var x;
	var v;
	var ratios;
	var previousTime;
	var startTime;
	var firstStroke = true;
	
	function init () {
		ratios = [];
		x = 0;
		v = 0;

		startTime = new Date();
		previousTime = 0;

		for(var i = 0; i <= 256; i++) {
			var rand = Math.random();
			ratios[i] = rand*rand;
		}

		loop(0);
	}

	function loop (time) {
		var dt = time - previousTime;
		previousTime = time;

		console.log(dt)

		if(Math.round(x) >= 500) {
			v = 0;
			x = 500;

			move(x);

			calcScore();

			return;
		}
		
		v -= 0.01*dt;
		
		x += v;

		if(x < 0) {
			x = 0;
			v = 0;
		}

		move(x);

		window.requestAnimationFrame(loop);
	}

	function calcScore() {
		var dt = new Date()-startTime;
		var score = Math.round(10000000/dt);

		$("#score").text(score);
	}

	function move(x) {
		$("#jeremy").css({ left: Math.round(x) });
	}

	$("body").keypress(function(event) {
		event.preventDefault();

		if(firstStroke) {
			init();
			firstStroke = false;
		}

		var ratio = ratios[event.which];
		x += 10*ratio;
		v = 0;
	});

	$("#restart").on('click', function () {
		document.location = document.location;
		
		// TODO Better way
		var firstStroke = true;
		init();
	});
})
