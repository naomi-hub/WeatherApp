const weather_API_Key = "6507f4fb6820e369eedd7e68d688b3cc";

function getWeatherData(position) {
    const URL = "https://api.openweathermap.org/data/2.5/weather?lat=" +
        position.coords.latitude + "&lon=" +
        position.coords.longitude + "&appid=";
    const xhttp = new XMLHttpRequest();
    xhttp.onload = function() {
        document.getElementById("demo").innerHTML =
            this.responseText;
        const myArr = this.responseText.split("{");
        const mySplitArr = myArr[4].split(":");
        let temp = parseFloat(mySplitArr[1]);
        colorBasedOnWeather(temp)
    }
    xhttp.open("GET", URL + weather_API_Key)
    xhttp.send()
}

function colorBasedOnWeather(temp) {
    if (temp > 294) {
        document.body.style.backgroundColor = 'red'
        document.body.style.backgroundImage = "url('https://www.google.com/search?q=background+picture&sxsrf=ALiCzsYmnkW2uOYmGL6S8y7faVuV-MW2MQ:1651606977451&tbm=isch&source=iu&ictx=1&vet=1&fir=FIs_-Uj7dvwUdM%252C0aKRK2RZxWjguM%252C_%253Brf-rFvyFBL__0M%252CWliKd5L_7jKt4M%252C_%253BfYz9WKKfjEKvCM%252CVBhN99_jMoH1jM%252C_%253BgqzX1TfESdsqZM%252C0aKRK2RZxWjguM%252C_%253BGM5UfQxGtdz0KM%252CQNklfQawUBkyDM%252C_%253Bgsq1qO8xIJf5xM%252Ci5oUTEWCwPkbrM%252C_%253BoyYIYwb0H1yz7M%252C0aKRK2RZxWjguM%252C_%253Bu-T79F0t_SHhHM%252CW9kiGKk9q956IM%252C_%253Bx-lvRKo4RLNHJM%252CbKJ3gdlWTtaNoM%252C_%253BzGYx5A9odlSFvM%252CnrS8yXEy4V6zEM%252C_%253Bmx0EcPhvyYSvhM%252CjojOYEfAMzw1FM%252C_%253Bg7I3hmKyL8D4RM%252CwZvbbt7eb2uqQM%252C_%253BMf0CeDmYQbtKpM%252C0aKRK2RZxWjguM%252C_%253BsiX01uAf5qVBSM%252CDTqzyg6TX3ruGM%252C_%253BglOou5mBtEMGKM%252CkMZZQGcyyX5myM%252C_%253B7RXTJRZv8VXYCM%252C-RFhb4xmB-sS8M%252C_&usg=AI4_-kRRtlsrDtrDAFZKnbtsV5avw2SXeA&sa=X&ved=2ahUKEwjU7su5i8T3AhVOWs0KHb2yCGUQ9QF6BAgjEAE#imgrc=rf-rFvyFBL__0M')"
    } else if (temp < 273) {
        document.body.style.backgroundColor = 'blue'
        document.body.style.backgroundImage = "url('https://www.google.com/search?q=background+picture+snowy&tbm=isch&ved=2ahUKEwidooaLjMT3AhVJRc0KHS6JB-UQ2-cCegQIABAA&oq=background+picture+snowy&gs_lcp=CgNpbWcQAzoFCAAQgAQ6BggAEAgQHlAAWPQFYOEHaABwAHgAgAFdiAGSA5IBATWYAQCgAQGqAQtnd3Mtd2l6LWltZ8ABAQ&sclient=img&ei=bIZxYp28EMmKtQaukp6oDg#imgrc=NEi9Bfd_JgZZNM')"
    } else {
        document.body.style.backgroundColor = 'purple'
        document.body.style.backgroundImage = "url('https://www.google.com/search?q=background+picture+sunny+&tbm=isch&ved=2ahUKEwjF4Py6i8T3AhUsB50JHUO8DcwQ2-cCegQIABAA&oq=background+picture+sunny+&gs_lcp=CgNpbWcQA1AAWABgAGgAcAB4AIABAIgBAJIBAJgBAKoBC2d3cy13aXotaW1n&sclient=img&ei=xIVxYsXuFKyO9PwPw_i24Aw#imgrc=4HObA2wFUx9FaM')"

    }
}

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(getWeatherData);
    } else {
        document.getElementById("demo").innerHTML = "Geolocation is not supported by this browser.";
    }
}


function setup() {
    const button = document.getElementById('submit');
    button.addEventListener('click', async function() {
        const input = document.getElementById('city');
        const print = await getLatLongFromCity(input.value)
        getWeatherData(print)
    });
}

function getLatLongFromCity(cityName) {
    return new Promise(function(resolve, reject) {
        const URLCity = "http://api.openweathermap.org/geo/1.0/direct?q=" + cityName + "&limit=1&appid=" + weather_API_Key
        const xhttp = new XMLHttpRequest();
        xhttp.onload = function() {
            const input = JSON.parse(this.responseText);
            const latLong = { "coords": {} }
            latLong.coords.longitude = input[0].lon
            latLong.coords.latitude = input[0].lat
            resolve(latLong)
        }
        xhttp.open("GET", URLCity)
        xhttp.send()
    });
}

// everything we need to run when the page loads (will be put into a method later) load 
window.onload = setup

//change the background color depending on the temperature... ig it above a certain degree, set it to a color