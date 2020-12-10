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

function setGame(){
    const preloadSrc = preload();
    const gameData = setData();
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
            - 진행중 멈춤
            - 진행중이 아니면 시작
                - 당근과 벌레 랜덤배치
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