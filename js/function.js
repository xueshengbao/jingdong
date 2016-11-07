// 获取类名的兼容性函数
// 功能 要实现ie低版本里面适配getClass
// ---------------------------------------------- 集合
function getClass(classname,obj){
	// 参数初始化
	var obj=obj||document;
	if(obj.getElementsByClassName){
		return obj.getElementsByClassName(classname);
	}else{
		var arr=[];
		var objs=document.getElementsByTagName('*');
		for(var i=0;i<objs.length;i++){
			if(objs[i].className==classname){
				arr.push(objs[i]);
			}
		}
		return arr;
	}
}
function CheckClass(obj,val){
	var classStr=obj.className;
	var classArr=classStr.split(" ");
	for (var i = 0; i < classArr.length; i++) {
		if(val==classArr[i]){
			return true;
		}
	};
	return false;
}

// ---------------------------------------------- 获取内容
function operateText(obj,val){
	if(val!=undefined){
		if(val.innerText){
			return val.innerText;
		}else{
			return val.textContent;
		}
	}else{
		if(obj.innerText){
			return obj.innerText;
		}else{
			return obj.textContent;
		}
	}
		
}
// ----------------------------------------------获取样式

function getStyle(obj,style){
	if (obj.currentStyle) {
		return obj.currentStyle[style];
	} else{
		return getComputedStyle(obj,null)[style]
	};

}
// ----------------------------------------------    $
function $(val,obj){
	if(typeof val=="string"){
		var obj=obj||document;
		val=val.replace(/^\s*|\s*$/g,'')
		if(val.charAt(0)=="#"){
			return document.getElementById(val.slice(1));
		}else if(val.charAt(0)=="."){
			return getClass(val.slice(1),obj)
		}else if(/^[a-zA-Z][a-zA-Z0-9]{0,10}/.test(val)){
			return obj.getElementsByTagName(val)
		}else if(/^<[a-zA-Z][a-zA-Z0-9]{0,10}>/.test(val)){
			return document.createElement(val.slice(1,-1))
		}
		//  如果是函数
	}else if(typeof val=="function"){
		window.onload=function(){
			val();
		}
	}
}
// ----------------------------------------------选项卡

// window.onload=function(){
// 	var bt=getClass('bt');
// 	var tp=getClass('tp');
// 	for (var i = 0; i < bt.length; i++) {
// 		bt[i].index=i;
// 		bt[i].onclick=function(){
// 			for (var i = 0; i < bt.length; i++) {
// 				bt[i].className='bt';
// 			};
// 			bt[this.index].className='bt active';
// 			for (var i = 0; i < tp.length; i++) {
// 				tp[i].style.display='none';
// 				// tp[i].className='tp';
// 			};
// 			tp[this.index].style.display='block';
// 			// tp[this.index].className='tp active';
// 		};
// 	};
// };


// -------------------------------------------轮播Ⅰ
function lunbo1(tp,lis,box){
	var tp=tp;
	var lis=lis;
	var box=box;
	var n=0;
	var t=setInterval(con,2000);
	function con(){
		n++;
		if(n>=tp.length){
			n=0;
		};
		for (var i = 0; i < tp.length; i++) {
			tp[i].className='tp';
			lis[i].className='lis';
		};  
		tp[n].className='tp active';
		lis[n].className='lis lis-first';
	};
	box.onmouseover=function(){
		clearInterval(t);
	};
    box.onmouseout=function(){
        t=setInterval(con,2000);
    };
    for (var i = 0; i < lis.length; i++) {
    	lis[i].index=i;
    	lis[i].onclick=function(){
	    	for (var i = 0; i < lis.length; i++) {
	    		tp[i].className='tp';
				lis[i].className='lis';
	    	};
	    	tp[this.index].className='tp active';
			lis[this.index].className='lis lis-first';
			n=this.index;
	    };
	};
};



