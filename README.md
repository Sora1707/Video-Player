# Video Player

A Netflix-style web video player built for language learning, particularly Japanese. Support both local video files and YouTube videos with synchronizable subtitle files.

> **Note**: This program is still in development and needs more improvement.

## Features

- **Local & YouTube Support**: Play videos from your computer or stream YouTube content via video ID
- **SRT Subtitle Support**: Load and display subtitle files in SRT format synchronized with your video
- **Fullscreen Mode**: Watch in fullscreen for immersive viewing
- **Playback Controls**:
    - Play/Pause, volume control, and progress bar
    - Frame-by-frame navigation for detailed study
    - Adjustable playback speed and position
- **Keyboard Shortcuts**: Fast navigation with intuitive keyboard bindings
- **Subtitle Toggling**: Easy on/off control for subtitle display

## Getting Started

1. Open `index.html` in your web browser
2. Load a video:
    - **Local Video**: Click "Select Video File" and choose a video from your computer
    - **YouTube**: Enter a YouTube Video ID in the provided field
3. (Optional) Load subtitles by selecting an SRT subtitle file
4. Start watching and use the player controls or keyboard shortcuts

## Subtitle Transcription with Whisper

For creating SRT subtitle files from audio, you can use the Colab notebook that utilizes the Whisper model for voice-to-text transcription. It supports audio files in formats like wav, mp3, and m4a, converting them directly into SRT subtitle files.

**Colab Notebook**: [Google Drive](https://drive.google.com/drive/folders/16HHnGfS6lmPq2s16xO4xjJO59y1ZKG-r)

## Keyboard Shortcuts

| Key       | Action                          |
| --------- | ------------------------------- |
| **Space** | Play/Pause                      |
| **C**     | Toggle Subtitles                |
| **← →**   | Skip 5 seconds backward/forward |
| **, .**   | Previous/Next frame             |
| **F**     | Toggle Fullscreen               |
| **H**     | Hide Original Subtitles         |
| **Esc**   | Exit Fullscreen                 |

## Project Structure

```
├── index.html                 # Main HTML file
├── style.css                  # Styling
├── script/
│   ├── index.js              # Entry point
│   ├── util.js               # Utility functions
│   ├── subtitle.js           # Subtitle handling
│   ├── fullscreen.js         # Fullscreen management
│   └── video/
│       ├── video-player.js   # Video player logic
│       ├── controls.js       # Player controls
│       ├── file.js           # Local video file handling
│       └── youtube.js        # YouTube integration
```

## Use Case

This player was originally created as a tool for Japanese language learning, allowing students to:

- Watch Japanese videos (anime, documentaries, etc.)
- Follow along with synchronized subtitles
- Study at their own pace with frame-by-frame controls
- Improve listening comprehension through repeated viewing

## Browser Compatibility

Works on modern browsers that support HTML5 video and the YouTube IFrame API.
