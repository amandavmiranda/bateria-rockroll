const playingClass = 'playing';

/* efeito inclinação "pratos" */ 
crashRide = document.getElementById('crash-ride');
hiHatTop = document.getElementById('hihat-top');

const animateCrashOrRide = () => {
    crashRide.style.transform = 'rotate(0deg) scale(1.5)';
};

/* efeito cymbal, "prato fechado" */ 
const animateHiHatClosed = () => {
    hiHatTop.style.top = '175px';
};

const playSound = a => {
    const keyCode = a.keyCode;
    keyElement = document.querySelector(`div[data-key="${keyCode}"]`)
    if(!keyElement) return;

    const audioElement = document.querySelector(`audio[data-key="${keyCode}"]`);
    audioElement.currentTime = 0;
    audioElement.play();

    switch(keyCode){
        case 69:
        case 82:
            animateCrashOrRide();
            break;
        case 75:
        case 73:
            animateHiHatClosed();
            break;
    }

    keyElement.classList.add(playingClass);
};

/* VOLTA AO ESTADO NORMAL*/ 
const removeCrashRideTransition = a => {
    if(a.propertyName !== 'transform') return;

    a.target.style.transform = 'rotate(-7.3deg) scale(1.5)';
};

const removeHitHatTopTransition = a => {
    if(a.propertyName !== 'top') return;

    a.target.style.top= '165px';
}

const removeKeyTransition = a => {
    if(a.propertyName !== 'transform') return;

    a.target.classList.remove(playingClass);
} 


/* ENTENDER E REFAZER CÓDIGO SOZINHA */ 
const drumKeys = Array.from(document.querySelectorAll('.key'));
drumKeys.forEach(key => {
    key.addEventListener('transitionend', removeKeyTransition);
});

crashRide.addEventListener('transitionend', removeCrashRideTransition);
hiHatTop.addEventListener('transitionend', removeHitHatTopTransition);

//keydown = disparado para teclas que não produzem caractere essa é a diferença com o keypress
window.addEventListener('keydown', playSound);