// -------------------------------------------轮播Ⅱ
function lunbo2(box,tp,lis,left,right,time,color,nextColor,mateTime){
	var box=box;
	var tp=tp;
	var lis=lis;
	var left=left;
	var right=right;
	var width=parseInt(getStyle(box,'width'));
	var n=0;
	var next=0;
	var flag=true;
	var t=setInterval(con,time);
	
	function con(type){
		var type=type||'r';
		if(type=='l'){
			if(!flag){
			return;
			}
			flag=false;
			next=n-1;
			if(next<0){
				next=tp.length-1;
			}
			tp[next].style.left=-width+'px';
			animate(tp[n],{left:width},mateTime);
			animate(tp[next],{left:0},mateTime,function(){
				flag=true;
			})
		}else if(type=='r'){
			if(!flag){
			return;
			}
			flag=false;
			next=n+1;
			if(next>=tp.length){
				next=0;
			}
			tp[next].style.left=width+'px';
			animate(tp[n],{left:-width},mateTime);
			animate(tp[next],{left:0},mateTime,function(){
				flag=true;
			});
		};
		for (var i = 0; i < lis.length; i++) {
			lis[i].style.background=color;
		};lis[next].style.background=nextColor;
		n=next;
	}
	box.onmouseover=function(){
		clearInterval(t);
	}
	box.onmouseout=function(){
		t=setInterval(con,time);
	}
	hover(box,function(){
		animate(left,{width:30},600)
		animate(right,{width:30},600)
	},function(){
		animate(left,{width:0},600)
		animate(right,{width:0},600)
	})
	right.onclick=function(){
		con('r');
	}
	left.onclick=function(){
		con('l');
	}
	for (var i = 0; i < lis.length; i++) {
		lis[i].index=i;
		lis[i].onclick=function(){	  
            if(this.index>n){
              	if(!flag){
				   return;
				}
				flag=false;
              	tp[this.index].style.left=width+'px';
				animate(tp[n],{left:-width},mateTime);
				animate(tp[this.index],{left:0},mateTime,function(){
					flag=true;
				})
            }else if(this.index<n){
              	if(!flag){
				   return;
				};
				flag=false;
          		tp[this.index].style.left=-width+'px';
				animate(tp[n],{left:width},mateTime);
				animate(tp[this.index],{left:0},mateTime,function(){
					flag=true;
				});
            };
              for (var i = 0; i < lis.length; i++) {
				lis[i].style.background=color;
				};lis[this.index].style.background=nextColor;
              n=this.index;
              next=this.index;
		};
	};
};

function banner(box,tp,lis,left,right,time,color,nextColor,mateTime){
	var box=box;
	var tp=tp;
	var lis=lis;
	var left=left;
	var right=right;
	var width=parseInt(getStyle(box,'width'));
	var n=0;
	var next=0;
	var flag=true;
	var t=setInterval(con,time);
	
	function con(type){
		var type=type||'r';
		if(type=='l'){
			if(!flag){
			return;
			}
			flag=false;
			next=n-1;
			if(next<0){
				next=tp.length-1;
			}
			tp[next].style.left=-width+'px';
			animate(tp[n],{left:width},mateTime);
			animate(tp[next],{left:0},mateTime,function(){
				flag=true;
			})
		}else if(type=='r'){
			if(!flag){
			return;
			}
			flag=false;
			next=n+1;
			if(next>=tp.length){
				next=0;
			}
			tp[next].style.left=width+'px';
			animate(tp[n],{left:-width},mateTime);
			animate(tp[next],{left:0},mateTime,function(){
				flag=true;
			});
		};
		for (var i = 0; i < lis.length; i++) {
			lis[i].style.background=color;
		};lis[next].style.background=nextColor;
		n=next;
	};
	box.onmouseover=function(){
		clearInterval(t);
		animate(left,{width:20},600)
		animate(right,{width:20},600)
	};
	box.onmouseout=function(){
		t=setInterval(con,time);
		animate(left,{width:0},600)
		animate(right,{width:0},600)
	};
	right.onclick=function(){
		con('r');
	}
	left.onclick=function(){
		con('l');
	}
	for (var i = 0; i < lis.length; i++) {
		lis[i].index=i;
		lis[i].onclick=function(){	  
            if(this.index>n){
              	if(!flag){
				   return;
				}
				flag=false;
              	tp[this.index].style.left=width+'px';
				animate(tp[n],{left:-width},mateTime);
				animate(tp[this.index],{left:0},mateTime,function(){
					flag=true;
				})
            }else if(this.index<n){
              	if(!flag){
				   return;
				};
				flag=false;
          		tp[this.index].style.left=-width+'px';
				animate(tp[n],{left:width},mateTime);
				animate(tp[this.index],{left:0},mateTime,function(){
					flag=true;
				});
            };
              for (var i = 0; i < lis.length; i++) {
				lis[i].style.background=color;
				};lis[this.index].style.background=nextColor;
              n=this.index;
              next=this.index;
		};
	};
};
// 获取子节点

