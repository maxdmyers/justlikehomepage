function startTime() {
    var today = new Date();
    var h = today.getHours();
    var m = today.getMinutes();
    var amPM = (h > 11) ? "pm" : "am";

    h = today.getHours() % 12 || 12
    m = checkTime(m);

    document.getElementById('clock').innerHTML = h + ":" + m;
    var t = setTimeout(startTime, 500);
}

function checkTime(i) {
    return (i < 10) ? i = "0" + i : i;  // add zero in front of numbers < 10
}

function getDayOfTheWeek(today) {
	var weekdays = [
		"Sun",
		"Mon",
		"Tues",
		"Wed",
		"Thurs",
		"Fri",
		"Sat"
	];
	return weekdays[today.getDay()];
}

function getMonthOfTheYear(today) {
	var months = [
		"January",
		"February",
		"March",
		"April",
		"May",
		"June",
		"July",
		"August",
		"September",
		"October",
		"November",
		"December"
	];
	return months[today.getMonth()];
}

function timeSince(previous) {

    var msPerMinute = 60 * 1000;
    var msPerHour = msPerMinute * 60;
    var msPerDay = msPerHour * 24;
    var msPerMonth = msPerDay * 30;
    var msPerYear = msPerDay * 365;
    var current = new Date();

    var elapsed = current - previous;

    if (elapsed < msPerMinute) {
         return Math.round(elapsed/1000) + ' seconds ago';   
    }
    else if (elapsed < msPerHour) {
         return Math.round(elapsed/msPerMinute) + ' minutes ago';   
    }
	else if (elapsed < msPerDay ) {
         return Math.round(elapsed/msPerHour ) + ' hours ago';   
    }
	else if (elapsed < msPerMonth) {
        return 'approximately ' + Math.round(elapsed/msPerDay) + ' days ago';   
    }
	else if (elapsed < msPerYear) {
        return 'approximately ' + Math.round(elapsed/msPerMonth) + ' months ago';   
    }
	else {
        return 'approximately ' + Math.round(elapsed/msPerYear ) + ' years ago';   
    }
}

function checkDate() {
    var today = new Date();
    var h = today.getHours();
    var day = getDayOfTheWeek(today);
	var mon = getMonthOfTheYear(today);

    var timeOfDayArray = [
        [0, 4, CONFIG.greetingNight], 
        [5, 11, CONFIG.greetingMorning],
        [12, 17, CONFIG.greetingAfternoon],
        [18, 22, CONFIG.greetingEvening],
        [23, 24, CONFIG.greetingNight]
    ];

    for(var i = 0; i < timeOfDayArray.length; i++){
        if(h >= timeOfDayArray[i][0] && h <= timeOfDayArray[i][1]){
            document.getElementById('greeting').innerHTML = timeOfDayArray[i][2];
        }
    }

    document.getElementById('today').innerHTML = day + ', ' + mon + ' ' + today.getDate();
}


function weatherFetcher() {
	return {
		weatherData: null,
		weatherIcon: null,
		fetchWeatherData() {
			var url = 'https://api.openweathermap.org/data/2.5/weather?units=imperial&lat=' + CONFIG.lat + '&lon=' + CONFIG.lng + '&appid=' + CONFIG.weatherApiKey;
			let icons = {
				"01d": "clear-day",
				"01n": "clear-night",
				"02d": "partly-cloudy-day",
				"02n": "partly-cloudy-night",
				"03d": "cloudy",
				"03n": "cloudy",
				"04d": "cloudy",
				"04n": "cloudy",
				"09d": "rain",
				"09n": "rain",
				"11d": "thunderstorms",
				"11n": "thunderstorms",
				"13d": "snow",
				"13n": "snow",
				"50d": "fog",
				"50n": "fog"
			};

			fetch(url)
			.then(res => {
				return res.json();
			}).then(data => {
				this.weatherData = data;
				this.weatherIcon = '../dist/svg/' + icons[data.weather[0].icon] + '.svg';
			}).catch(error => {
				console.log(error);
			});
		}
	}
}

function newsFetcher() {
	return {
		newsArticles: null,
		fetchNews() {
			var url = 'https://api.newscatcherapi.com/v2/latest_headlines?page_size=3&countries=us&topic=tech&lang=en';
			fetch(url, {
				headers: {
			      'x-api-key': CONFIG.newsApiKey
			    },
			})
			.then(res => {
				return res.json();
			}).then(data => {
				this.newsArticles = data.articles;
			}).catch(error => {
				console.log(error);
			});
		}
	}
}


const init = () => {
	startTime();
	checkDate();
}

init();