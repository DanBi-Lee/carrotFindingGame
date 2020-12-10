window.addEventListener('load', ()=>{
    const $wrap = document.querySelector('.wrap');
    let browserWidth = window.innerWidth;
    let browserHeight = window.innerHeight;
    const IMAGE_WIDTH = $wrap.clientWidth;
    const IMAGE_HEIGHT = $wrap.clientHeight;
    const IMAGE_RATE = IMAGE_WIDTH/IMAGE_HEIGHT;

    
    function setBackground(){
        browserWidth = window.innerWidth;
        browserHeight = window.innerHeight;
        
        if ( browserWidth/browserHeight < IMAGE_RATE ){ 
            // 이미지 비율보다 높이가 길다
            $wrap.style.transform = `scale(${browserWidth/IMAGE_WIDTH})`;
        }else {
            // 이미지 비율이 같거나 너비가 같다.
            $wrap.style.transform = `scale(${browserHeight/IMAGE_HEIGHT})`;
        }
    }
    
    function screenRatio(){
        window.addEventListener('resize',function (){
            setBackground();
        })
        setBackground();
    }

    function init(){
        screenRatio();
    }
    
    init();
});