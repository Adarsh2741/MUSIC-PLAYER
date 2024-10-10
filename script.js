"use strict";
const imgEl = document.getElementById("bg_img");
const imgCoverEl = document.getElementById("cover");
const musicTitleEl = document.getElementById("music_title");
const musicArtistEl = document.getElementById("musric_artist");
const playerProgressEl = document.getElementById("player_progress");
const progressEl = document.getElementById("progress");
const currentTimeEl = document.getElementById("current_time");
const durationEl = document.getElementById("duration");
const prevBtnEl = document.getElementById("prev");
const playvBtnEl = document.getElementById("play");
const nextvBtnEl = document.getElementById("next");
const songs = [

  {
    path: "Nadaaniyan.mp3",
    displayName: "Nadaaniyan",
    cover: "https://www.pagalworld.com.sb/siteuploads/thumb/sft144/71532_4.jpg",
    artist: "Akshath",
  },
  {
    path: "Dil.mp3",
    displayName: "Dil ti Jaan tu",
    cover: "https://www.pagalworld.com.sb/siteuploads/thumb/sft144/71941_4.jpg",
    artist: "Gurnazar",
  },
  {
    path: "Doctory_320(PagalWorld.com.sb).mp3",
    displayName: "Doctory",
    cover: "https://www.pagalworld.com.sb/siteuploads/thumb/sft145/72354_4.jpg",
    artist: "Mankrit Aulakh",
  },
  {
    path: "Muskil.mp3",
    displayName: "Muskil Hai",
    cover: "https://www.pagalworld.com.sb/siteuploads/thumb/sft145/72344_4.jpg",
    artist: "Vishal Mishra",
  },
  {
    path: "Roots_320(PagalWorld.com.sb).mp3",
    displayName: "Roots",
    cover: "https://www.pagalworld.com.sb/siteuploads/thumb/sft14/6505_4.jpg",
    artist: "Bintu Pabra",
  },

];
const music = new Audio();
let musicIndex = 0;
let isPlaying = false;
//================== Play Song  True or False======================
function togglePlay() {
  if (isPlaying) {
    pauseMusic();
  } else {
    playMusic();
  }
}
//================== Play Music====================
function playMusic() {
  isPlaying = true;
  playvBtnEl.classList.replace("fa-play", "fa-pause");
  playvBtnEl.setAttribute("title", "pause");
  music.play();
}
//================== Pause Music====================
function pauseMusic() {
  isPlaying = false;
  playvBtnEl.classList.replace("fa-pause", "fa-play");
  playvBtnEl.setAttribute("pause", "title");
  music.pause();
}
//================== Load Songs ====================
function loadMusic(songs) {
  music.src = songs.path;
  musicTitleEl.textContent = songs.displayName;
  musicArtistEl.textContent = songs.artist;
  imgCoverEl.src = songs.cover;
  imgEl.src = songs.cover;
}
//================== Change Music ====================
function changeMusic(direction) {
  musicIndex = musicIndex + direction + (songs.length % songs.length);
  loadMusic(songs[musicIndex]);
  playMusic();
}
//================== Set Progress ====================
function setProgressBar(e) {
  const width = playerProgressEl.clientWidth;
  const xValue = e.offsetX;
  music.currentTime = (xValue / width) * music.duration;
}
//================== Set Progress ====================
function updateProgressBar() {
  const { duration, currentTime } = music;
  const ProgressPercent = (currentTime / duration) * 100;
  progressEl.style.width = `${ProgressPercent}%`;
  const formattime = (timeRanges) =>
    String(Math.floor(timeRanges)).padStart(2, "0");
  durationEl.textContent = `${formattime(duration / 60)} : ${formattime(
    duration % 60,
  )}`;
  currentTimeEl.textContent = `${formattime(currentTime / 60)} : ${formattime(
    currentTime % 60,
  )}`;
}
//================= Btn Events========================
const btnEvents = () => {
  playvBtnEl.addEventListener("click", togglePlay);
  nextvBtnEl.addEventListener("click", () => changeMusic(1));
  prevBtnEl.addEventListener("click", () => changeMusic(-1));
  //========= Progressbar===========================
  music.addEventListener("ended", () => changeMusic(1));
  music.addEventListener("timeupdate", updateProgressBar);
  playerProgressEl.addEventListener("click", setProgressBar);
};
//================= Btn Events========================
document.addEventListener("DOMContentLoaded", btnEvents);
//============ Calling Load Music
loadMusic(songs[musicIndex]);