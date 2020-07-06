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
            // speakQues(arr[index])
            $('#ans-audio-src').attr("src", './music/'+arr[index]+'.mp3');
            document.querySelector("#ans-audio").volume = 0.2;
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
                if (numbers
                    [i].position().left > numbers[j].position().left) {
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
const MAX_LEVEL = 2
let level = 0
let kodigif = $('.kodigif');
let right = -1;
let wrong = -1;
function handleClickOk() {
    playSound(checkAnswer())
    if (checkAnswer()) {
        if (level < MAX_LEVEL) {
            right++;
            kodigif.css("background-image", `url(assets/obj/right${right}.gif)`)
            level++
            showLevel()
            init()
        }
        else {
            window.location.href = 'index.html'
        }

    }
    else {
        if (wrong < 1) { wrong++; } else { wrong = 0; }
        kodigif.css("background-image", `url(assets/obj/wrong${wrong}.gif)`)
    }
}
function showLevel() {
    document.getElementById("level").innerHTML = "Màn chơi:" + (level + 1) + "/" + (MAX_LEVEL + 1);
}
let data= "Sắp xếp dãy số theo thứ tự tăng dần"
$('.summit-answer').on('click', handleClickOk)
$('.kodigif').on('click', speakQues(data))
init()
handleEvent()
// getPostion()
showLevel()

//music
/**
 * playsound(true||false)
 * @param {*} type 
 */
function playSound(type) {

    if (type === true) {
        $('#ans-audio-src').attr("src", './music/win.mp3');
    }
    else {
        $('#ans-audio-src').attr("src", './music/false.mp3');
    }
    document.querySelector("#ans-audio").volume = 0.9;
    document.querySelector("#ans-audio").load();
    document.querySelector("#ans-audio").play();
}

var vid = document.getElementById("audio");
vid.volume = 0.7;
let backgroundSpeaker = document.querySelector("#bg-music-speaker");
let musicPause = false;
//speak question
/**
 * speakQues(data)
 * @param {*} data is STRING
 */
function speakQues(data) {
    debugger
    let text = encodeURIComponent(data);
    let url ="https://code.responsivevoice.org/getvoice.php?text="+text+"&lang=vi&engine=g3&name=&pitch=0.5&rate=0.5&volume=1&key=WGciAW2s&gender=female"
      document.querySelector("#speaker-src").src = url;
    document.querySelector("#speaker").load();
    document.querySelector("#speaker").play();
  }
  // 
const backgroundMusic = document.querySelector("#audio");
backgroundSpeaker.addEventListener("click", function () {
    debugger
    if (!musicPause) {
        backgroundMusic.pause();
        $('#bg-music-speaker').html('<i class="fas fa-music" aria-hidden="true"></i>');
        musicPause = true;
    } else {
        $('#bg-music-speaker').html('<i class="fas fa-music" aria-hidden="true"></i>')
        backgroundMusic.play();
        musicPause = false;
    }
});
