let isGaming = false;
let timer;
const $wrap = document.querySelector('.wrap');
const $timer = document.querySelector('.timer');
const $itemCounter = document.querySelector('.item-counter');
const $itemRenderBox = document.querySelector('.item-render-box');

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

function startGame(data){
    isGaming = true;
    console.log('게임시작');

    // 백그라운드 뮤직
    const backgroundMusic = data.preloadSrc.audioList.bg;
    backgroundMusic.loop = true;
    backgroundMusic.play();

    // 타이머 돌아가기
    let time = data.gameData.time;
    $timer.innerText = '00:10';
    timer = countDown(time);

    // 당근 갯수 화면에 뿌리기
    const carrotCount = data.gameData.item.carrot;
    $itemCounter.innerText = carrotCount;

    // 당근, 벌레 뿌리기
    $itemRenderBox.innerHTML = '';
    const carrot = data.preloadSrc.imageList.carrot;
    const bug =  data.preloadSrc.imageList.bug;
    carrot.classList.add('carrot');
    bug.classList.add('bug');
    renderItem(carrot, carrotCount, 50);
    renderItem(bug, data.gameData.item.bug, 40);
}

function stopGame(data){
    isGaming = false;
    // 백그라운드 뮤직 멈추기
    data.preloadSrc.audioList.bg.pause();

    // 타이머 멈추기
    clearInterval(timer);
    $timer.innerText = '00:00';

    // 당근, 벌레 지우기
    $itemRenderBox.innerHTML = '';
}

function handlingStargBtn(data){
    const $btnBox = document.querySelector('.btn-box');
    const $startBtn = $btnBox.querySelector('.btn-start');
    const $stopBtn = $btnBox.querySelector('.btn-stop');

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
                stopGame(data);
                $startBtn.style.zIndex = 10;
                $stopBtn.style.zIndex = 0;
                break;
            default :
                throw new Error('정의되지않은 data-type입니다.');
        }
    });
}

function setGame(){
    const preloadSrc = preload();
    const gameData = setData();
    handlingStargBtn({preloadSrc, gameData});
}

function init(){
    setGame();
    /*
    1. 게임준비
        - 이미지 준비 v
        - 사운드 준비 v
        - 데이터 준비 v
            - 시간 v
            - 몇마리 나올지(당근, 벌레) v
        - 게임 시작버튼 조작
            - 진행중 멈춤 v
            - 진행중이 아니면 시작 v
                - 당근과 벌레 랜덤배치 v
                - 랜덤배치된 당근 클릭시 사라짐 (몇마리 숫자 카운트 다운)
                - 클릭 시점
                    - 벌레면 : 실패
                    - 당근이면 : 계속 진행
                - 타임 오버 : 실패
                - 게임이 끝나면 실패/성공 여부와 리플레이 버튼이 뜸
                - 리플레이 누르면 게임 데이터 초기화 하고 게임 시작
     */
}

init();