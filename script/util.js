function toMillisecond(timestring) {
    const [h, m, s_ms] = timestring.split(":");
    const [s, ms] = s_ms.split(",");
    return parseInt(h) * 60 * 60 * 1000 + parseInt(m) * 60 * 1000 + parseInt(s) * 1000 + parseInt(ms);
}

function toTimeString(seconds) {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = Math.floor(seconds % 60);
    let timestring = `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
    if (h > 0) {
        timestring = `${h.toString().padStart(2, "0")}:${timestring}`;
    }
    return timestring;
}

function isValidUrl(string) {
    try {
        new URL(string);
        return true;
    } catch (err) {
        return false;
    }
}
