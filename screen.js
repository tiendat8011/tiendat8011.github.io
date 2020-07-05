let arr = [];
let numbers = []
let number1 = $('.number.first');
let number2 = $('.number.second');
let number3 = $('.number.third');
let number4 = $('.number.fort');
let number5  = $('.number.fifth');
numbers.push(number1)
numbers.push(number2)
numbers.push(number3)
numbers.push(number4)
numbers.push(number5)

function radomArray() {
    arr = []
    while(arr.length < 8){
        let r = Math.floor(Math.random() * 9) + 1;
        if(arr.indexOf(r) === -1) arr.push(r);
    }
}
function init() {
    // init new array
    radomArray()
    // css cho number (link image)
    for(let i=0; i<5; i++) {
        let tempPath = 'assets/number/'+arr[i]+'.png'
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
    for(let i=0; i< 5; i++){
        for(let j=0; j< 5; j++){
            if(!(i===j) && arr[i]<arr[j]) {
                debugger    
                if(numbers[i].position().left > numbers[j].position().left){
                    return false
                }
            }
        }
    }
    return true
}
function getPostion() {
    let i = 0
    numbers.forEach(number=>{
        i++
        let x = number.position();
        console.log("Top: " + x.top + " Left: " + x.left + "---" + i);
    })
}
const MAX_LEVEL = 2
let level = 0
let kodigif = $('.kodigif');
let right=-1;
let wrong=-1;
function handleClickOk(){
    if(checkAnswer()){
        if(level < MAX_LEVEL){
            right++;
            kodigif.css("background-image", `url(assets/obj/right${right}.gif)`)
            level++
            radomArray()
            showLevel()
            init()
        }
        else {
            window.location.href = 'index.html  '
        }
   
    }
    else{
        if(wrong<1) { wrong++; } else{ wrong=0; }
        kodigif.css("background-image", `url(assets/obj/wrong${wrong}.gif)`)
    }
}
function showLevel(){
    document.getElementById("level").innerHTML = "Màn chơi:"+ (level +1) + "/" + (MAX_LEVEL+1);  
}
$('.summit-answer').on('click', handleClickOk)
init()
handleEvent()
getPostion()
showLevel()
