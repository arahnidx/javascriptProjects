let digitalElement = document.querySelector('.digital');
let sElement = document.querySelector('.p_s');
let mElement = document.querySelector('.p_m');
let hElement = document.querySelector('.p_h');

function updateClock(){
    let now = new Date();
    let hour = fixZero(now.getHours());
    let minutes = fixZero(now.getMinutes());
    let seconds = fixZero(now.getSeconds());



    digitalElement.innerHTML = `${hour}:${minutes}:${seconds}`;

    sElement.style.transform = `rotate(${seconds*6-90}deg)`;
    mElement.style.transform = `rotate(${minutes*6-90}deg)`;
    hElement.style.transform = `rotate(${hour*30-90}deg)`;
}

function fixZero(time){
    if(time<10){
        return '0'+time;
    }
    else{
        return time;
    }
}

function timeToDeg(time){
    return (time*6)-90;
}

setInterval(updateClock, 1000);
updateClock();

