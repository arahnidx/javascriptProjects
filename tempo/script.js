document.querySelector('.busca').addEventListener('submit', async (event) =>{
    event.preventDefault();

    let input = document.querySelector('#searchInput').value;

    if(input !== ''){
        document.querySelector('.resultado').style.display = 'none';
        showWarning('Carregando...');
        
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(input)}&appid=72ee196f51cad15da6135477d80c7297&units=metric&lang=pt_br`;
        
        let results = await fetch(url);
        let json = await results.json();


        if(json.cod == 200){
            
            showInfo({
                name: json.name,
                country: json.sys.country,
                temp: json.main.temp,
                tempIcon: json.weather[0].icon,
                windSpeed: json.wind.speed,
                windAngle: json.wind.deg
            })
        } else{
            document.querySelector('.resultado').style.display = 'none';
            showWarning('Não encontramos esta localização.');  
        }
    }
    else{
        document.querySelector('.resultado').style.display = 'none';
        showWarning('');
    }
});

function showInfo(json){
    showWarning('');
    document.querySelector('.resultado').style.display = 'block';
    document.querySelector('.titulo').innerHTML = `${json.name}, ${json.country}`;
    document.querySelector('.tempInfo').innerHTML = `${json.temp} <sup>°C</sup>`;
    document.querySelector('.ventoInfo').innerHTML = `${json.windSpeed} <span>km/h</span>`;

    document.querySelector('.temp img').setAttribute('src', `http://openweathermap.org/img/wn/${json.tempIcon}@2x.png`);
    document.querySelector('.ventoPonto').setAttribute('style', `transform: rotate(${json.windAngle-90}deg)`);

}



function showWarning(msg){
    document.querySelector('.aviso').innerHTML = msg;
}