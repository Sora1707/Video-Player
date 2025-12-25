const subtitleBtn = document.getElementById("subtitleBtn");
const subtitleContainer = document.getElementById("subtitleContainer");
const subtitleText = document.getElementById("subtitleText");

const srtFileInput = document.getElementById("srtFile");

const originalSubtitleHideBar = document.getElementById("original-subtitle-hide-bar");

let subtitles = [];
let subtitlesEnabled = true;

/*
SRT FORMAT
1. idx
2. 00:00:00,000 --> 00:00:05,000
3. Subtitle
4. blank line
*/

function updateSubtitles() {
    if (!subtitlesEnabled) {
        subtitleText.textContent = "";
        return;
    }

    if (subtitles.length === 0) {
        subtitleText.textContent = "No subtitles loaded";
        return;
    }
    const milliseconds = Math.round(getCurrentTime() * 1000);

    const subtitle = subtitles.find((subtitle) => milliseconds >= subtitle.start && milliseconds <= subtitle.end);

    if (subtitle) {
        subtitleText.textContent = subtitle.text;
    } else {
        subtitleText.textContent = "";
    }
}

function parseSRT(srtContent) {
    const lines = srtContent.split("\n");
    const subtitles = [];
    let idx = 0;

    while (idx < lines.length) {
        if (idx + 4 > lines.length) break;
        const [start, end] = lines[idx + 1].split(" --> ");
        const text = lines[idx + 2].trim();

        subtitles.push({
            start: toMillisecond(start),
            end: toMillisecond(end),
            text,
        });
        idx += 4;
    }

    console.log("Loaded new subtitles");

    return subtitles;
}

// Load SRT file
srtFileInput.addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
            const srtContent = event.target.result;
            subtitles = parseSRT(srtContent);
            updateSubtitles();
        };
        reader.readAsText(file);
    }
});

// Toggle subtitles
subtitleBtn.addEventListener("click", toggleSubtitles);

function toggleSubtitles() {
    subtitlesEnabled = !subtitlesEnabled;
    updateSubtitles();

    subtitleBtn.style.opacity = subtitlesEnabled ? "1" : "0.5";
}

function toggleHideOriginalSubtitle() {
    originalSubtitleHideBar.classList.toggle("active");
}

// Keyboard controls
document.addEventListener("keydown", (e) => {
    switch (e.key) {
        case "h":
        case "H":
            toggleHideOriginalSubtitle();
            break;
    }
});
