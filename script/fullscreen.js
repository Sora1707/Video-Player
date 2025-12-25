const fullscreenBtn = document.getElementById("fullscreenBtn");

document.addEventListener("fullscreenchange", exitHandler);
document.addEventListener("webkitfullscreenchange", exitHandler);
document.addEventListener("mozfullscreenchange", exitHandler);
document.addEventListener("MSFullscreenChange", exitHandler);

function exitHandler() {
    if (
        !document.fullscreenElement &&
        !document.webkitIsFullScreen &&
        !document.mozFullScreen &&
        !document.msFullscreenElement
    ) {
        subtitleText.classList.remove("fullscreen");
    }
}

fullscreenBtn.addEventListener("click", () => {
    if (!document.fullscreenElement) {
        videoPlayer.requestFullscreen();
        subtitleText.classList.add("fullscreen");
    } else {
        document.exitFullscreen();
        subtitleText.classList.remove("fullscreen");
    }
});

// Keyboard controls
document.addEventListener("keydown", (e) => {
    switch (e.key) {
        case "f":
        case "F":
            fullscreenBtn.click();
            break;
    }
});
