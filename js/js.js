var con = document.querySelector("#con");
var oLis = document.querySelectorAll("#con>ul>li");
var winW = document.documentElement.clientWidth;
var winH = document.documentElement.clientHeight;
var desW = 640;
var desH = 960;
if (winW / winH <= desW / desH) {
    con.style.webkitTransform = "scale(" + winH / desH + ")";
} else {
    con.style.webkitTransform = "scale(" + winW / desW + ")";
}

[].forEach.call(oLis, function () {
    var oLi = arguments[0];
    oLi.index = arguments[1];
    oLi.addEventListener("touchstart", start, false);
    oLi.addEventListener("touchmove", move, false);
    oLi.addEventListener("touchend", end, false);
});

function start(e) {
    this.startY = e.changedTouches[0].pageY;
    console.log(this.startY)
}
function move(e) {
    this.flag = true;
    e.preventDefault();
    var moveY = e.changedTouches[0].pageY;
    var movePos = moveY - this.startY;
    var index = this.index;
    console.log(movePos,moveY);
    [].forEach.call(oLis,function(){
        if(arguments[1]!=index){
            arguments[0].style.display = "none";
        }
        arguments[0].className = "";
        arguments[0].firstElementChild.id = "";
    })
    if (movePos > 0) {
        //this.prevsIndex = index == oLis.length - 1 ? 0 : index + 1;
        //var duration = -winH + movePos;
        this.prevsIndex = index == 0 ? oLis.length - 1 : index - 1;
        oLis[this.prevsIndex].style.bottom="0%";
        var duration = winH + movePos;
    } else if (movePos < 0) {
        this.prevsIndex = index == oLis.length - 1 ? 0 : index + 1;
        oLis[this.prevsIndex].style.top="0%";
        var duration = -winH + movePos;
        //this.prevsIndex = index == 0 ? oLis.length - 1 : index - 1;
        //var duration = winH + movePos;
    }
    oLis[this.prevsIndex].style.display  ="block";
    oLis[this.prevsIndex].className = "zIndex";
    oLis[this.prevsIndex].style.webkitTransform = "translate(0," + duration + "px)";
    oLis[index].style.webkitTransform = "scale("+(1-Math.abs(movePos)/winH*1/2)+") translate(0,"+movePos+"px)";

}
function end(e) {
    if(this.flag){
        //回到原始点的位置
        oLis[this.prevsIndex].style.webkitTransform = "translate(0,0)";
        oLis[this.prevsIndex].style.webkitTransition = "0.7s";
        oLis[this.prevsIndex].addEventListener("webkitTransitionEnd",function(){
            this.style.webkitTransition = "";//相当于清除动画的积累
            this.firstElementChild.id = "a"+(this.index);
            var _this=this;
        });
        this.flag = false;
    }
}
~function () {
    var music = document.getElementById("music"), audioFir = document.getElementById("audioFir");
    window.setTimeout(function () {
        audioFir.play();
        audioFir.addEventListener("canplay", function () {
            music.style.display = "block";
            music.className = "music musicMove";
        }, false);
    }, 500);
    music.addEventListener("click", function () {
        if (audioFir.paused) {
            audioFir.play();
            music.className = "music musicMove";
            return;
        }
        audioFir.pause();
        music.className = "music";
    }, false);
}();

