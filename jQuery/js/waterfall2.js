window.onload = function() {
    waterfall('main', 'box');
    var dataInt ={"data":[{"src":'0.jpg'},{"src":"1.jpg"},{"src":"2.jpg"},{"src":"3.jpg"},{"src":"4.jpg"}]}
      window.onscroll=function(){
               if(checkScrollSlide){
                var oParent=document.getElementById('main');
                   //将数据块渲染到当页面的尾部
                    for(var i=0;i<dataInt.data.length;i++){
                     var oBox =document.createElement('div');  
                      oBox.className='box';
                      oParent.appendChild(oBox);
                      var oPic =document.createElement('div');
                      oPic.className='pic';
                      oBox.appendChild(oPic);
                      var oImag =document.createElement('img');
                       oImag.src="images/"+dataInt.data[i].src;
                       oPic.appendChild(oImag);
                    }
               }
      }
}
function waterfall(parent, box) {
    var oParent = document.getElementById(parent);
    var oBoxs = getByClass(oParent, box);
    console.log(oBoxs.length);
    //计算整个页面显示的列数（页面宽/box的宽）
    var oBoxW = oBoxs[0].offsetWidth;
    var cols = Math.floor(document.documentElement.clientWidth / oBoxW);
    console.log(cols);
    //设置main的宽
    oParent.style.cssText = 'width:' + oBoxW * cols + 'px;margin:0 auto';
    var hArr = []; //存放每一列高度的数组
    for (var i = 0; i < oBoxs.length; i++) {
        if (i < cols) {
            hArr.push(oBoxs[i].offsetHeight);
        } else {
            var minH = Math.min.apply(null, hArr);
            console.log(minH);
            var index = getMinhIndex(hArr, minH);
            oBoxs[i].style.position = 'absolute';
            oBoxs[i].style.top = minH + 'px';
            oBoxs[i].style.left = oBoxW * index + 'px';
            hArr[index]+=oBoxs[i].offsetHeight;
        }
    }
    console.log(hArr);
}
//根据class获取元素
function getByClass(parent, className) {
    var boxArr = new Array(),
        oElements = parent.getElementsByTagName('*');
    for (var i = 0; i < oElements.length; i++) {
        if (oElements[i].className == className) {
            boxArr.push(oElements[i]);
        }
    }
    return boxArr;
};

function getMinhIndex(arr, val) {
    for (var i in arr) {
        if (arr[i] == val) {

            return i;

        }
    }
}
//检测是否具备了滚条加载数据库的条件
   function checkScrollSlide(){
       var oParent =document.getElementById('main');
         var oBox=getByClass(oParent,'box');
         var lastBoxH =oBoxs[oBoxs.length-1].offsetTop+Math.floor(oBoxs[oBoxs.length-1].offsetHeight/2);
         var scrollTop=dcument.body.scrollTop||document.documentElement.scrollTop;
         var height =document.body.clientHeight || document.ducumentElement.clientHeight;
         return (lastBoxH<scrollTop+height)?true:false;
         
   }
