// the link to your model provided by Teachable Machine export panel
const URL = "https://teachablemachine.withgoogle.com/models/BKXL7FYtF/";
let model, webcam, ctx, labelContainer, maxPredictions;
const btn = document.getElementById('check');
const camera = document.getElementById('camera');
const userImg = document.getElementById('user');
const robotImg = document.getElementById('robot');
const userScore = document.getElementById('userScore');
const robotScore = document.getElementById('robotScore');
const resultText = document.getElementById('result');
const countDown = document.getElementById('countdown');
const ids = {
    0 : 'rock',
    1 : 'paper',
    2 : 'scissor',
    3 : 'none'
}
const images = {
    rock:'./images/rock.png',
    paper:'./images/paper.png',
    scissor:'./images/scissor.png'
}
const scores = {
    user:0,
    computer:0
}
async function init() {
    camera.innerText = "Loading..."
    const modelURL = URL + "model.json";
    const metadataURL = URL + "metadata.json";

    // load the model and metadata
    // Refer to tmImage.loadFromFiles() in the API to support files from a file picker
    // Note: the pose library adds a tmPose object to your window (window.tmPose)
    model = await tmPose.load(modelURL, metadataURL);
    maxPredictions = model.getTotalClasses();

    // Convenience function to setup a webcam
    const size = 200;
    const flip = true; // whether to flip the webcam
    webcam = new tmPose.Webcam(size, size, flip); // width, height, flip
    await webcam.setup(); // request access to the webcam
    await webcam.play();
    window.requestAnimationFrame(loop);

    // append/get elements to the DOM
    const canvas = document.getElementById("canvas");
    canvas.width = size; canvas.height = size;
    ctx = canvas.getContext("2d");
    labelContainer = document.getElementById("label-container");
    // Appending IDs mapping
    for (let i = 0; i < maxPredictions; i++) { // and class labels
        const div = document.createElement("div");
        labelContainer.appendChild(div);
    }
    camera.style.display = "none";
    btn.style.display = "flex";
}

async function loop(timestamp) {
    webcam.update(); // update the webcam frame
    await predict();
    window.requestAnimationFrame(loop);
}

async function predict() {
    // Prediction #1: run input through posenet
    // estimatePose can take in an image, video or canvas html element
    const { pose, posenetOutput } = await model.estimatePose(webcam.canvas);
    // Prediction 2: run input through teachable machine classification model
    const prediction = await model.predict(posenetOutput);
    for (let i = 0; i < maxPredictions; i++) {
        const classPrediction =`
        ${prediction[i].className} : <span id='${ids[i]}'>${prediction[i].probability.toFixed(2)}</span>
        `
        labelContainer.childNodes[i].innerHTML = classPrediction;
    }
    // finally draw the poses
    drawPose(pose);
}

function drawPose(pose) {
    if (webcam.canvas) {
        ctx.drawImage(webcam.canvas, 0, 0);
        // draw the keypoints and skeleton
        if (pose) {
            const minPartConfidence = 0.5;
            tmPose.drawKeypoints(pose.keypoints, minPartConfidence, ctx);
            tmPose.drawSkeleton(pose.keypoints, minPartConfidence, ctx);
        }
    }
}

function userInput(...args) {
    let max = -Infinity;
    let ind = null;
    for(let i = 0; i < 4; i++){
        if(args[i] > max){
            max = args[i];
            ind = i;
        }
    }
    const user = ids[ind]
    return user;
}

btn.addEventListener('click', ()=>{
    let cnt = 3;
    let count = setInterval(()=>{
        countDown.innerText = cnt;
        cnt--;
        if(cnt == -1){
            clearInterval(count)
            execute()
            cnt = 3
        }
    },3000)
})

function execute() {
    const rock = document.getElementById('rock');
    const paper = document.getElementById('paper');
    const scissor = document.getElementById('scissor');
    const none = document.getElementById('none');
    const user = userInput(+rock?.innerText, +paper?.innerText, +scissor?.innerText, +none?.innerText)
    const computer = ids[Math.floor(Math.random() * 3)];
    userImg.setAttribute('src', images[user]);
    robotImg.setAttribute('src', images[computer]);
    robotImg.style.backgroundColor = "#fff";
    userImg.style.backgroundColor = "#fff";
    const result = determineWinner(user, computer);

    if(result == "Computer wins!"){
        scores['computer']++;
    } else if(result == "User wins!"){
        scores['user']++;
    }
    resultText.innerText = result;
    userScore.innerText = scores['user'];
    robotScore.innerText = scores['computer'];
}

function determineWinner(user,computer) {
    if (user === computer) {
        return "It's a tie!";
    }

    if (user === 'rock') {
        if (computer === 'paper') {
            return 'Computer wins!';
        } else {
            return 'User wins!';
        }
    }

    if (user === 'paper') {
        if (computer === 'scissor') {
            return 'Computer wins!';
        } else {
            return 'User wins!';
        }
    }

    if (user === 'scissor') {
        if (computer === 'rock') {
            return 'Computer wins!';
        } else {
            return 'User wins!';
        }
    }

    if (user === 'none') {
        return 'Please make a selection.';
    }
};