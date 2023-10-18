const video = document.querySelector("video");
const playButton = document.querySelector(".play-pause-button");
const resetButton = document.querySelector(".reset-button");
const timer = document.querySelector(".time");
const tracker = document.querySelector("#tracker");
let videoDuration = video.duration; //returns NaN since video metadata is not loaded

video.ondurationchange = () => {
  videoDuration = video.duration; //we are assigning duration after duration is changed
}

const playPauseVideo = () => {
  if (playButton.getAttribute("active") === "play") {
    resumeVideo();
  } else {
    playButton.setAttribute("active", "play");
    playButton.firstElementChild.setAttribute("src", "./resume-button.png");
    video.play();
  }
}

const resumeVideo = () => {
  playButton.setAttribute("active", "resume");
  video.pause();
  playButton.firstElementChild.setAttribute("src", "./play-button.png");
};

playButton.addEventListener("click",playPauseVideo);
video.addEventListener("click",playPauseVideo);

resetButton.addEventListener("click", () => {
  resumeVideo();
  video.currentTime = 0;
});

video.addEventListener("timeupdate",() => {
    const currentTime = video.currentTime;
    const minutes = Math.floor(currentTime / 60);
    const seconds = Math.floor(currentTime - (minutes * 60))
    const percentage = Math.floor((video.currentTime / videoDuration) * 100); 
    if(percentage === 100){
        resumeVideo();
    }
    tracker.value = percentage;

    const second = seconds.toString().padStart(2,"0");
    const minute = minutes.toString().padStart(2,"0");

    timer.textContent = `${minute}:${second}`
})

tracker.addEventListener("change", () => {
    const trackerValue = tracker.value
    const currentTime = (trackerValue *videoDuration) / 100
    video.currentTime = currentTime;
})

