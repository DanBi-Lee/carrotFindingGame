window.addEventListener('load', ()=>{
    const $body = document.querySelector('body');
    const $wrap = document.querySelector('.wrap');
    let browserWidth = window.innerWidth;
    let browserHeight = window.innerHeight;
    const IMAGE_WIDTH = $wrap.clientWidth;
    const IMAGE_HEIGHT = $wrap.clientHeight;
    const IMAGE_RATE = IMAGE_WIDTH/IMAGE_HEIGHT;
    let isMobile = false;
    let isPortrait = false;
    
    function setBackground(ismobileLandscapeMode){
        browserWidth = window.innerWidth;
        browserHeight = window.innerHeight;

        if(ismobileLandscapeMode){
            const IMAGE_RATE_LANDSCAPE = IMAGE_HEIGHT/IMAGE_WIDTH;
            if ( browserWidth/browserHeight < IMAGE_RATE_LANDSCAPE ){ 
                $wrap.style.transform = `scale(${browserWidth/IMAGE_HEIGHT})`;
            }else {
                $wrap.style.transform = `scale(${browserHeight/IMAGE_WIDTH})`;
            }
        }else{
            if ( browserWidth/browserHeight < IMAGE_RATE ){ 
                $wrap.style.transform = `scale(${browserWidth/IMAGE_WIDTH})`;
            }else {
                $wrap.style.transform = `scale(${browserHeight/IMAGE_HEIGHT})`;
            }
        }
    }
    
    function screenRatio(ismobileLandscapeMode){
        window.addEventListener('resize',function (){
            setBackground(ismobileLandscapeMode);
        })
        setBackground(ismobileLandscapeMode);
    }

    function checkMobileLandscapeMode(){
        isMobile = /iPhone|iPad|iPod|Android|Mobile/i.test(navigator.userAgent);
        isPortrait = window.outerWidth < window.outerHeight;
        if(isMobile && isPortrait){
            $body.classList.add('landscape');
            return true;
        }else{
            return false;
        }
    }

    function init(){
        const ismobileLandscapeMode = checkMobileLandscapeMode();
        screenRatio(ismobileLandscapeMode);
    }
    
    init();
});