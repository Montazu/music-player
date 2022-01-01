"use strict";
const music = document.querySelector(".music-player__music");
const progressBar = document.querySelector(".music-player__progress-bar");
const button = document.querySelectorAll(".music-player__button");
const displaysTime = document.querySelectorAll(".music-player__time");
const icon = document.querySelectorAll(".music-player__button > svg");
const playIcon = `<path d="M8 6.82v10.36c0 .79.87 1.27 1.54.84l8.14-5.18c.62-.39.62-1.29 0-1.69L9.54 5.98C8.87 5.55 8 6.03 8 6.82z"></path>`;
const pauseIcon = `<path d="M8 19c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2s-2 .9-2 2v10c0 1.1.9 2 2 2zm6-12v10c0 1.1.9 2 2 2s2-.9 2-2V7c0-1.1-.9-2-2-2s-2 .9-2 2z"></path>`;
const setTime = (time, id) => {
    const s = Math.round(time % 60);
    const m = Math.floor((time / 60) % 60);
    const handleTime = (unit, id) => {
        switch (id) {
            case 0:
                return unit != 0 ? (unit >= 10 ? `${unit}:` : `0${unit}:`) : "";
                break;
            case 1:
                return unit != 0 ? (unit >= 10 ? unit : `0${unit}`) : 0;
                break;
            default: return unit >= 10 ? `:${unit}` : `:0${unit}`;
        }
    };
    displaysTime[id].textContent = `${handleTime(m, 1)}${handleTime(s)}`;
};
progressBar.addEventListener("input", (e) => {
    setTime((music.duration * e.target.value) / 100, 0);
    music.currentTime = (music.duration * e.target.value) / 100;
    progressBar.style.setProperty("--progress", `${e.target.value}%`);
});
button[1].addEventListener("click", () => music.paused
    ? (music.play(), icon[1].innerHTML = pauseIcon, setTime(music.duration, 1))
    : (music.pause(), icon[1].innerHTML = playIcon));
music.addEventListener('loadedmetadata', () => setTime(music.duration, 1));
music.addEventListener('timeupdate', () => {
    setTime(music.currentTime, 0);
    progressBar.value = (music.currentTime * 100) / music.duration;
    progressBar.style.setProperty("--progress", `${progressBar.value}%`);
});