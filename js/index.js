//抽奖人员名单
var allPerson = "肖志明;刘炜;金学龙;任永宁;汪志龙;段松阳;江原;施远敏;丁泽文;曾月天;秦卓;冯晶;汤华南;马玉霞;赵玉斌;江雪;孙晓磊;万浩然;曹昆;张树伟;金一帆;邱昚帆;刘鹏;周振岭;曹艳萍;冒雨楠;李汶璇;吴迪;李从心;张子楠";
//未中奖人员名单
var remainPerson = allPerson.toString().split(";");
//中奖人员名单
var luckyMan = [];
var timer;//定时器
var times = 1;//抽奖次数
$(function () {
    iconAnimation();
    // var audio = document.getElementById("audio");
    // audio.volume = 0.4;
    var beginAudio = document.getElementById("beginAudio");
    var stopAudio = document.getElementById("stopAudio");
    stopAudio.volume =  1.0;

    //开始抽奖
    $("#btnStart").on("click", function () {
        //console.log(remainPerson.length);
        //判断是开始还是结束
        if ($("#btnStart").text() === "开始") {
            if(remainPerson.length == 0){
                showDialog("所有人都抽完啦，开始新的一轮吧！");
                return false;
            }
            /*
            if (!$("#txtNum").val()) {
                showDialog("请输入中奖人数");
                return false;
            }
            if ($("#txtNum").val() > remainPerson.length) {
                showDialog("一次最多只能输入"+remainPerson.length+"人哟");
                return false;
            }
            if ($("#txtNum").val() > remainPerson.length) {
                showDialog("当前抽奖人数大于奖池总人数<br>当前抽奖人数：<b>" + $("#txtNum").val() + "</b>人,奖池人数：<b>" + remainPerson.length + "</b>人");
                return false;
            }
            */
            $("#result").fadeOut();
            $("#luckyDrawing").show().next().addClass("hide");//显示动画框，隐藏中奖框
            move();
            $("#btnStart").text("停止");
            $("#bgLuckyDrawEnd").removeClass("bg");//移除光辉背景
            // audio.pause(); 
            beginAudio.play();
        }
        else {
            $("#btnStart").text("开始");//设置按钮文本为开始
            var luckyDrawNum = $("#txtNum").val();
            startLuckDraw();//抽奖开始
            $("#luckyDrawing").fadeOut();
            clearInterval(timer);//停止输入框动画展示
            $("#luckyDrawing").val(luckyMan[luckyMan.length - 1]);//输入框显示最后一个中奖名字
            $("#result").fadeIn().find("div").removeClass().addClass("p" + luckyDrawNum);//隐藏输入框，显示中奖框
            $("#bgLuckyDrawEnd").addClass("bg");//添加中奖背景光辉
            $("#txtNum").attr("placeholder", "输入中奖人数(" + remainPerson.length + ")");
            beginAudio.pause();
            stopAudio.play();
            // audio.play();
        }

    });

    $("#btnReset").on("click", function () {
        //确认重置对话框
        var confirmReset = false;
        showConfirm("确认重置吗？重置后所有人会重新回到抽奖池！", function () {
            //熏置未中奖人员名单
            remainPerson = allPerson.toString().split(";");
            //中奖人数框置空 (重置之后默认仍然为1个)
            //$("#txtNum").val("").attr("placeholder", "请输入中奖人数");
            $("#showName").val("");
            //隐藏中奖名单,然后显示抽奖框
            $("#result").fadeOut();//.prev().fadeIn()
            $("#bgLuckyDrawEnd").removeClass("bg");//移除背景光辉
            times++;
            console.log(times);

        });
    });
});

//抽奖主程序
function startLuckDraw() {
    //抽奖人数
    var luckyDrawNum = $("#txtNum").val();
    if (luckyDrawNum > remainPerson.length) {
        alert("抽奖人数大于奖池人数！请修改人数，或者点重置开始将新一轮抽奖！");
        return false;
    }
    //随机中奖人
    var randomPerson = getRandomArrayElements(remainPerson, luckyDrawNum);
    console.log("中奖人：",randomPerson);
    var tempHtml = "";
    $(randomPerson).each(function (i,person) {
         tempHtml += "<span>" + person + "</span>";
    })
     $("#result>div").html(tempHtml);
    //剩余人数剔除已中奖名单
    remainPerson = remainPerson.delete(randomPerson);
    console.log("剩余人数：",remainPerson.length);
    //中奖人员
    luckyMan = luckyMan.concat(randomPerson);
    console.log("所有中奖名单：",luckyMan);
    //设置抽奖人数框数字为空
    $("#txtNum").val(1);

}

//跳动的数字
function move() {
    var $showName = $("#showName"); //显示内容的input的ID
    var interTime = 30;//设置间隔时间
    timer = setInterval(function () {
        var i = GetRandomNum(0, remainPerson.length);
        $showName.val(remainPerson[i]);//输入框赋值
    }, interTime);
}

//顶上的小图标，随机动画
function iconAnimation() {
    var interTime = 200;//设置间隔时间
    var $icon = $("#iconDiv>span");
    var arrAnimatoin = ["bounce", "flash", "pulse", "rubberBand", "shake", "swing", "wobble", "tada"];
    var timer2 = setInterval(function () {
        var i = GetRandomNum(0, $icon.length);
        var j = GetRandomNum(0, arrAnimatoin.length);
        //console.log("i:" + i + ",j:" + j);
        $($icon[i]).removeClass().stop().addClass("animated " + arrAnimatoin[j]);//输入框赋值
    }, interTime);

}
