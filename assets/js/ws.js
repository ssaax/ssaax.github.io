var ws;
var sha1;
var qq;
window.onload = function(){ 
　　　　
	connserver();
	
	
　　} 


//验证QQ
function verifyqq(){
	var q=parseInt($("#qq").val());
	if(q<10000 || $("#qq").val()==""){
		tab("step1","step1-1");
		return;
	}
	if(q!=""){
	tab("step1","step1-3");
	enS(2,0,q);
		}
}//end verifyqq()

//tab
function tab(h,s){
	//h=隐藏 s=显示
		$("#"+s).show();
		$("#"+h).hide();
}//end tab()

//注册
function reg(){
	var _qq=$("#_qq").val();
	var _email=$("#email").val();
	var _password=$("#password").val();
	var _password2=$("#password2").val();
	//验证输入框是否为空
	if(_qq=="" || _email=="" || _password=="" || _password2==""){
	   alert("注册提示：注册表单不能留空。");
		return;
	   }
	//验证两次密码是否一致
	if(_password!=_password2){
		alert("注册提示：两次密码输入的不一致");
		return;
	}
//发送注册请求
enS(6,0,{qq:_qq,email:_email,password:_password});
}//end reg()
//公用函数::

function connserver(){
	"use strict";
ws = new WebSocket("wss"+":"+"\/\/"+document.domain+":"+3333);
ws.onopen = function() {
	
  //Set(9);
    //alert("连接成功");
	console.log("连接成功");
	//log("*连接服务器成功");

		
};
ws.onmessage = function(e) {
	
   // alert("收到服务端的消息：" + e.data);
	//test("[服务器消息]:"+e.data);
	//ShowPage("login");
	
	console.log("收到服务端的消息：" + e.data);
	//playwav("新消息，请查收");
	//document.write("收到服务端的消息：" + e.data);
	//log("[X SData]"+e.data);
	var d=JSON.parse(e.data);
	console.log(d);
	//console.log(d.Main);
	var Main=parseInt(d.Main);
	var Type=parseInt(d.Type);
	var Body=d.Body;
	switch(Main){
		case 100:
			sha1=d.Body.sha1;
				enS(1);
			break;
		case 1:
			if(Type==4){
			tab("step0","step0-4");
				
			}else{
				tab("step0","step1");
			}
			break;
			case 2:
				if(Type==4){
						tab("step1-3","step1-2");
		}else if(Type==1){
			tab("step1-3","step2");
			//验证成功
			$(".user img").attr("src","//q1.qlogo.cn/g?b=qq&nk="+Body.qq+"&s=100");
			$(".user .card-category").html(Body.qq+"  "+getDateDiff(Body.mems.join_time)+"入群");
			$(".user .card-title").html(Body.mems.nick);
			$("#_qq").val(Body.qq);
			$("#email").val(Body.qq+"@qq.com");
		}else if(Type==7){
			tab("step1-3","step1-4");
		}
			break;
			case 3://注册返回
			if(Type==1){
				//注册成功
				tab("step2","step3");
			}else if(Type==4){
					 //QQ被注册过
					 tab("step2","step4");
					 }else if(Type==41){
				//注册失败
				tab("step2","step4-1");
			}
	
break;
		default:
			
			break;
			
	}
	
	
	//deD(d);
};

ws.onclose=function(){
	
  console.log("*已从服务器断开连接！");
	//playwav("注意！连接中断");
	//ws.refresh();
	
	setTimeout(function(){reconn();},5000);
  ws.close(); //关闭TCP连接
	
};
}

//发送数据
function enS(){
"use strict";
  var main = arguments[0] ? arguments[0] : 0;
  var type = arguments[1] ? arguments[1] : 0;
  var body = arguments[2] ? arguments[2] : "";
  var timestamp=new Date().getTime();
	var hash=$.md5(sha1+main+type+JSON.stringify(body)+timestamp);
	var to={"Main":main,"Type":type,"Hash":hash,"Timestamp": timestamp,"Body":body};
	ws.send(JSON.stringify(to));
	console.log("enS:",to);
}

//js函数代码：字符串转换为时间戳
        function getDateTimeStamp(dateStr) {
            return Date.parse(dateStr.replace(/-/gi, "/"));
        } 
 
       //计算时差
        function getDateDiff(dateTimeStamp) {
            var minute = 60;
            var hour = minute * 60;
            var day = hour * 24;
            var halfamonth = day * 15;
            var month = day * 30;
			var year = month * 12;
            var now = Date.parse(new Date())/1000;
            var diffValue = now - dateTimeStamp;
            if (diffValue < 0) {
                //若日期不符则弹窗口告之,结束日期不能小于开始日期！
            }
			var yearC= diffValue / year;
            var monthC = diffValue / month;
            var weekC = diffValue / (7 * day);
            var dayC = diffValue / day;
            var hourC = diffValue / hour;
            var minC = diffValue / minute;
        if (yearC >= 1) {
                result = "于" + parseInt(yearC) + "年前";
            }
            else if (monthC >= 1) {
                result = "于" + parseInt(monthC) + "个月前";
            }
            else if (weekC >= 1) {
                result = "于" + parseInt(weekC) + "周前";
            }
            else if (dayC >= 1) {
                result = "于" + parseInt(dayC) + "天前";
            }
            else if (hourC >= 1) {
                result = "于" + parseInt(hourC) + "个小时前";
            }
            else if (minC >= 1) {
                result = "于" + parseInt(minC) + "分钟前";
            } else
                result = "刚刚";
            return result;
        }
 