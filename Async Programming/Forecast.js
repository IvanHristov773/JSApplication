function attachEvents() {
    const host = 'https://judgetests.firebaseio.com/';

    $('#submit').click(getWeather);

    function getWeather() {
        let locationName = $('#location').val();

        $.get(host + 'locations.json')
            .then(parseData);

        function parseData(codes) {
            let code;
            for (let loc of codes) {
                if (loc.name == locationName) {
                    code = loc.code;
                    break;
                }
            }

            Promise.all([$.get(`https://judgetests.firebaseio.com/forecast/today/${code}.json`),
                $.get(`https://judgetests.firebaseio.com/forecast/upcoming/${code}.json`)]).then(handleForecast);

        }

        function handleForecast([today, upcoming]) {
            let symbol;

            switch (today.forecast.condition) {
                case 'Sunny':
                    symbol = '&#x2600';
                    break;
                case 'Partly sunny':
                    symbol = '&#x26C5';
                    break;
                case 'Overcast':
                    symbol = '&#x2601';
                    break;
                case 'Rain':
                    symbol = '&#x2614';
                    break;
            }

            const htmlSytmbol = `<span class="condition symbol">${symbol}</span>`;
            const htmlContent = `<span class="condition">
<span class="forecast-data">${today.name}</span>
<span class="forecast-data">${today.forecast.low}°/${today.forecast.high}°</span>
<span class="forecast-data">${today.forecast.condition}</span>
</span>`;
            $('#current').empty();
            $('#current').append('<div class="label">Current conditions</div>');
            $('#current').append(htmlSytmbol);
            $('#current').append(htmlContent);

            $('#forecast').show();

            for (let data of upcoming.forecast){
                let symbol;

                switch (data.condition) {
                    case 'Sunny':
                        symbol = '&#x2600';
                        break;
                    case 'Partly sunny':
                        symbol = '&#x26C5';
                        break;
                    case 'Overcast':
                        symbol = '&#x2601';
                        break;
                    case 'Rain':
                        symbol = '&#x2614';
                        break;
                }
                const htmlContent = `<span class="upcoming">
<span class="symbol">${symbol}</span>
<span class="forecast-data">${data.low}°/${data.high}°</span>
<span class="forecast-data">${data.condition}</span>
</span>`;
                $('#upcoming').append(htmlContent);
            }
        }


    }
}
