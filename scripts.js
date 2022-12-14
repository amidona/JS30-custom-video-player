//Elements
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');
const expand = player.querySelector(".expand");

//Functions
function togglePlay () {
    if (video.paused) {
        video.play();
    } else {
        video.pause();
    }
};

function updateButton () {
    const icon = this.paused ? "►" : "❚ ❚";
    toggle.textContent = icon;
};

function skip() {
    console.log(this.dataset.skip)
    video.currentTime += parseFloat(this.dataset.skip)
};

function handleRangeUpdate() {
    video[this.name] = this.value;
    console.log(this.name);
    console.log(this.value);
};

function handleProgress() {
    const percent = (video.currentTime / video.duration) * 100;
    progressBar.style.flexBasis = `${percent}%`;
};

function scrub(e) {
    const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
    video.currentTime = scrubTime;
    console.log(e);
};

function resize () {
    if (player.classList.contains("fullscreen")) {
        player.classList.remove("fullscreen");
        expand.innerHTML = `<i class="bi bi-arrows-fullscreen"></i>`;
    } else {
        player.classList.add("fullscreen");
        expand.innerHTML = `<i class="bi bi-arrows-angle-contract"></i>`;
    }
};

//Event Listeners
video.addEventListener("click", togglePlay);
toggle.addEventListener("click", togglePlay);

video.addEventListener("play", updateButton);
video.addEventListener("pause", updateButton);

skipButtons.forEach(button => button.addEventListener("click", skip));

ranges.forEach(range => range.addEventListener("change", handleRangeUpdate));

video.addEventListener("timeupdate", handleProgress);

let mousedown = false;
progress.addEventListener("mousedown", () => mousedown = true);
progress.addEventListener("mouseup", () => mousedown = true);
progress.addEventListener("click", scrub);
progress.addEventListener("mousemove", (e) => mousedown && scrub(e)); 
//using && so if "mousedown" is true, it'll run scrub, but if it's false, nothing will happen

expand.addEventListener("click", resize);