function getChilds(obj,type){
	var type=type||"no"
	var kids=obj.childNodes;
	var arr=[];
	for (var i = 0; i < kids.length; i++) {
		if(type=="no"){
			if(kids[i].nodeType=='1'){
				arr.push(kids[i])
			}
		}else if(type=="yes"){
			if(kids[i].nodeType=='1'||kids[i].nodeType=='3'&&kids[i].nodeValue.replace(/^\s*|\s*$/g,"")){
				arr.push(kids[i])
			}
		}
	};
	return arr;
}

// 取第一个

function getFirst(obj,type){
	var type=type||"no"
	return getChilds(obj,type)[0];
}

// 取最后一个

function getLast(obj,type){
	var type=type||"no"
	var childs=getChilds(obj,type);
	return childs[childs.length-1]
}

// 取第n个

function getNub(obj,n,type){
	var type=type||"no"
	var childs=getChilds(obj,type);
	if(n>childs.length||n<1){
		return false;
	}
	return childs[n-1]
}

// 取下一个兄弟节点

function getNext(obj,type){
	var type=type||"no";
	var next=obj.nextSibling;
	if(next==null){
		return false;
	}if(type=='no'){
		while(next.nodeType=='3'||next.nodeType=='8'){
			next=next.nextSibling;
			if(next==null){
				return false;
			}		
		}
		return  next;
	}else if(type=='yes'){
		while(next.nodeType=='3'&&!next.nodeValue.replace(/^\s*|\s*$/g,"")||next.nodeType=='8'){
			next=next.nextSibling;
			if(next==null){
				return false;
			}		
		}
		return  next;

	}
}

// 获取上一个兄弟节点


function getPrevious(obj,type){
	var type=type||"no";
	var previous=obj.previousSibling;
	if(previous==null){
		return false;
	}
	if(type=='no'){
		while(previous.nodeType=='3'||previous.nodeType=='8'){
			previous=previous.previousSibling;
			if(previous==null){
				return false;
			}		
		}
		return  previous;
	}else if(type=='yes'){
		while(previous.nodeType=='3'&&!previous.nodeValue.replace(/^\s*|\s*$/g,"")||previous.nodeType=='8'){
			previous=previous.previousSibling;
			if(previous==null){
				return false;
			}		
		}
		return  previous;

	}
}

// 引入页面

function insertBefore(obj,obj2){
	var parent=obj2.parentNode;
	parent.insertBefore(obj,obj2);
}


function insertAfter(obj,obj3){
	var parent=obj3.parentNode;
	var next=getNext(obj3,'yes');
	if(!next){
		parent.appendChild(obj)
	}else{
		parent.insertBefore(obj,next);
	}	
}

   // 轮播三
