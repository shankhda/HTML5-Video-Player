window.addEventListener('load', function(){

    video = document.getElementById('video');
    playButton = document.getElementById('pause-play');
    progressBar = document.getElementById('progress-bar');
    progressBarContianer = document.getElementById('progress-bar-container');
    timeStamp = document.getElementById('time-stamp');
    soundButton = document.getElementById('sound');
    soundBarContainer = document.getElementById('sound-bar-container');
    soundBar = document.getElementById('sound-bar');
    fullscreenButton = document.getElementById('fullscreen');
    pauseScreenButton = document.getElementById('pause-screen-btn');
    pauseScreen = document.getElementById('pause-screen');

    video.load();
    video.addEventListener('canplay', function(){
      
        playButton.addEventListener('click', playOrPause, false);
        progressBarContianer.addEventListener('click', seek, false);
        
        soundButton.addEventListener('click', muteOrUnmute, false);
        soundBarContainer.addEventListener('click', updateVolume, false);
       
        fullscreenButton.addEventListener('click', fullscreen, false);
       
        pauseScreenButton.addEventListener('click', playOrPause, false);
        
    }, false);    

},false);

function playOrPause (){
   
    if (video.paused) {
        video.play();
        playButton.className = 'fa fa-pause-circle-o fa-2x';
        update = setInterval(updateProgressBar, 30);
        pauseScreen.style.display= 'none';
    }
    else
    {
        video.pause();
        playButton.className = 'fa fa-play-circle-o fa-2x';
        window.clearInterval(update);
        pauseScreen.style.display= 'block';
        pauseScreenButton.className = 'fa fa-play-circle-o fa-4x';

    }
}

function updateProgressBar(){
    var updatePercentage = (video.currentTime/video.duration)*100;
    progressBar.style.width = updatePercentage + '%';
    timeStamp.innerHTML = getTimeValue();
    if (video.ended) {
        window.clearInterval(update);
        playButton.className = 'fa fa-repeat fa-2x';
        pauseScreen.style.display= 'block';
        pauseScreenButton.className = 'fa fa-repeat fa-4x';
    }
    else if (video.paused){
        playButton.className = 'fa fa-play-circle-o fa-2x';
        pauseScreen.style.display= 'block';
        pauseScreenButton.className = 'fa fa-play-circle-o fa-4x';
    }
}

function seek(ev) {
        var mousePos = ev.pageX - progressBarContianer.offsetLeft;
        var progressWidth = window.getComputedStyle(progressBarContianer).getPropertyValue('width');
        progressWidth = parseFloat(progressWidth.substr(0, progressWidth.length - 2));
        
        video.currentTime = (mousePos/progressWidth)* video.duration;
        updateProgressBar();
    }

function getTimeValue(){

    var currSeconds = Math.round(video.currentTime);
    var currMinutes = Math.floor(currSeconds/60);
    if (currMinutes > 0) currSeconds -= currMinutes * 60;
    if (currSeconds.toString().length === 1) currSeconds = '0' + currSeconds;

    var totalSeconds = Math.round(video.duration);
    var totalMinutes = Math.floor(totalSeconds/60);
    if (totalMinutes > 0) totalSeconds -= totalMinutes * 60;
    if (totalSeconds.toString().length === 1) totalSeconds = '0' + totalSeconds;

    return currMinutes + ':' + currSeconds + ' / ' + totalMinutes + ':' + totalSeconds;

}

function muteOrUnmute (){
    if(!video.muted){
        video.muted = true;
        soundButton.className = 'fa fa-volume-off fa-2x';  
        soundBar.style.display = 'none';
    }
    else{
        video.muted = false;
        soundButton.className = 'fa fa-volume-up fa-2x';
        soundBar.style.display = 'block';
    }
}

function updateVolume (ev){
    var mousePos = ev.pageX - soundBarContainer.offsetLeft;
    var soundWidth = window.getComputedStyle(soundBarContainer).getPropertyValue('width');
    soundWidth = parseFloat(soundWidth.substr(0, soundWidth.length - 2));
    
    video.volume = mousePos/soundWidth;
    soundBar.style.width = (mousePos/soundWidth)*100 + '%';
    video.muted = false;
    soundButton.className = 'fa fa-volume-up fa-2x';
    soundBar.style.display = 'block';

}

function fullscreen (){
    if (video.requestFullscreen){
            video.requestFullscreen();
    }
    else if (video.webkitRequestFullscreen){
        video.webkitRequestFullscreen();
    }
    else if (video.mozRequestFullscreen){
        video.mozRequestFullscreen();
    }
    else if (video.msRequestFullscreen){
        video.msRequestFullscreen();
    }

}