const youtubeIdInput = document.getElementById("youtubeId");

let player = null;
let youtubeTimeUpdateInterval = null;

const YT_STATES = {
    "-1": "Unstarted",
    0: "Ended",
    1: "Playing",
    2: "Paused",
    3: "Buffering",
    5: "Video cued",
};

// Load YouTube IFrame API
const tag = document.createElement("script");
tag.src = "https://www.youtube.com/iframe_api";
const firstScriptTag = document.getElementsByTagName("script")[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

youtubeIdInput.addEventListener("input", (e) => {
    const id = e.target.value;
    activatePlayer("youtube", id);
});

// Called automatically when API is ready
function onYouTubeIframeAPIReady() {
    console.log("YouTube API is ready");

    player = new YT.Player("player", {
        playerVars: {
            controls: 0,
            disablekb: 1,
            fs: 0,
            modestbranding: 1,
            rel: 0,
        },
        events: {
            onReady: onPlayerReady,
            onStateChange: onPlayerStateChange,
        },
    });
}

function onPlayerReady(event) {
    console.log("Youtube Player is ready");
}

function onPlayerStateChange(event) {
    // console.log("Player state:", states[event.data]);

    // Start/stop time updates based on state
    if (event.data === YT.PlayerState.PLAYING) {
        startTimeUpdate();
    } else if (event.data === YT.PlayerState.PAUSED) {
        stopTimeUpdate();
    } else {
    }
}

function startTimeUpdate() {
    if (youtubeTimeUpdateInterval) return;

    youtubeTimeUpdateInterval = setInterval(() => {
        if (player && player.getCurrentTime) {
            onTimeUpdate();
        }
    }, 100); // Update every 100ms (similar to video timeupdate)
}

function stopTimeUpdate() {
    if (youtubeTimeUpdateInterval) {
        clearInterval(youtubeTimeUpdateInterval);
        youtubeTimeUpdateInterval = null;
    }
}

/*
player.getCurrentTime()    // Get current playback time
player.getDuration()       // Get video duration
player.playVideo()         // Play
player.pauseVideo()        // Pause
player.seekTo(seconds)     // Jump to time
player.getPlayerState()    // Get state
*/