function lunbo3(lunbo,left,right,box,img,time,mateTime){
	var lunbo=lunbo;
	var left=left;
	var right=right;
	var box=box;
	var img=img;
	var flag=true;
	var width=parseInt(getStyle($('.img')[0],"width"));
	var t=setInterval(con,time)
	function con(){
		if(flag==false){
			return;
		}
		flag=false
		animate(box,{left:-width},mateTime,
			function(){
				var Frist=getFirst(box);
				box.appendChild(Frist);
				box.style.left='0px';
				flag=true;
			});
	}
	lunbo.onmouseover=function(){
		clearInterval(t);
	};
    lunbo.onmouseout=function(){
        t=setInterval(con,time);
    };
    left.onclick=function(){
    	if(flag==false){
			return;
		}
		flag=false
    	var gFirst=getFirst(box);
    	var gLast=getLast(box);
    	insertBefore(gLast,gFirst);
    	box.style.left=-width+'px'
    	animate(box,{left:0},mateTime,function(){
    		flag=true;
    	})
    }
    right.onclick=function(){
   		con() ;	
    }


}

// 事件绑定
                // 添加
function addEvent(obj,event,fun){
	if(obj.attachEvent){
		obj.attachEvent('on'+event,fun)
	}else{
		obj.addEventListener(event,fun,false)
	}
}
                // 删除
function removeEvent(obj,event,fun){
	if(obj.detachEvent){
		obj.detachEvent('on'+event,fun)
	}else{
		obj.removeEventListener(event,fun,false)
	}
}


// 滚轮事件


function mouseWheel(obj,down,up){
	if(obj.attachEvent){
		// IE
		obj.attachEvent("onmousewheel",scrollFn);
	}else if(obj.addEventListener){
		// 谷歌
	obj.addEventListener("mousewheel",scrollFn,false);
	    // 火狐
	obj.addEventListener("DOMMouseScroll",scrollFn,false);
	}
	// 滚轮方向
	function scrollFn(){
		var e=e||window.event
		if(e.preventDefault){
			e.preventDefault();	
		}else{
			e.returnValue=false;
		}
		        // IE         FF
		var nub=e.wheelDelta||e.detail;
		if(nub==120||nub==-3){
			// 改变thus指针 让this指向obj
			up.call(obj);
		}else if(nub==-120||nub==3){
			down.call(obj);
		}
	}
}

//15.hover
//判断某个元素是否包含有另外一个元素
 function contains (parent,child) {
  if(parent.contains){
     return parent.contains(child) && parent!=child;
  }else{
    return (parent.compareDocumentPosition(child)===20);
  }
 }

//判断鼠标是否真正的从外部移入，或者是真正的移出到外部；
  function checkHover (e,target) {
   if(getEvent(e).type=="mouseover"){
      return !contains(target,getEvent(e).relatedTarget || getEvent(e).fromElement)&&
    !((getEvent(e).relatedTarget || getEvent(e).fromElement)===target)
   }else{
    return !contains(target,getEvent(e).relatedTarget || getEvent(e).toElement)&&
    !((getEvent(e).relatedTarget || getEvent(e).toElement)===target)
    }
  }
//鼠标移入移出事件
/*
  obj   要操作的对象
  overfun   鼠标移入需要处理的函数
  outfun     鼠标移除需要处理的函数
*/
function hover (obj,overfun,outfun) {
    if(overfun){
      obj.onmouseover=function  (e) {
        if(checkHover(e,obj)){
           overfun.call(obj,[e]);
        }
      }
    }
    if(outfun){
      obj.onmouseout=function  (e) {
        if(checkHover(e,obj)){
           outfun.call(obj,[e]);
        }
      }
    }
}
 function getEvent (e) {
      return e||window.event;
 }

