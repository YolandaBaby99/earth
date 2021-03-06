/*
* author:ls
* email:liusaint@gmail.com
* date:2015年6月
*/

/*这里是html5绘制*/
function draw (points) {

	//坐标区域长或宽，最大为250px。判断标准：坐标经度差与纬度差，大的那个为250px。再根据经度差与纬度差的比例计算出短的一边有多少px。
	var MAXSIZE = 300; 
	var maxL = points[0]['L'];
	var maxB=points[0]['B'];
	var minL = points[0]['L'];
	var minB=points[0]['B'];

	var value;

	for(var i=0,pointsLen=points.length;i<pointsLen;i++){
		value = points[i];
		maxL = maxL <value['L']?value['L'] :maxL;
		maxB = maxB <value['B']?value['B'] :maxB;
		minL = minL  > value['L']?value['L'] :minL;
		minB = minB >value['B']?value['B'] :minB;
	}

	var diffL = maxL - minL;//经度差
	var diffB = maxB - minB;//纬度差

	var width,height,Rate,diff;
	//计算坐标区域height width;

	if(diffL == 0){
		width =MAXSIZE;
		height = MAXSIZE;
		Rate = MAXSIZE/parseFloat(diffB);
	}
	else if (diffB == 0) {
		width =MAXSIZE;
		height = MAXSIZE;
		Rate = MAXSIZE/parseFloat(diffL);
	}else if(diffL >= diffB){
		diff = diffL;
		width = MAXSIZE;
		Rate = MAXSIZE/parseFloat(diffL);//单位坐标的有多少个px值。
		height = diffB/diffL*MAXSIZE;
	}else {
		diff = diffB;
		height = MAXSIZE;
		Rate = MAXSIZE/parseFloat(diffB);//单位坐标的有多少个px值。
		width = diffL/diffB*MAXSIZE;
	}



	var ctx = document.getElementById("myCanvas").getContext("2d");
	ctx.clearRect(0,0,350,350);//清空画布
	ctx.save();
	ctx.translate(20,20);//多出来的40是用来防止名字，以及点上的圆点显示不下


	// 根据B,L计算像素位置。计算应该有px。多出来的6，和10，表示所有坐标都向右移动6px,向下移动10px,也是避免基站名和圆点显示不下。
	for(var k=0,pointsLen=points.length;k<pointsLen;k++){
		value = points[k];
		if(diffL == 0){
			points[k]['Lpx']  =MAXSIZE/2;
			points[k]['Bpx']  = parseInt(height - (value['B'] - minB)*Rate);
		}
		else if (diffB == 0) {
			points[k]['Lpx'] =parseInt((value['L'] - minL)* Rate);
			points[k]['Bpx'] = MAXSIZE/2;
		} else {
			points[k]['Lpx'] =  parseInt((value['L'] - minL)* Rate);
			points[k]['Bpx'] = parseInt(height - (value['B'] - minB)*Rate);
		}
	}

	ctx.font = "bold 14px Arial";
	ctx.textAlign = "left";
	ctx.textBaseline = "middle";

	for(var x=0,pointsLen=points.length;x<pointsLen;x++){
		value = points[x];
		i = x +1;
		ctx.strokeStyle='black';
		while (i<pointsLen) {
			ctx.beginPath();
			ctx.moveTo(value['Lpx'] , value['Bpx']);
			ctx.lineTo(points[i]['Lpx'],  points[i]['Bpx']);
			ctx.stroke();
			i++;
		}
		ctx.beginPath();
		ctx.fillStyle ='black';
		ctx.fillText(value.Name, value['Lpx']+5, value['Bpx']);

		ctx.fillStyle = 'rgb(29,143,254)';
		ctx.beginPath();
		ctx.arc(value['Lpx'] , value['Bpx'] , 5, 0, Math.PI*2, false);
		ctx.fill();

	}
	ctx.restore();
}