let arr = [];
let numbers = []
let number1 = $('.number.first');
let number2 = $('.number.second');
let number3 = $('.number.third');
let number4 = $('.number.fort');
let number5 = $('.number.fifth');
numbers.push(number1)
numbers.push(number2)
numbers.push(number3)
numbers.push(number4)
numbers.push(number5)
//
function SpeakNumber() {
    numbers.forEach((number, index)=>{
        number.on('click', ()=>{
            $('#ans-audio-src').attr("src", './music/'+arr[index]+'.mp3');
            document.querySelector("#ans-audio").volume = 0.5;
            document.querySelector("#ans-audio").load();
            document.querySelector("#ans-audio").play();
        })
    })
}
SpeakNumber()
function radomArray() {
    arr = []
    while (arr.length < 8) {
        let r = Math.floor(Math.random() * 9) + 1;
        if (arr.indexOf(r) === -1) arr.push(r);
    }
}
function init() {
    // init new array
    radomArray()
    // css cho number (link image)
    for (let i = 0; i < 5; i++) {
        let tempPath = 'assets/number/' + arr[i] + '.png'
        numbers[i].css("background-image", "url(" + tempPath + ")")
    }
}
// move number and switch the position
function handleEvent() {
    $('.box-number').sortable({
        axis: "x",
        scroll: false
    });
}
function draw() {

}

// check status of the number
function checkAnswer() {
    for (let i = 0; i < 5; i++) {
        for (let j = 0; j < 5; j++) {
            if (!(i === j) && arr[i] < arr[j]) {
                if (numbers[i].position().left > numbers[j].position().left) {
                    return false
                }
            }
        }
    }
    return true
}
 function getPostion() {
     let i = 0
     numbers.forEach(number => {
         i++
         let x = number.position();
         console.log("Top: " + x.top + " Left: " + x.left + "---" + i);
     })
 }
const MAX_LEVEL = 3
let level = 0
let kodi= document.querySelector(".kodigif");
function handleClickOk() {
    playSound(checkAnswer())
    if (checkAnswer()) {
        if (level < MAX_LEVEL) {
            document.getElementById("kodi").setAttribute("src", "assets/obj/right"+level+".gif");
            level++
            setTimeout(function(){
                showLevel()
                init()
            },3000);
        }
        else {
            window.location.href = 'endGame.html'
        }

    }
    else {
        document.getElementById("kodi").setAttribute("src", "assets/obj/wrong0.gif");
    }
}
function showLevel() {
    document.getElementById("level").innerHTML = "Màn chơi:" + (level + 1) + "/" + (MAX_LEVEL + 1);
}
let topic= "Sắp xếp dãy số theo thứ tự tăng dần";
$('.summit-answer').on('click', handleClickOk)
 kodi.addEventListener("click", function(){
    document.getElementById("kodi").setAttribute("src", "assets/obj/start0.gif");
    setTimeout(function(){
        speakQues(topic);
    },500);

 });
 
init()
handleEvent()
showLevel()
setTimeout(function(){
    speakQues(topic)
},1000);
// speakQues(topic)

//music
/**
 * playsound(true||false)
 * @param {*} type 
 */
// play sound when right or wrong

function playSound(type) {

    if (type === true) {
        $('#ans-audio-src').attr("src", './music/win.mp3');
    }
    else {
        $('#ans-audio-src').attr("src", './music/false.mp3');
    }
    document.querySelector("#ans-audio").volume = 0.3;
    document.querySelector("#ans-audio").load();
    document.querySelector("#ans-audio").play();
}

var vid = document.getElementById("audio");
vid.volume = 0.7;
let backgroundSpeaker = document.querySelector("#bg-music-speaker");
backgroundSpeaker2= $('#bg-music-speaker');
let musicPause = false;

//speak question
/**
 * 
 * @param {*} data is STRING
 */
function speakQues(data) {
    let text = encodeURIComponent(data);
    let url ="https://code.responsivevoice.org/getvoice.php?text="+text+"&lang=vi&engine=g3&name=&pitch=0.5&rate=0.5&volume=1&key=WGciAW2s&gender=female";
    document.querySelector("#speaker-src").src = url;
    document.querySelector("#speaker").load();
    document.querySelector("#speaker").play();
}
// play music while playing
const backgroundMusic = document.querySelector("#audio");

backgroundSpeaker.addEventListener("click", function () {
    if (!musicPause) {
        backgroundMusic.pause();
        document.getElementById("music-icon").setAttribute("src", "assets/button/music-off.png");
        musicPause = true;
    } else {
        backgroundMusic.play();
        document.getElementById("music-icon").setAttribute("src", "assets/button/music-on.png");
        musicPause = false;
    }
});
