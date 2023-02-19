
const musicWrap = document.getElementById('wrapper');
const playingBg = document.getElementById('particles-js');
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

const bgChange = (state) => {
  if (state === "play_arrow"){
    musicWrap.style.backgroundColor = '#fff';
    if (playingBg.classList.contains('show')) {
      playingBg.classList.remove('show');
    }
    playingBg.classList.add('show');
  } else{
    musicWrap.style.backgroundColor = '#333';
    playingBg.classList.remove('show');
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
  bgChange(getTxt);
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

particlesJS("particles-js", {
  particles: {
    number: {
      value: 50,
      density: {
        enable: true,
        value_area: 800
      }
    },
    color: {
      value: ["c1121f", "f77f00", "fcbf49", "2d6a4f", "1e6091", "7b2cbf"]
    },
    shape: {
      type: ["circle"],
      stroke: {
        width: 0,
        color: "#fff"
      },
      polygon: {
        nb_sides: 5
      },
    },
    opacity: {
      value: 0.5,
      random: false,
      anim: {
        enable: false,
        speed: 1,
        opacity_min: 0.1,
        sync: false
      }
    },
    size: {
      value: 50,
      random: true,
      anim: {
        enable: false,
        speed: 10,
        size_min: 10,
        sync: false
      }
    },
    move: {
      enable: true,
      speed: 5,
      direction: "none",
      random: false,
      straight: false,
      out_mode: "out",
      bounce: false,
      attract: {
        enable: false,
        rotateX: 600,
        rotateY: 1200
      }
    }
  },
  interactivity: {
    detect_on: "canvas",
    events: {
      onhover: {
        enable: true,
        mode: "grab"
      },
      onclick: {
        enable: false,
        mode: "push"
      },
      resize: true
    },
    modes: {
      grab: {
        distance: 140,
        line_linked: {
          opacity: 1
        }
      },
      bubble: {
        distance: 400,
        size: 40,
        duration: 2,
        opacity: 8,
        speed: 3
      },
      repulse: {
        distance: 200,
        duration: 0.4
      },
      push: {
        particles_nb: 4
      },
      remove: {
        particles_nb: 2
      }
    }
  },
  retina_detect: true
});

// 이벤트 중복 해결, 리스트를 누를 때 currentTime = 0 으로 초기화 되는 작업 필요