// Screen
const video = document.getElementById("video");

// Input
const videoFileInput = document.getElementById("videoFile");
const videoErrorText = document.getElementById("videoError");

function canPlayURLFile(url) {
    return new Promise((resolve, reject) => {
        const testVideo = document.createElement("video");

        testVideo.preload = "metadata";
        testVideo.src = url;

        testVideo.onloadedmetadata = () => {
            resolve(true);
        };

        testVideo.onerror = () => {
            reject(false);
        };
    });
}

// Load video file
videoFileInput.addEventListener("change", (e) => {
    const file = e.target.files[0];

    if (!file) return;

    const url = URL.createObjectURL(file);

    canPlayURLFile(url)
        .then((canPlay) => {
            if (canPlay) {
                activatePlayer("video", url);
            } else {
                alert("File is corrupted.");
            }
        })
        .catch((error) => {
            console.error(error);
            alert("File is corrupted.");
        });
});

video.addEventListener("loadedmetadata", onInitalize);

// Update progress bar
video.addEventListener("timeupdate", onTimeUpdate);