function daohan(floor,left,left_lis,front,queen){
 	var floor=floor;
	var left=left;
	var left_lis=left_lis;
	var front=front;
	var queen=queen;
	var Return=$('.return')[0];
	var Cheight=document.documentElement.clientHeight;
	var now;
	var flag=true;
	var flag1=true;
	for (var i = 0; i < floor.length; i++) {
		floor[i].h=floor[i].offsetTop;
	};
	window.onscroll=function(){
		var obj=document.body.scrollTop?document.body:document.documentElement;
		var top=obj.scrollTop;
		// console.log(top);
		if(top>=floor[0].h-400){
			left.style.display='block';
			var Lheight=left.offsetHeight;
			left.style.top=(Cheight-Lheight)/2+'px';
			
		} 
		if(top<floor[0].h-400){
			left.style.display='none';
			
		}
		for (var i = 0; i < floor.length; i++) {
			floor[i].h=floor[i].offsetTop;
			if(top>=floor[i].h-400){
				for(var j = 0; j< left_lis.length; j++){
					front[j].style.display="block";
					queen[j].style.display="none";
					front[i].style.color="#5F5F5D";
				}
				front[i].style.display="none";
				queen[i].style.display="block";
				queen[i].style.color="#C81623";
				now=i;
			};
		};
		// 返回顶层
		// Return.onclick=function(){
		// 	animate(document.body,{scrollTop:0},400)
  //   		animate(document.documentElement,{scrollTop:0},400)
		// }

    };
    // 点击楼层
    for (var i = 0; i < left_lis.length; i++) {
    	left_lis[i].index=i;
    	left_lis[i].onclick=function(){
    		animate(document.body,{scrollTop:floor[this.index].h},600)
    		animate(document.documentElement,{scrollTop:floor[this.index].h},600)
    		now=this.index;
    	};
    	// 移入移出效果
    	left_lis[i].onmouseover=function(){
    		front[this.index].style.display="none";
			queen[this.index].style.display="block";
			queen[this.index].style.color='#fff';
    		this.style.background='#C81623';
    	}
    	left_lis[i].onmouseout=function(){
    		if(this.index==now){
    			front[this.index].style.display="none";
				queen[this.index].style.display="block";
    			this.style.background='#fff';
    			queen[this.index].style.color="#C81623";
    			return
    		}
    		front[this.index].style.display="block";
			queen[this.index].style.display="none";
    		this.style.background='#fff';
    		front[this.index].style.color='#5F5F5D'
    	}
    };
	
}

function lunbo4(lunbo,left,right,box,img,mateTime){
	var lunbo=lunbo;
	var left=left;
	var right=right;
	var box=box;
	var img=img;
	var flag=true;
	var width=parseInt(getStyle($('.lis-one')[0],"width"));
	var t=function con(){
		if(flag==false){
			return;
		}
		flag=false
		animate(box,{left:-width},mateTime,
			function(){
				var Frist=getFirst(box);
				box.appendChild(Frist);
				box.style.left='0px';
				flag=true;
			});
	}
	lunbo.onmouseover=function(){
		clearInterval(t);
	};
    lunbo.onmouseout=function(){
        t=function con(){
		if(flag==false){
			return;
		}
		flag=false
		animate(box,{left:-width},mateTime,
			function(){
				var Frist=getFirst(box);
				box.appendChild(Frist);
				box.style.left='0px';
				flag=true;
			});
	}
    };
    hover(box,function(){
		animate(left,{width:25},600)
		animate(right,{width:25},600)
	},function(){
		animate(left,{width:0},600)
		animate(right,{width:0},600)
	})
    left.onclick=function(){
    	if(flag==false){
			return;
		}
		flag=false
    	var gFirst=getFirst(box);
    	var gLast=getLast(box);
    	insertBefore(gLast,gFirst);
    	box.style.left=-width+'px'
    	animate(box,{left:0},mateTime,function(){
    		flag=true;
    	})
    }
    right.onclick=function(){
   		if(flag==false){
			return;
		}
		flag=false
		animate(box,{left:-width},mateTime,
			function(){
				var Frist=getFirst(box);
				box.appendChild(Frist);
				box.style.left='0px';
				flag=true;
			});	
    }


}
function con(box,img){
	var box=box;
	var img=img;
	hover(img,function(){
		animate(img,{left:-10},600)
	},function(){
		animate(img,{left:0},600)
	})
}


