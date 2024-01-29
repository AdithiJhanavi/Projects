


let storedAudio = localStorage.getItem('backgroundSoundData');
const backgroundSound = new Audio('./audio.mp3');

if (storedAudio) {
  const audioData = JSON.parse(storedAudio);
  backgroundSound.currentTime = audioData.currentTime;
  if (audioData.isPlaying) {
    backgroundSound.play();
  }
}


backgroundSound.loop = true;

backgroundSound.play();


function storeState() {
  const audioData = {
    currentTime: backgroundSound.currentTime,
    isPlaying: !backgroundSound.paused,
  };
  localStorage.setItem('backgroundSoundData', JSON.stringify(audioData));
}


backgroundSound.addEventListener('play', storeState);
backgroundSound.addEventListener('pause', storeState);
backgroundSound.addEventListener('timeupdate', storeState);

window.addEventListener('beforeunload', storeState);
