const videoPlayer = document.getElementById("videoPlayer");

function getCurrentPlayer() {
    return video.classList.contains("active") ? "video" : "youtube";
}

function getCurrentTime() {
    const current_player = getCurrentPlayer();
    return current_player === "video" ? video.currentTime : player.getCurrentTime();
}

function getDuration() {
    const current_player = getCurrentPlayer();
    return current_player === "video" ? video.duration : player.getDuration();
}

function getVolume() {
    const current_player = getCurrentPlayer();
    return current_player === "video" ? video.volume : player.getVolume();
}

function isPlaying() {
    const current_player = getCurrentPlayer();
    return current_player === "video" ? !video.paused : player.getPlayerState() === 1;
}

function isPaused() {
    return !isPlaying();
}

function isEnded() {
    const current_player = getCurrentPlayer();
    return current_player === "video" ? video.ended : player.getPlayerState() === 0;
}

/* UPDATE */

function updateTimeDisplay() {
    const current_time = getCurrentTime();
    const duration_time = getDuration();
    const current_time_string = isNaN(current_time) ? "00:00" : toTimeString(current_time);
    const duration_time_string = isNaN(duration_time) ? "00:00" : toTimeString(duration_time);
    timeDisplay.textContent = `${current_time_string} / ${duration_time_string}`;
}

function updateProgressBar() {
    const percent = (getCurrentTime() / getDuration()) * 100;
    progress.style.width = percent + "%";
}

function updateVolume(volume) {
    const current_player = getCurrentPlayer();
    if (current_player === "video") video.volume = volume;
    else player.setVolume(volume * 100);

    if (volume === 0) {
        volumeBtn.textContent = "🔇";
    } else if (volume < 0.5) {
        volumeBtn.textContent = "🔉";
    } else {
        volumeBtn.textContent = "🔊";
    }
}

/* ACTION */

function playVideo() {
    const current_player = getCurrentPlayer();
    if (current_player === "video") video.play();
    else player.playVideo();
    playBtn.textContent = "⏸";
}

function pauseVideo() {
    const current_player = getCurrentPlayer();
    if (current_player === "video") video.pause();
    else player.pauseVideo();
    playBtn.textContent = "▶";
}

function addTimeToVideo(seconds) {
    const duration = getDuration();
    let targetTime = getCurrentTime() + seconds;
    if (targetTime > duration) targetTime = duration;
    else if (targetTime < 0) targetTime = 0;

    const current_player = getCurrentPlayer();
    if (current_player === "video") video.currentTime = targetTime;
    else player.seekTo(targetTime);

    updateProgressBar();
    updateTimeDisplay();
}

/* EVENT */

function onInitalize() {
    updateProgressBar();
    updateTimeDisplay();
    updateSubtitles();
}

function onTimeUpdate() {
    updateProgressBar();
    updateTimeDisplay();
    updateSubtitles();

    if (isEnded()) pauseVideo();
}

function activatePlayer(playerType, url) {
    videoPlayer.classList.add("active");
    pauseVideo();

    if (playerType === "video") {
        // Activate video
        video.src = url;
        video.classList.add("active");

        // Deactivate youtube
        document.querySelector("#player").classList.remove("active");
        youtubeIdInput.value = "";
    } else {
        const id = url;
        // Activate youtube
        player.loadVideoById(id);
        player.pauseVideo(); // Prevent autoplay
        document.querySelector("#player").classList.add("active");

        // Deactivate video
        video.classList.remove("active");
        videoFileInput.value = "";
    }
}

/* CONTROLS EVENT HANDLER */
// Hover
progressBar.addEventListener("mousemove", (e) => {
    const rect = progressBar.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percent = x / rect.width;

    const time = percent * getDuration();

    hoverTime.textContent = toTimeString(time);
    hoverTime.style.left = `${x}px`;
    hoverTime.style.display = "block";
});

progressBar.addEventListener("mouseleave", () => {
    hoverTime.style.display = "none";
});

/* VIDEO EVENT HANDLER */

playBtn.addEventListener("click", () => {
    if (isPaused()) playVideo();
    else if (isPlaying()) pauseVideo();
    else {
        console.error("[VIDEO] Error status");
    }
});

// Seek video
progressBar.addEventListener("click", (e) => {
    const rect = progressBar.getBoundingClientRect();
    const percent = (e.clientX - rect.left) / rect.width;

    const currentTime = percent * getDuration();

    const current_player = getCurrentPlayer();
    if (current_player === "video") video.currentTime = currentTime;
    else player.seekTo(currentTime);
});

// Volume
volumeSlider.addEventListener("input", (e) => {
    const volume = e.target.value / 100;
    updateVolume(volume);
});

volumeBtn.addEventListener("click", () => {
    if (video.volume > 0) {
        video.volume = 0;
        volumeSlider.value = 0;
    } else {
        video.volume = 1;
        volumeSlider.value = 100;
    }
    updateVolume();
});

// Screen click
videoPlayer.addEventListener("click", () => {
    playBtn.click();
});

controls.addEventListener("click", (e) => {
    e.stopPropagation();
});

/* KEYBOARD CONTROL */
document.addEventListener("keydown", (e) => {
    switch (e.key) {
        case " ":
            e.preventDefault();
            playBtn.click();
            break;

        case "c":
        case "C":
            toggleSubtitles();
            break;

        case "ArrowLeft":
            e.preventDefault();
            addTimeToVideo(-5);
            break;

        case "ArrowRight":
            e.preventDefault();
            addTimeToVideo(5);
            break;

        case ",":
            e.preventDefault();
            addTimeToVideo(-1 / 30);
            break;

        case ".":
            e.preventDefault();
            addTimeToVideo(1 / 30);
            break;
    }
});
