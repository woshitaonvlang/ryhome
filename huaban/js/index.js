/**
 * Created by Administrator on 2017/5/18.
 */



function Palette(obj,mask,ctx){
    //之前：mask -- canvas    ctx-->环境   现在：mask -- mask
    this.mask=mask;
    this.obj = obj;
    this.ctx=ctx;
    // 属性
    this.lineWidth = 1;
    this.lineCap = 'round';   //round圆  square方  butt无
    //填充  描边  默认是描边
    this.type = 'stroke';
    this.fillStyle = '#000';
    this.strokeStyle = '#000';
    //字体
    this.text = 'bold 30px 宋体';
    this.textAlign = 'center';
    this.textBaseline = 'middle';
    //宽高
    this.width = obj.width;
    this.height = obj.height;
    //历史记录
    this.arr=[]; //history
    this.arr.push(this.ctx.getImageData(0, 0, obj.width, obj.height));
    // this.setLineDash([4,2]);            //虚线
    this.flagnum=true;

}

Palette.prototype={
    //初始化
    init:function(){
        this.ctx.lineWidth = this.lineWidth;
        this.ctx.strokeStyle = this.strokeStyle;     //OK
        this.ctx.fillStyle = this.fillStyle;        //OK
        this.ctx.lineCap = this.lineCap;
        // this.ctx[type]();
        // self[type]();
    },
    //撤销
    chexiao:function(){
        if(this.arr.length === 1){
            this.ctx.clearRect(0, 0, this.width, this.height);
            this.arr = [];
            this.arr.push(this.ctx.getImageData(0, 0, this.width, this.height));
            console.log(this.arr)
        }else{
            let last = this.arr.pop();
            this.ctx.putImageData(last,0,0);
        }
    },
    //保存
    save:function(){
        let data = this.obj.toDataURL('image/png');
        // this.img.src = data;
    },
    //新建
    xinjian:function(){
        this.ctx.clearRect(0,0,this.width,this.height);
        console.log(1);
        this.lineWidth = 1;
        this.lineCap = 'round';   //round圆  square方  butt无
        this.type = 'stroke';
        this.fillStyle = '#000';
        this.strokeStyle = '#000';
        this.text = 'bold 30px 宋体';
        this.arr=[]; //history
        this.arr.push(this.ctx.getImageData(0, 0, this.width, this.height));
    },
    //清空
    clearall:function(){
        this.ctx.clearRect(0, 0, this.width, this.height);
        this.arr=[];
        console.log(this.arr);
        this.arr.push(this.ctx.getImageData(0, 0, this.width, this.height));
        console.log(this.arr)
        // self.ctx.putImageData(self.arr[self.arr.length - 1], 0, 0);
    },
    //下载
    xiazai:function(){
        let data = this.obj.toDataURL('image/png').replace(`data:image/png`,'data:stream/octet');
        location.href=data;
    },
    //全屏
    fullscr:function(){
        if(this.flagnum){
            document.documentElement.webkitRequestFullscreen();
            this.flagnum = !this.flagnum;
        }else if(!this.flagnum){
            document.webkitCancelFullScreen();
            this.flagnum = !this.flagnum;
        }
    },
  /*  xiazai:function(){
        let data = this.mask.toDataURL('image/png');
        let img = new Image;
        img.src = data;
        img.onload = function(){
            console.log(2)
            // box.appendChild(img);
            let a= document.createElement('a');
            a.href = data;
            a.download = 'tupian.png';   //下载
            // location.href = data;
            // location.download = 'tupian.png';   //下载
            // box.appendChild(a);
        }
        // location.href = data;
    },*/
    //圆角矩形
    yuanjiao:function(){
        let self = this;
        self.mask.onmousedown=function(e) {
            let ox = e.offsetX, oy = e.offsetY;    //圆心 x ，y
            self.mask.onmousemove = function (e) {
                self.init();
                let mx = e.offsetX, my = e.offsetY;   //移动到
                let num1=mx-ox;
                let num2=my-oy;
                let num3=num2>=num1?num1:num2;
                num=num3/10;
                self.ctx.clearRect(0, 0, self.width, self.height);
                if (self.arr.length > 0) {
                    self.ctx.putImageData(self.arr[self.arr.length - 1], 0, 0);
                }
                self.ctx.beginPath();
                self.ctx.moveTo(ox+num,oy);
                self.ctx.lineTo(mx-num,oy);
                self.ctx.quadraticCurveTo(mx,oy,mx,oy+num);
                self.ctx.lineTo(mx,my-num);
                self.ctx.quadraticCurveTo(mx,my,mx-num,my);
                self.ctx.lineTo(ox+num,my);
                self.ctx.quadraticCurveTo(ox,my,ox,my-num);
                self.ctx.lineTo(ox,oy+num);
                self.ctx.quadraticCurveTo(ox,oy,ox+num,oy);
                self.ctx.closePath();
                self.ctx[self.type]();//选择 填充、描边类型
            }
        };
        self.mask.onmouseup = function () {
            self.arr.push(self.ctx.getImageData(0, 0, self.width, self.height));
            self.mask.onmousemove=null;
        }
    },
    //多角形
    duojiaoxing:function(bian){
        let self = this;
        self.mask.onmousedown=function(e) {
            let ox = e.offsetX, oy = e.offsetY;    //圆心 x ，y
            let angel = (360/bian)*Math.PI/180;
            self.mask.onmousemove = function (e) {
                self.init();
                let mx = e.offsetX, my = e.offsetY;   //移动到
                let radius = Math.sqrt((mx-ox)*(mx-ox)+(my-oy)*(my-oy));//半径
                let radius1=radius/2;
                self.ctx.clearRect(0,0,this.width,this.height);
                if(self.arr.length>0){
                    self.ctx.putImageData(self.arr[self.arr.length-1],0,0);
                }
                self.ctx.beginPath();
                self.ctx.moveTo(ox+radius,oy);
                let x1,y1;
                for(let i=0;i<bian;i++){
                    if(i%2 == 0){
                        x1 =radius*Math.cos(angel*i);
                        y1 =radius*Math.sin(angel*i);
                    }else{
                        x1 =radius1*Math.cos(angel*i);
                        y1 =radius1*Math.sin(angel*i);
                    }
                    self.ctx.lineTo(ox+x1,oy+y1);

                }
                self.ctx.closePath();
                self.ctx[self.type]();//选择 填充、描边类型
            };
            self.mask.onmouseup = function () {
                self.arr.push(self.ctx.getImageData(0, 0, self.width, self.height));
                self.mask.onmousemove=null;
                self.mask.onmouseup=null;
            }
        }
    },
    //圆
    yuanxing:function(){
        let self = this;
        self.mask.onmousedown=function(e) {
            let ox = e.offsetX, oy = e.offsetY;    //圆心 x ，y
            self.mask.onmousemove = function (e) {
                self.init();
                let mx = e.offsetX, my = e.offsetY;   //移动到
                let radius = Math.sqrt((mx - ox) * (mx - ox) + (my - oy) * (my - oy));//半径
                self.ctx.clearRect(0, 0, this.width, this.height);
                if (self.arr.length > 0) {
                    self.ctx.putImageData(self.arr[self.arr.length - 1], 0, 0);
                }
                self.ctx.beginPath();
                self.ctx.moveTo(ox + radius, oy);
                self.ctx.arc(ox, oy, radius, 0, Math.PI * 2, false);
                self.ctx[self.type]();//选择 填充、描边类型
            };
            self.mask.onmouseup = function () {
                self.arr.push(self.ctx.getImageData(0, 0, self.width, self.height));
                self.mask.onmousemove=null;
            }
        }
    },
    //多边形
    duobianxing : function(n){
        let langel=(360/n);              //角度转为弧度
        let self = this;
        self.mask.onmousedown=function(e){
            let ox=e.offsetX,oy=e.offsetY;    //圆心 x ，y
            self.mask.onmousemove=function(e){
                self.init();
                let mx=e.offsetX,my=e.offsetY;   //移动到
                let radius=Math.sqrt((mx-ox)*(mx-ox)+(my-oy)*(my-oy));
                self.ctx.clearRect(0,0,this.width,this.height);
                if(self.arr.length > 0){
                    self.ctx.putImageData(self.arr[self.arr.length-1],0,0)
                }
                self.ctx.beginPath();
                self.ctx.moveTo(ox+radius,oy);
                for(let i=0;i<n;i++){
                    let hudu=(Math.PI/180)*langel*i;
                    self.ctx.lineTo(ox+radius*Math.cos(hudu),oy+radius*Math.sin(hudu));
                }
                self.ctx.closePath();
                self.ctx[self.type]();//选择 填充、描边类型
            };
            self.mask.onmouseup=function(){
                self.arr.push(self.ctx.getImageData(0,0,self.width,self.height));
                self.mask.onmousemove=null;
            }
        }
    },
    //画笔
    huabi:function(){
        this.mask.onmousedown = function(e){
            let ox = e.offsetX,oy = e.offsetY;
            // this.ctx.beginPath();
            this.ctx.moveTo(ox,oy);
            this.ctx.clearRect(0,0,this.width,this.height);  //清空画布
            if(this.arr.length>0){
                this.ctx.putImageData(this.arr[this.arr.length-1],0,0)
            }
            this.ctx.beginPath();
            this.mask.onmousemove = function(e){    //画笔
                this.init();
                let mx = e.offsetX, my = e.offsetY;
                this.ctx.lineTo(mx,my);   //划线
                this.ctx[this.type]();
            }.bind(this);
            this.mask.onmouseup = function(){
                this.arr.push(this.ctx.getImageData(0,0,this.width,this.height));
                this.ctx.closePath();
                this.mask.onmousemove = null;
                this.mask.onmouseup = null;
            }.bind(this)
        }.bind(this);
    },
    //  画直线
    zhixian:function(){
        let self = this;
        this.mask.onmousedown = function(e){
            let ox = e.offsetX,oy = e.offsetY;
            self.mask.onmousemove = function(e){
                self.init();
                // console.log(self.arr.length)
                let mx = e.offsetX, my = e.offsetY;
                self.ctx.clearRect(0,0,this.width,this.height);  //清空画布
                if(self.arr.length > 0){
                    self.ctx.putImageData(self.arr[self.arr.length-1],0,0);
                }
                self.ctx.beginPath();
                self.ctx.moveTo(ox,oy);
                self.ctx.lineTo(mx,my);   //划线
                self.ctx.closePath();
                self.ctx[self.type]();//选择 填充、描边类型
            };
            self.mask.onmouseup = function(){
                self.arr.push(self.ctx.getImageData(0,0,self.width,self.height));
                self.mask.onmousemove = null;
                self.mask.onmouseup = null;
            }
        };
    },
    //  画虚线
    xuxian:function(){
        let self = this;
        this.mask.onmousedown = function(e){
            let ox = e.offsetX,oy = e.offsetY;
            self.mask.onmousemove = function(e){
                self.init();
                let mx = e.offsetX, my = e.offsetY;
                self.ctx.clearRect(0,0,this.width,this.height);  //清空画布
                self.ctx.save();
                if(self.arr.length > 0){
                    self.ctx.putImageData(self.arr[self.arr.length-1],0,0)
                }
                self.ctx.beginPath();
                self.ctx.moveTo(ox,oy);
                self.ctx.lineTo(mx,my);   //划线
                self.ctx.setLineDash([4, 6]);
                self.ctx.closePath();
                self.ctx[self.type]();//选择 填充、描边类型
                self.ctx.restore();
            };
            self.mask.onmouseup = function(){
                self.arr.push(self.ctx.getImageData(0,0,self.width,self.height));
                self.mask.onmousemove = null;
                self.mask.onmouseup = null;
            }
        };
    },
    //画矩形
    juxing:function(){
        let self = this;
        this.mask.onmousedown = function(e){
            let ox = e.offsetX,oy = e.offsetY;
            this.mask.onmousemove = function(e){
                this.init();
                let mx = e.offsetX, my = e.offsetY;
                this.ctx.clearRect(0,0,this.width,this.height);  //清空画布
                if(this.arr.length > 0){
                    this.ctx.putImageData(this.arr[this.arr.length-1],0,0);
                }
                this.ctx.beginPath();
                this.ctx.rect(ox,oy,mx-ox,my-oy);    //画四边形
                this.ctx.closePath();
                this.ctx[self.type]();//选择 填充、描边类型
            }.bind(this);
            this.mask.onmouseup = function(){
                this.arr.push(this.ctx.getImageData(0,0,this.width,this.height));
                this.mask.onmousemove = null;
//            this.mask.onmouseup = null;
            }.bind(this)
        }.bind(this);
    },
    //橡皮擦
    ca:function(eraser,w){
        let self = this;
        self.ctx.save();
        self.mask.onmousedown=function(e){   // 橡皮擦
            self.mask.onmousemove=function(e){
                eraser.style.display ='block';
                eraser.style.width = w + 'px';
                eraser.style.height = w + 'px';
                let mx=e.offsetX,my=e.offsetY;
                eraser.style.left =mx+'px';
                eraser.style.top =my+'px';
                self.ctx.clearRect(mx,my,20,20);
            };
            self.mask.onmouseup=function(){
                self.arr.push(self.ctx.getImageData(0,0,self.width,self.height));
                self.ctx.restore();
                self.mask.onmousemove = null;
                eraser.style.display ='none';
            }
        }
    },
    //字体
  /*  font:function(eraser){
        this.maxk.onmousedown=function(e){
            let ox = e.offsetX,oy = e.offsetY;
            let div = document.createElement('div');
            div.style.cssText = `
                width:20px;
                height:20px;
                border:1px solid #000;
            `;
            div.contentEditable = true;
            self.mask.appendChild(div);
            self.mask.onmousedown = null;///////////////////////////////////////////////
            self.area = div;
            self.area.onmousedown = function(e){
                let ox = e.clientX - this.offsetLeft;
                let oy = e.offsetY - this.offsetTop;
                this.mask.onmousemove=function(e){
                    let cx = e.clientX;
                    let cy = e.offsetY;
                    let lefts = cx-ox;
                    let tops = cy - oy;
                    self.area.style.left = lefts + 'px';
                    self.area.style.top = tops + 'px';

                }.bind(this);
            };
            self.area.onmouseup=function() {
                self.mask.onmousemove = null;
                self.area.onmouseup = null;
            };
            self.area.onblur =function(){
                this.ctx.font = this.text;
                this.ctx.textAlign = this.textAlign;
                this.ctx.textBaseline = this.textBaseline;
                this.ctx.fillText(this.innerText,this.offsetLeft,this.offsetTop);
                this.parentNode.removeChild(this);
                self.area = null;
            };
        }.bind(this);
    }*/
    wenzi:function() {
        let self = this;
        self.mask.onmousedown = function (e){
            let ox=e.offsetX,oy=e.offsetY;
            let div=document.createElement('div');
            div.style.cssText=`
                min-width:50px;
                height:auto;
                position:absolute;
                left:${ox}px;
                top:${oy}px;
                background:#fff;
            `;
            div.focus();//立即获取焦点
            div.contentEditable = true;
            self.mask.appendChild(div);
            self.mask.onmousedown=null;
            self.area = div;
            //把事件添加到div上
            self.area.onmousedown=function(e){
                let ox=e.clientX-this.offsetLeft, oy=e.clientY-this.offsetTop;
                self.mask.onmousemove=function(e){
                    if(self.arr.length>0){
                        self.ctx.putImageData(self.arr[self.arr.length-1],0,0);
                    }
                    let cx=e.clientX,cy=e.clientY;
                    let lefts=cx-ox,tops=cy-oy;
                    self.area.style.left=`${lefts}px`;
                    self.area.style.top=`${tops}px`;
                }
                self.area.onmouseup=function(){
                    self.area.onmouseup=null;
                    self.mask.onmousemove=null;
                }
            }
            self.area.onblur=function(){
                //打字
                self.ctx.font=self.font;
                self.ctx.textAlign==self.textAlign;
                self.ctx.textBaseline=self.textBaseline;
                self.ctx.fillText(this.innerText,this.offsetLeft,this.offsetTop);
                this.parentNode.removeChild(this);
                self.area=null;
                self.arr.push(self.ctx.getImageData(0,0,self.width,self.height))
            }
        }
    },
    // 裁切
    clip:function(clipbtn){
        var self = this;
        self.init();
        self.clipbtn = clipbtn;
        self.mask.onmousedown = function(e){
            var ox = e.offsetX;
            var oy = e.offsetY;
            var minx,miny,w,h;
            self.init();////////////////////////////////////
            self.mask.onmousemove = function(e){
                self.init();////////////////
                var cx = e.offsetX, cy = e.offsetY;
                minx =cx>=ox?ox:cx;
                miny =cy>=oy?oy:cy;
                w = Math.abs(cx-ox);
                h = Math.abs(cy - oy);
                clipbtn.style.cssText = `
                    width:${w}px;
                    height:${h}px;
                    position:absolute;
                    top:${miny}px;
                    left:${minx}px;
                    border:2px dashed #000;
                    background:red;
                `;
            };
            self.mask.onmouseup = function(){
                self.mask.onmousemove = null;
                self.mask.onmouseup = null;
                self.temp = self.ctx.getImageData(minx,miny,w,h);
                self.ctx.clearRect(minx,miny,w,h);  //清空画布
                self.arr.push(self.ctx.getImageData(0,0,self.width,self.height));
                self.ctx.putImageData(self.temp,minx,miny);
                self.drag(minx,miny,w,h,clipbtn);
            }
        }
    },
    drag:function(x,y,w,h,clipbtn){
        var self = this;
        self.mask.onmousemove = function(e){
            var ox = e.offsetX,oy = e.offsetY;
            if(ox > x && ox< w+x && oy > y && oy < h + y){
                self.mask.style.cursor = 'move';
            }else{
                self.mask.style.cursor = 'default';
            }
        };
        self.mask.onmousedown = function(e) {
            var ox = e.offsetX, oy = e.offsetY;
            //鼠标相对于div左上角的位置
            var cx = ox - x, cy = oy - y;
            if (ox > x && ox < w + x && oy > y && oy < h + y) {
                self.mask.style.cursor = 'move';
            } else {
                self.mask.style.cursor = 'default';
                return;
            }
            self.mask.onmousemove = function (e) {
                self.ctx.clearRect(0, 0, self.width, self.height);
                if (self.arr.length != 0) {
                    self.ctx.putImageData(self.arr[self.arr.length - 1], 0, 0)
                }
                var endx = e.offsetX;
                var endy = e.offsetY;
                var left = endx - cx;
                var top = endy - cy;
                if (left < 0) {
                    left = 0;
                }
                if (left > self.width - w) {
                    left = self.width - w
                }

                if (top < 0) {
                    top = 0;
                }
                if (top > self.height - h) {
                    top = self.height - h
                }
                clipbtn.style.left = left + 'px';
                clipbtn.style.top = top + 'px';
                x = left;
                y = top;
                self.ctx.putImageData(self.temp, left, top);
            }
            self.mask.onmouseup = function () {
                self.arr.push(self.ctx.getImageData(0, 0, self.width, self.height));
                self.mask.onmouseup = null;
                self.mask.onmousemove = null;
                self.drag(x, y, w, h, clipbtn);
            }
        }
    }

};



