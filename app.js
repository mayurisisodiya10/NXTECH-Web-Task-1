let currentmusic = 0;

const music = document.querySelector('#audio');

const seekBar = document.querySelector('.music-name');
const songName = document.querySelector('.music-name');
const artistName = document.querySelector('.artist-name');
const disk = document.querySelector('.disk');
const currentTime = document.querySelector('.current-time');
const musicDuration = document.querySelector('.song-duration');
const playBtn = document.querySelector('.play-btn');
const forwardBtn = document.querySelector('.forward-btn');
const backwardBtn = document.querySelector('.backward-btn');

playBtn.addEventListener('click',()=>{
    if(playBtn.className.includes('pause')){
        music.play();
    }
    else{
        music.pause();
    }
    playBtn.classList.toggle('pause');
    disk.classList.toggle('play');
})

const setMusic =(i)=>{
    seekBar.value = 0; // set range slide value to 0;
    let song = songs[i];
    currentmusic = i;
    music.src = song.path;

    songName.innerHTML = song.name;
    artistName.innerHTML = song.artist;
    disk.style.backgroundImage = `url('${song.cover}')`;

    currentTime.innerHTML = '00:00';
    setTimeout(() => {
        seekBar.max = music.duration;
        console.log(music.duration);
musicDuration.innerHTML = formatTime(music.duration);
    }, 300);
}


setMusic(0);
console.log(songs);

// formatting time in min and seconds format

const formatTime = (time) =>{
    let min = Math.floor(time /60);
    if(min < 10 ){
        min = `0${min}`;
    }
    let sec = Math.floor(time % 60);
    if(sec < 10){
        sec = `0${sec}`;
    }
    return `${min} : ${sec}`;
}
// seek bar
setInterval(() => {
    seekBar.value = music.currentTime;
    currentTime.innerHTML = formatTime(music.currentTime);
    if (Math.floor(music.currentTime)== Math.floor(seekBar.max)) {
        forwardBtn.click();
    }
}, 500);

seekBar.addEventListener('change',()=>{
    music.currentTime = seekBar.value;
})
const playMusic = ()=>{
    music.play();
    playBtn.classList.remove('pause');
    disk.classList.add('play');
}
// forward and backward button

forwardBtn.addEventListener('click',()=>{
if (currentmusic >= songs.length - 1) {
    currentmusic = 0;
}
else{
    currentmusic++;
}
setMusic(currentmusic);
playMusic();
})
backwardBtn.addEventListener('click',()=>{
    if (currentmusic <= 0) {
    currentmusic = songs.length-1;    
    }else{
        currentmusic--;
    }
    setMusic(currentmusic);
    playMusic();
})
