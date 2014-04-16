var timeLeft = 0,
	totalTime = 0,
	lastTime = 0,
	paused = true,
	timeOut;
var makeTime = function(seconds) {
	var timeString = ("0" + Math.floor(seconds/60)).slice(-2);
	timeString += ":";
	timeString += ("0" + seconds%60).slice(-2);
	return timeString;
}
var alertTime = function(message) {
	$("#alert").html(message).fadeIn(200);
	setTimeout(function() {
		$("#alert").fadeOut(800);
	}, 5000);
}
var tick = function() {
	if (timeLeft > 0 && !paused) {
		$("h1").html(makeTime(timeLeft));
		document.title = "APTimer - " + $("h1").html();
		switch (timeLeft) {
			case 600:
				alertTime("10 Minutes");
				break;
			case 300:
				alertTime("5 Minutes");
				break;
			case 60:
				alertTime("1 Minute");
				break;
			case 30:
				alertTime("30 Seconds");
				break;
		}
		timeLeft -= Math.floor(new Date().getTime()/1000) - Math.floor(lastTime/1000);
		lastTime = new Date().getTime();
		timeOut = setTimeout(tick, 100);
	} else {
		if (!paused) {
			paused = true;
			$("h1").html("00:00");
			document.title = "APTimer";
			alertTime("Terminé");	
		}
	}
}
var startTimer = function(time) {
	if (paused && timeLeft > 0) {
		paused = false;
		timeLeft = time;
		lastTime = new Date().getTime();
		tick();
	}
}
$(document).ready(function() {
	$(".icon#pause").click(function() {
		paused = true;
		$("#alert").fadeOut(800);
		clearTimeout(timeOut);
	});
	$(".icon#play").click(function() {
		startTimer(timeLeft);
	});
	$(".icon#rewind").click(function() {
		paused = true;
		$("#alert").fadeOut(800);
		clearTimeout(timeOut);
		timeLeft = totalTime;
		$("h1").html(makeTime(timeLeft));
		document.title = "APTimer - " + $("h1").html();
	});
	$("h2").click(function() {
		paused = true;
		$("#alert").fadeOut(800);
		clearTimeout(timeOut);
		$("h1").html(makeTime(parseInt($(this).attr("data-seconds"))));
		document.title = "APTimer - " + $("h1").html();
		timeLeft = $(this).attr("data-seconds");
		totalTime = timeLeft;
		$("h2.active").removeClass("active");
		$(this).addClass("active");
	});
});