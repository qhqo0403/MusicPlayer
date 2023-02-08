
const musicWrap = document.getElementById('wrapper');
const musicAudio = musicWrap.querySelector('#main-audio');

const playBtn = musicWrap.querySelector('#play-btn');
const pauseBtn = musicWrap.querySelector('#pause-btn');
const prevBtn = musicWrap.querySelector('#prev-btn');
const nextBtn = musicWrap.querySelector('#next-btn');
const listBtn = musicWrap.querySelector('#list-btn');
const repeatBtn = musicWrap.querySelector('#repeat-btn');
const listupBtn = musicWrap.querySelector('#listup-btn');

const albumImg = musicWrap.querySelector(".album-img>img");
const title = musicWrap.querySelector('.title');
const artist = musicWrap.querySelector('.artist');

const progressive = musicWrap.querySelector('.progressive');
const progressBar = progressive.querySelector('.bar');
const playTime = progressive.querySelector('.current');
const totalTime = progressive.querySelector('.duration');

const playList = musicWrap.querySelector('.music-list');
const lists = playList.querySelector('.lists');

let list_index = 0;

const checkMusicList = (track) => {
  const allList = lists.querySelectorAll('li');

  for (let j = 0; j < musicList.length; j++){
    allList[j].classList.remove('playing');
    if (track === j) {
      allList[j].classList.add('playing');
    }
  }
}

const musicPlay = () => {
  playBtn.innerText = "pause";
  musicAudio.play();
  checkMusicList(list_index);
  playListMusic();
  //console.log(list_index);
}
const musicPause = () => {
  playBtn.innerText = "play_arrow";
  musicAudio.pause();
}
playBtn.addEventListener('click', () => {
  let getTxt = playBtn.innerText;
  (getTxt === "pause") ? musicPause() : musicPlay();
});

const loadMusic = (num) => {
  albumImg.src = `assets/images/${musicList[num].img}.jpg`;
  musicAudio.src = `assets/songs/${musicList[num].audio}.mp3`;
  title.innerText = musicList[num].name;
  artist.innerText = musicList[num].artist;
}
window.addEventListener('load', loadMusic(list_index));

const prevMusic = () => {
  list_index--;
  if (list_index < 0) {list_index = musicList.length-1;}
  loadMusic(list_index);
  checkMusicList(list_index);
  musicPlay();
}
const nextMusic = () => {
  list_index++;
  if (list_index >= musicList.length) {list_index = 0;}
  loadMusic(list_index);
  checkMusicList(list_index);
  musicPlay();
}
prevBtn.addEventListener('click', prevMusic);
nextBtn.addEventListener('click', nextMusic);

musicAudio.addEventListener('timeupdate', (e) => {
  const duration = e.target.duration;
  let current = e.target.currentTime;
  let progressRatio = (current/duration)*100;
  let currentMin = Math.floor(current/60);
  let currentSec = Math.floor(current%60);
  progressBar.style.width = `${progressRatio}%`;
  if (currentSec < 10) {currentSec = `0${currentSec}`;}
  playTime.innerText = `${currentMin}:${currentSec}`;

  musicAudio.addEventListener('loadeddata', () => {
    let totalDuration = musicAudio.duration;
    let totalMin = Math.floor(totalDuration/60);
    let totalSec = Math.floor(totalDuration%60);
    if (totalSec < 10) {totalSec = `0${totalSec}`;}
    totalTime.innerText = `${totalMin}:${totalSec}`;
  });
});
progressive.addEventListener('click', (e) => {
  let maxWidth = progressive.clientWidth;
  let clickedX = e.offsetX;
  let totalDuration = musicAudio.duration;
  musicAudio.currentTime = (clickedX/maxWidth)*totalDuration;
  musicPlay();
});


repeatBtn.addEventListener('click', () => {
  let getTxt = repeatBtn.innerText;

  if (getTxt === "repeat") {
    repeatBtn.innerText = "repeat_one";
  } else if ( getTxt === "repeat_one") {
    repeatBtn.innerText = "shuffle";
  } else if ( getTxt === "shuffle") {
    repeatBtn.innerText = "repeat";
  }
});

musicAudio.addEventListener('ended', () => {
  let getTxt = repeatBtn.innerText;

  if (getTxt === "repeat") {
    nextMusic();
  } else if (getTxt === "repeat_one") {
    musicPlay();
  } else if (getTxt === "shuffle") {
    let randomValue = Math.floor(Math.random()*musicList.length);
    let currentValue = randomValue;
    while (getTxt === "shuffle") {
      list_index = randomValue;
      loadMusic(list_index);
      musicPlay();
      break;
    }
  }
});

listBtn.addEventListener('click', () => {
  playList.classList.add('show');
});
listupBtn.addEventListener('click', () => {
  playList.classList.remove('show');
});

for (let i = 0; i <= musicList.length-1; i++){
  const list = document.createElement('li');
  list.className = 'list';
  list.innerHTML = `
    <img src="assets/images/${musicList[i].img}.jpg" alt="${musicList[i].name}">
    <div class="music-info">
      <strong>${musicList[i].name}</strong>
      <p>${musicList[i].artist}</p>
    </div>
  `;
  lists.appendChild(list);
}

const playListMusic = () => {
  const allList = lists.querySelectorAll('li');
  for (let n = 0; n < allList.length; n++){
    allList[n].addEventListener('click', () => {
      musicAudio.currentTime = 0;
      loadMusic(n);
      musicPlay();
      for (let song of allList){
        song.classList.remove('playing');
      }
      allList[n].classList.add('playing');
      if (playList.classList.contains('show')){
        playList.classList.remove('show');
      }
    });
  }
} 

window.addEventListener("load", ()=>{
  loadMusic(list_index);
  playListMusic();   
});


const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
canvas.width = 1200;
canvas.height = 600;

let y = canvas.height;

let rectX = 0;
let valueY = 185;
let startX = -3600;

let endX = 1200;

const painting = () => {
  let gradient = ctx.createLinearGradient(startX, 0, endX, 0);
  gradient.addColorStop(0, 'red');
  gradient.addColorStop(0.10, 'yellow');
  gradient.addColorStop(0.20, 'green');
  gradient.addColorStop(0.30, 'blue');
  gradient.addColorStop(0.40, 'purple');
  gradient.addColorStop(0.5, 'red');
  gradient.addColorStop(0.60, 'yellow');
  gradient.addColorStop(0.70, 'green');
  gradient.addColorStop(0.80, 'blue');
  gradient.addColorStop(0.90, 'purple');
  gradient.addColorStop(1, 'red');
  ctx.fillStyle = gradient;
}

const animateColor = () => {
  startX += 5;
  endX += 5;
  if ( endX === 3600){
    startX = -3600;
    endX = 1200;
  }
  painting();
  window.requestAnimationFrame(animateColor);
  console.log(startX, endX);
}
/* animateColor(); */

let pY=45;
const rect = (y) => {     
  for(let i=0; i<170; i++){
    let vy = -( Math.floor(Math.random()*y)+200 )+300;
    ctx.fillRect(i*7, vy, 5, 15);
  }
}
/* rect(0); */
const moving = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height );
  rect(pY);    
}
/* setInterval(moving, 150); */

const musicEffect = () => {
  animateColor();
  rect(0);
  setInterval(moving, 150);
}

// 이벤트 중복 해결, 리스트를 누를 때 currentTime = 0 으로 초기화 되는 작업 필요