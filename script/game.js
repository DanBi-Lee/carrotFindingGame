let isGaming = false;
let isGameClear = false;
let timer;
let gameData, preloadSrc;
const $wrap = document.querySelector('.wrap');
const $btnBox = document.querySelector('.btn-box');
const $startBtn = $btnBox.querySelector('.btn-start');
const $stopBtn = $btnBox.querySelector('.btn-stop');
const $timer = document.querySelector('.timer');
const $itemCounter = document.querySelector('.item-counter');
const $itemRenderBox = document.querySelector('.item-render-box');
const $popup = document.querySelector('.popup');
const $replay = $popup.querySelector('.replay');
const $message = $popup.querySelector('.game-message');

function preloadImage(items){
    const result = {}
    for (let item in items){
        result[item] = new Image();
        result[item].src = `./img/${items[item]}`;
    }
    return result;
}

function preloadAudio(items){
    const result = {}
    for (let item in items){
        result[item] = new Audio();
        result[item].src = `./sound/${items[item]}`;
    }
    return result;
}

function preload(){
    let imageList = {bug: 'bug.png', carrot:'carrot.png'};
    let audioList = {
        alet : 'alert.wav',
        bg : 'bg.mp3',
        bug_pull : 'bug_pull.mp3',
        carrot_pull : 'carrot_pull.mp3',
        game_win : 'game_win.mp3'
    };
    imageList = preloadImage(imageList);
    audioList = preloadAudio(audioList);

    return { imageList, audioList };
}

function setData(){
    const result = {
        time : 10,
        item : {
            bug : 10,
            carrot : 10
        }
    };

    return result;
}

function countDown(time){
    const result = setInterval(()=>{
        time --;
        $timer.innerText = `00:${time>=10?time:`0${time}`}`;
        if(time === 0){
            clearInterval(result);
            gameOver();
            return;
        }
    }, 1000);
    return result;
}

function renderItem(item, count, size){
    const width = $wrap.clientWidth;
    const height = ($wrap.clientHeight / 2);
    item.width = size;
    item.hieght = size;

    for(let index = 0; index < count; index++){
        const $copyImg = item.cloneNode();
        const randomX = Math.random()*(width-item.width);
        const randomY = (Math.random()*(height-item.hieght))+height;
        $copyImg.style.left = `${randomX}px`;
        $copyImg.style.top = `${randomY}px`;
        $itemRenderBox.append($copyImg);
    }
}

function popup(message){
    $popup.style.display = 'block';
    $message.innerText = message;
    $btnBox.style.display = 'none';
}

function gameClear(){
    preloadSrc.audioList.game_win.play();
    // 승리화면 띄우기
    popup('승리하셨습니다 🎈');
    stopGame();
}

function checkGameClear(carrotCount){
    console.log(carrotCount);
    const result = carrotCount <= 0? true : false;
    return result;
}

function gameOver(){
    preloadSrc.audioList.alet.play();
    // 실패화면 띄우기
    popup('패배하셨습니다 😂');
    stopGame();
}

function playingTheGame(e){
    const target = e.target;
    if(target.nodeName !== "IMG"){
        return;
    }
    const targetType = target.className;
    switch(targetType){
        case 'carrot' :
            console.log('당근뺴기');
            let carrotCount = --gameData.item.carrot;
            target.remove();
            $itemCounter.innerHTML = carrotCount;
            const cloneAudio = preloadSrc.audioList.carrot_pull.cloneNode();
            cloneAudio.play();

            isGameClear = checkGameClear(carrotCount);
            
            console.log(isGameClear);
            if(isGameClear){
                gameClear();
            }
            break;
        case 'bug' :
            preloadSrc.audioList.bug_pull.play();
            gameOver();
            break;
        default :
            throw new Error('정의되지 않은 타입');
    }
}

function startGame(data){
    isGaming = true;
    gameData = setData();
    console.log('게임시작');

    // 백그라운드 뮤직
    const backgroundMusic = data.preloadSrc.audioList.bg;
    backgroundMusic.loop = true;
    backgroundMusic.play();

    // 타이머 돌아가기
    let time = gameData.time;
    $timer.innerText = '00:10';
    timer = countDown(time);

    // 당근 갯수 화면에 뿌리기
    const carrotCount = gameData.item.carrot;
    $itemCounter.innerText = carrotCount;

    // 당근, 벌레 뿌리기
    $itemRenderBox.innerHTML = '';
    const carrot = data.preloadSrc.imageList.carrot;
    const bug =  data.preloadSrc.imageList.bug;
    carrot.classList.add('carrot');
    bug.classList.add('bug');
    renderItem(carrot, carrotCount, 50);
    renderItem(bug, gameData.item.bug, 40);

    // 당근, 벌레 클릭 이벤트 등록
    $itemRenderBox.addEventListener('click', playingTheGame);
}

function stopGame(){
    isGaming = false;
    // 백그라운드 뮤직 멈추기
    preloadSrc.audioList.bg.pause();

    // 타이머 멈추기
    clearInterval(timer);
    $timer.innerText = '00:00';

    // 당근, 벌레 지우기
    $itemRenderBox.innerHTML = '';

    // 당근, 벌레 클릭 이벤트 삭제
    $itemRenderBox.removeEventListener('click', playingTheGame);
}

function handlingGameBtn(data){
    $btnBox.addEventListener('click', e => {
        if (e.target.nodeName !== 'BUTTON'){
            return;
        }
        switch(e.target.dataset.type){
            case 'start' :
                startGame(data);
                $startBtn.style.zIndex = 0;
                $stopBtn.style.zIndex = 10;
                break;
            case 'stop' :
                stopGame();
                $startBtn.style.zIndex = 10;
                $stopBtn.style.zIndex = 0;
                break;
            default :
                throw new Error('정의되지않은 data-type입니다.');
        }
    });
    $replay.addEventListener('click', ()=>{
        startGame({preloadSrc});
        $popup.style.display = 'none';
        $btnBox.style.display = 'block';
    });
}

function setGame(){
    preloadSrc = preload();
    handlingGameBtn({preloadSrc});
}

function init(){
    setGame();
}

init();