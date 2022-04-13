const player = document.querySelector('.player')
const video = document.querySelector('video');
const progressRange = document.querySelector('.progress-range');
const progressBar = document.querySelector('.progress-bar');
const playBtn = document.getElementById('play-btn');
const volumeIcon = document.getElementById('volume-icon');
const volumeRange = document.querySelector('.volume-range');
const volumeBar = document.querySelector('.volume-bar');
const currentTimeEl = document.querySelector('.time-elapsed');
const durationEl = document.querySelector('.time-duration');
const fullscreenBtn = document.querySelector('.fullscreen');
const speed = document.querySelector('.player-speed')

// play & pause
const showPlayIcon = () => {
    playBtn.classList.replace('fa-pause', 'fa-play')
}

const togglePlay = () => {
    if (video.paused) {
        video.play();
        playBtn.classList.replace('fa-play', 'fa-pause')
    } else {
        video.pause()
        playBtn.classList.replace('fa-pause', 'fa-play')
    }
}

video.addEventListener('ended', showPlayIcon)

//event
playBtn.addEventListener('click', togglePlay)
video.addEventListener('click', togglePlay)

// progress bar
function displayTime(time) {
    let currentMin = Math.floor(time / 60)
    let currentSecond = Math.floor(time % 60)
    currentSecond = currentSecond > 9 ? currentSecond : `0${currentSecond}`;
    return `${currentMin}:${currentSecond}`;
}

const updateProgressBar = () => {
    let timeBar = ((video.currentTime / video.duration) * 100)
    progressBar.style.width = `${timeBar}%`
    currentTimeEl.textContent = `${displayTime(video.currentTime)} /`
    durationEl.textContent = `${displayTime(video.duration)}`

}


//progress range
const onProgressRange = (event) => {
    let clickX = event.offsetX;
    let width = progressRange.offsetWidth;
    video.currentTime = (clickX / width) * video.duration;

}

// volume controls
let lastVolume = 1;

// volumn bar
const changeVolumn = (e) => {
    let volume = e.offsetX / volumeRange.offsetWidth;
    // rounding volume
    if (volume < 0.1) {
        volume = 0;
    }
    if (volume > 0.9) {
        volume = 1;
    }
    volumeBar.style.width = `${volume * 100}%`
    video.volume = volume;

    // change icon on volume
    volumeIcon.className = '';
    if (volume > 0.7) {
        volumeIcon.classList.add('fas', 'fa-volume-up');
    } else if (volume < 0.7 && volume > 0) {
        volumeIcon.classList.add('fas', 'fa-volume-down')
    } else if (volume === 0) {
        volumeIcon.classList.add('fas', 'fa-volume-off')
    }
}

//mute / unmute
function toggleMute() {
    volumeIcon.className = '';
    if (video.volume) {
        lastVolume = video.volume;
        video.volume = 0;
        volumeBar.style.width = 0;
        volumeIcon.classList.add('fas', 'fa-volume-mute');
    } else {
        video.volume = lastVolume;
        volumeBar.style.width = `${lastVolume * 100}%`
        volumeIcon.classList.add('fas', 'fa-volume-up');
    }
}

// change playback speed
function changeSpeed() {
    video.playbackRate = speed.value
}

// full screen
/* View in fullscreen */
function openFullscreen(elem) {
    if (elem.requestFullscreen) {
        elem.requestFullscreen();
    } else if (elem.webkitRequestFullscreen) { /* Safari */
        elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) { /* IE11 */
        elem.msRequestFullscreen();
    }
    video.className.add('video-fullscreen');
}

/* Close fullscreen */
function closeFullscreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.webkitExitFullscreen) { /* Safari */
        document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) { /* IE11 */
        document.msExitFullscreen();
    }
    video.className.remove('video-fullscreen');
}

let fullscreen = false;
// toggle
function toggleFullscreen() {
    if (!fullscreen) {
        openFullscreen(player);
    } else {
        closeFullscreen();
    }
    fullscreen = !fullscreen
}



// updateProgress bar event listen
video.addEventListener('timeupdate', updateProgressBar)
video.addEventListener('canplay', updateProgressBar);
progressRange.addEventListener('click', onProgressRange)
volumeRange.addEventListener('click', changeVolumn)
volumeIcon.addEventListener('click', toggleMute)
speed.addEventListener('change', changeSpeed)
fullscreenBtn.addEventListener('click', toggleFullscreen);