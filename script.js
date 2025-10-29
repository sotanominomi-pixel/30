const displayText = document.getElementById("displayText");

// Clock
function updateClock() {
    if (currentMode !== "clock") return;
    const now = new Date();
    displayText.textContent =
        now.toLocaleTimeString("ja-JP", { hour12: false });
}
setInterval(updateClock, 500);

// Stopwatch
let swTime = 0, swInterval;
function updateStopwatch() {
    swTime++;
    const sec = swTime % 60;
    const min = Math.floor(swTime / 60);
    displayText.textContent =
        `${String(min).padStart(2, '0')}:${String(sec).padStart(2, '0')}`;
}

// Alarm
let alarmSet = false;
let alarmTimeValue = "";

// Mode control
let currentMode = "clock";
function changeMode(mode) {
    currentMode = mode;

    // ボタン UI
    document.querySelectorAll(".mode-btn")
        .forEach(btn => btn.classList.remove("active"));
    document.getElementById(mode + "Mode").classList.add("active");

    // 表示
    document.getElementById("stopwatchControls").classList.add("hidden");
    document.getElementById("alarmControls").classList.add("hidden");

    if (mode === "clock") updateClock();
    if (mode === "stopwatch") {
        document.getElementById("stopwatchControls").classList.remove("hidden");
        displayText.textContent = "00:00";
    }
    if (mode === "alarm") {
        document.getElementById("alarmControls").classList.remove("hidden");
    }
}

// Stopwatch buttons
document.getElementById("startBtn").onclick = () => {
    clearInterval(swInterval);
    swInterval = setInterval(updateStopwatch, 1000);
};
document.getElementById("stopBtn").onclick = () => clearInterval(swInterval);
document.getElementById("resetBtn").onclick = () => {
    swTime = 0;
    displayText.textContent = "00:00";
};

// Alarm Set
document.getElementById("setAlarmBtn").onclick = () => {
    alarmTimeValue = document.getElementById("alarmTime").value;
    alarmSet = true;
    document.getElementById("alarmStatus").textContent =
        "Alarm Set: " + alarmTimeValue;
};

// Alarm check
setInterval(() => {
    if (!alarmSet) return;
    const now = new Date();
    const timeNow = now.toTimeString().slice(0,5);
    if (timeNow === alarmTimeValue) {
        alert("⏰ Alarm!");
        alarmSet = false;
        document.getElementById("alarmStatus").textContent = "";
    }
}, 1000);

// Mode Buttons
document.getElementById("clockMode").onclick = () => changeMode("clock");
document.getElementById("stopwatchMode").onclick = () => changeMode("stopwatch");
document.getElementById("alarmMode").onclick = () => changeMode("alarm");

// 初期表示
updateClock();