function lunbo5(tp,box){
	var tp=tp;
	var box=box;
	var n=0;
	var flag=true
	var top=parseInt(getStyle($('.lis-two')[0],'height'));
	var t=setInterval(con,1000);
	function con(){
		if(flag==false){
			return;
		}
		flag=false
		animate(box,{top:-top},1000,
			function(){
				var Frist=getFirst(box);
				box.appendChild(Frist);
				box.style.top='0px';
				flag=true;
			});
	}
	box.onmouseover=function(){
		clearInterval(t);
	};
    box.onmouseout=function(){
        t=setInterval(con,1000);
    };
};

function home(uls,lis){
	var uls=uls;
	var lis=lis;
	hover(uls,function(){
		lis.style.display='block'
		uls.style.background="#fff"
	},function(){
		lis.style.display='none'
		uls.style.background="#F1F1F1"
	})
}
function home1(uls,lis){
	var uls=uls;
	var lis=lis;
	hover(uls,function(){
		lis.style.display='block'
	},function(){
		lis.style.display='none'
	})
}

// 选项卡
function xxka(bt,tp){
	var bt=bt;
	var tp=tp;
	for (var i = 0; i < bt.length; i++) {
		bt[i].index=i;
		hover(bt[i],function(){
			for (var i = 0; i < bt.length; i++) {
				bt[i].className='bt';
			};
			bt[this.index].className="bt first";
			for (var i = 0; i < tp.length; i++) {
				tp[i].style.display='none';
				// tp[i].className='tp';
			};
			tp[this.index].style.display='block';
			// tp[this.index].className='tp active';
		},function(){
			bt[this.index].className="bt first";
			tp[this.index].style.display="block"
		})
	};
};
function xxka5(bt,tp,box){
	var box=box;
	var bt=bt;
	var tp=tp;
	console.log(bt)
	for (var i = 0; i < bt.length; i++) {
		bt[i].index=i;
		hover(bt[i],function(){
			for (var i = 0; i < bt.length; i++) {
				bt[i].className='bts';
			};
			bt[this.index].className="bts first";
			for (var i = 0; i < tp.length; i++) {
				tp[i].style.display='none';
				// tp[i].className='tp';
			};
			tp[this.index].style.display='block';
			// tp[this.index].className='tp active';
		},function(){
			bt[this.index].className="bts first";
			tp[this.index].style.display="block"
		})
	};
};
function xxka6(bt,tp,box){
	var box=box;
	var bt=bt;
	var tp=tp;
	console.log(bt)
	for (var i = 0; i < bt.length; i++) {
		bt[i].index=i;
		hover(bt[i],function(){
			for (var i = 0; i < bt.length; i++) {
				bt[i].className='btss';
			};
			bt[this.index].className="btss first";
			for (var i = 0; i < tp.length; i++) {
				tp[i].style.display='none';
				// tp[i].className='tp';
			};
			tp[this.index].style.display='block';
			// tp[this.index].className='tp active';
		},function(){
			bt[this.index].className="btss first";
			tp[this.index].style.display="block"
		})
	};
};
function xxka7(bt,tp,box){
	var box=box;
	var bt=bt;
	var tp=tp;
	console.log(bt)
	for (var i = 0; i < bt.length; i++) {
		bt[i].index=i;
		hover(bt[i],function(){
			for (var i = 0; i < bt.length; i++) {
				bt[i].className='bt';
			};
			bt[this.index].className="bt first";
			for (var i = 0; i < tp.length; i++) {
				tp[i].style.display='none';
				// tp[i].className='tp';
			};
			tp[this.index].style.display='block';
			// tp[this.index].className='tp active';
		},function(){
			bt[this.index].className="bt first";
			tp[this.index].style.display="block"
		})
	};
};
// 换一批
function replace(bt,tp){
	var bt=bt;
	var tp=tp;
	var width=parseInt(getStyle($('.four-bottom')[0],"width"));
	var n=0;
	var next=0;
	function con(){
		next=n+1;
		if(next>=tp.length){
			next=0;
		}
		tp[next].style.left=width+'px';
		animate(tp[n],{left:-width},600)
		animate(tp[next],{left:0},600)
		n=next;
	}
	bt.onclick=function(){
    	con();
    }

}
// 流星
function meteor(box,tb){
	var box=box;
	var tb=tb;
	hover(box,function(){
		tb.style.right="910px";
		animate(tb,{right:0},600)
	},function(){
		tb.style.right="0px";
	})
}
// banner
function menu(lis,box){
	var lis=lis;
	var box=box;
	for (var i=0;i<box.length;i++){
		box[i].index=i;
	    hover(box[i],function(){
	    	lis[this.index].style.display='block';	    	    	
	    },function(){
	        lis[this.index].style.display='none';
	    })
	}
}
function daohanRight(floor,left,left_lis){
 	var floor=floor;
	var left=left;
	var left_lis=left_lis;
	var Return=$('.return')[0];
	var Cheight=document.documentElement.clientHeight;
	var now;
	var flag=true;
	var flag1=true;
	for (var i = 0; i < floor.length; i++) {
		floor[i].h=floor[i].offsetTop;
	};
	window.onscroll=function(){
		var obj=document.body.scrollTop?document.body:document.documentElement;
		var top=obj.scrollTop;
		// console.log(top);
		if(top>=floor[0].h-400){
			left.style.display='block';
			var Lheight=left.offsetHeight;
			left.style.top=(Cheight-Lheight)/2+'px';
			
		} 
		if(top<floor[0].h-400){
			left.style.display='none';
			
		}
		for (var i = 0; i < floor.length; i++) {
			floor[i].h=floor[i].offsetTop;
			if(top>=floor[i].h-400){
				for(var j = 0; j< left_lis.length; j++){
					left_lis[j].style.color='#5F5F5D';
				}
				left_lis[i].style.color='#C81623';
				now=i;
			};
		};
		// 返回顶层
		// Return.onclick=function(){
		// 	animate(document.body,{scrollTop:0},400)
  //   		animate(document.documentElement,{scrollTop:0},400)
		// }

    };
    // 点击楼层
    for (var i = 0; i < left_lis.length; i++) {
    	left_lis[i].index=i;
    	left_lis[i].onclick=function(){
    		animate(document.body,{scrollTop:floor[this.index].h},600)
    		animate(document.documentElement,{scrollTop:floor[this.index].h},600)
    		now=this.index;
    	};
    	// 移入移出效果
    	left_lis[i].onmouseover=function(){
    		this.style.background='#C81623';
    		this.style.color='#fff'
    	}
    	left_lis[i].onmouseout=function(){
    		if(this.index==now){
    			this.style.background='#fff';
    			this.style.color='#C81623'
    			return
    		}
    		this.style.background='#fff';
    		this.style.color='#5F5F5D'
    	}
    };
	
}
function rightDaoh(back,topImg){
	var obj=document.body.scrollTop? document.body:document.documentElement;
	var back=back;
	back.onclick=function(){			
		animate(document.body,{scrollTop:0},100);
		animate(document.documentElement,{scrollTop:0},100);
	}
	var topImg=topImg;
	for(var i=0;i<topImg.length;i++){
		hover(topImg[i],function(){
			var width=this.offsetWidth;
			this.style.background="#B1191A";
			this.style.overflow="inherit";
			var ul=$(".topImg-wenzi",this)[0];
			animate(ul,{width:80},300);
		},function(){
			var that=this;
			var ul=$(".topImg-wenzi",this)[0];
			animate(ul,{width:0},100,function(){
				that.style.background="#7A6E6E";
				that.style.overflow="hidden";
			});
		})
	}
}