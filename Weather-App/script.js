const container = document.querySelector('.container');
const search = document.querySelector('.search-box button');
const weatherOver = document.querySelector('.weatherOver');
const weatherInfo = document.querySelector('.weatherInfo');
const error404 = document.querySelector('.not-found');
const popUp = document.querySelector('.popup');

const resetTime = 5000;
const newResTime = 3000;

let clickedOnWait = false;

search.addEventListener('click', () => {
    if (clickedOnWait) {
        container.style.height = '400px';
        popUp.classList.remove('hidden');
        popUp.classList.add('aniFadeIn');
        setTimeout(() => {
            popUp.classList.add('hidden');
            popUp.classList.remove('aniFadeIn');
            container.style.height = '590px';
        }, resetTime);
        return;
    }

    clickedOnWait = true;

    setTimeout(() => {
        clickedOnWait = false;
    }, newResTime);

    const APIKey = 'cdf299cd9ae4ac6e015bf61a6cf8c970';
    const city = document.querySelector('.search-box input').value;

    if (city === '') return;

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`)
        .then(response => response.json())
        .then((data) => {
            if (data.cod === '404') {
                container.style.height = '400px';
                weatherOver.style.display = 'none';
                weatherInfo.style.display = 'none';
                error404.style.display = 'block';
                error404.classList.add('aniFadeIn');
                return;
            }

            error404.style.display = 'none';
            error404.classList.remove('aniFadeIn');

            const image = document.querySelector('.weatherOver img');
            const temperature = document.querySelector('.weatherOver .temp');
            const description = document.querySelector('.weatherOver .desc');
            const humidity = document.querySelector('.weatherInfo .humidity span');
            const wind = document.querySelector('.weatherInfo .wind span');

            switch (data.weather[0].main) {
                case 'Clear':
                    image.src = 'images/clear.png';
                    break;

                case 'Rain':
                    image.src = 'images/rain.png';
                    break;

                case 'Snow':
                    image.src = 'images/snow.png';
                    break;

                case 'Clouds':
                    image.src = 'images/cloud.png';
                    break;

                case 'Haze':
                    image.src = 'images/mist.png';
                    break;

                case 'Mist':
                    image.src = 'images/mist.png';
                    break;

                default:
                    image.src = '';
            }

            console.log(data);

            temperature.innerHTML = `${data.main.temp} <span>°C</span>`;
            description.innerHTML = `${data.weather[0].description}`;
            humidity.innerHTML = `${data.main.humidity}%`;
            wind.innerHTML = `${parseInt(data.wind.speed)}Km/h`;

            weatherOver.style.display = '';
            weatherInfo.style.display = '';
            weatherOver.classList.add('aniFadeIn');
            weatherInfo.classList.add('aniFadeIn');
            container.style.height = '590px';
        });
});
