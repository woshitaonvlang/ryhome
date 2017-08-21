/**
 * Created by Administrator on 2017/5/18.
 *
 * 线  铅笔 矩形 多边形 多侥幸 元
 * 填充
 */

/*onchanger

function Palette(){
    //obj -- canvas    ctx-->环境

    this.ctx[type]();
    this.ctx.stroke();
}
 ../iconfont/
arr
this.history ==[];

初始化样式*/
window.onload=function(){
    let canvas=document.querySelector('canvas');
    let ctx = canvas.getContext('2d');

    let label1=document.querySelectorAll('label');
    let tool1=document.querySelector('.tool');
    let zhixian1=document.querySelector('.zline');
    let xuline1=document.querySelector('.xuline');
    let biling1=document.querySelector('.biling'); //画笔
    let wenzi=document.querySelector('.wenzi'); //文字
    let juxing1=document.querySelector('.juxing');  //矩形
    let ca1=document.querySelector('.ca');           //橡皮
    let eraser1=document.querySelector('.eraser');  //橡皮擦
    // let duobianxing1=document.querySelector('.duobianxing');
    // let liubianxing1=document.querySelector('.liubianxing');
    let duobianxing=document.querySelector('.duobianxing1');    //多边形
    let img=document.querySelector('img');
    let input = document.querySelector('input');
    let save1 = document.querySelector('.save');
    let chexiao1 = document.querySelector('.chexiao');
    let xiazai1 = document.querySelector('.xiazai');
    let duojiaoxing1 = document.querySelector('.duojiaoxing');   //多角形
    let yuanjiao1 = document.querySelector('.yuanjiao');   //圆角矩形
    let yuanxing1 = document.querySelector('.yuanxing');   //圆
    let clear1 = document.querySelector('.clear1');   //清空
    let mask = document.querySelector('.mask');   //遮罩
    let clip = document.querySelector('.clip');   //裁切
    let clipbtn = document.querySelector('.clipbtn');   //裁切
    let xinjian = document.querySelector('.xinjian');   //新建
    let shangchuan = document.querySelector('.shangchuan');   //上传
    let fullscr = document.querySelector('.fullscr');   //全屏
    let miaocolor = document.querySelector('.miaocolor');
    let tiancolor = document.querySelector('.tiancolor');
    let miaobtn = document.querySelector('.miao');
    let tianbtn = document.querySelector('.tian');

    let palette = new Palette(canvas,mask,ctx);
    // var draw=new Draw(obj,{type:style,color:color,width:linewidth});//实例化构造函数
    miaocolor.onchange=function(){            //颜色设置
        palette.strokeStyle=this.value;
    };
    tiancolor.onchange=function(){            //颜色设置
        palette.fillStyle=this.value;
    };
    miaobtn.onclick=function(){           //描边
        palette.type = 'stroke';
    };
    tianbtn.onclick=function(){           //填充
        palette.type = 'fill';
    };
    xinjian.onclick=function(){           //新建
        palette.xinjian();
    };
    fullscr.onclick=function(){           //全屏
        palette.fullscr();
    };

    wenzi.onclick=function(){               //文字
        palette.wenzi();
    };
    tool1.onclick=function(e){
        let obj=e.target;
        if(obj.nodeName == 'LABEL'){
            for(let i=0;i<label1.length;i++){
                label1[i].style.background = '#6CA8D6';
            }
            obj.style.background = '#ffc155';
        }
    };
   // 裁切
    clip.onclick = function(){
        palette.clip(clipbtn);
    };
/*    widthchoose.onchange=function(){          //线宽选择
        linewidth=this.value;
    }*/
    yuanjiao1.onclick=function(){           //圆角矩形
        palette.yuanjiao();
    };
    duojiaoxing1.onclick=function(){        //多角形
        let n = prompt('请输入角数','5');
        palette.duojiaoxing(n*2);
    };
    yuanxing1.onclick=function(){           //圆
        palette.yuanxing();
    };
    zhixian1.onclick=function(){            //直线
        palette.zhixian();
    };
    xuline1.onclick=function(){             //虚线
        palette.xuxian();
    };
    biling1.onclick=function(){             //画笔
        palette.huabi();
    };
    juxing1.onclick=function(){             //矩形
        palette.juxing();
    };
    ca1.onclick=function(){                 //橡皮擦
        palette.ca(eraser1,20);
    };
    clear1.onclick=function(){              // 清空
        palette.clearall();
    };
   /* duobianxing1.onclick=function(){          //多边形
        palette.duobianxing(5);
    };*/
    duobianxing.onclick=function(){         //多边形
        let n = prompt('请输入边数','10');
        palette.duobianxing(Number(n));
    };
    chexiao1.onclick=function(){            //撤销
        palette.chexiao();
    };
    document.body.onkeydown=function(e){   //撤销
        if( e.ctrlKey && e.keyCode == 90 ){
            let last = arr.pop();
            ctx.putImageData(last,0,0);   //为什么这儿放的是last
        }
    };
    save1.onclick=function(){               //保存
        palette.save();
    };
    xiazai1.onclick=function(){             //下载
        palette.xiazai();
    };
    //上传
    shangchuan.onclick = function(){        //上传图片
        console.log(0)
        let files = this.files[0];      //检测上传的 文件
        let reader = new window.FileReader();  //读取上传的文件
        reader.readAsDataURL(files);
        console.log(1)
        reader.onload = function(){
            img.src = this.result;
            ctx.drawImage(img,0,0,200,200);
            img.style.display = 'block';
            console.log(2)
        }
    };
    /* shangchuan.onclick=function(){           //上传
     console.log(2)
     palette.shangchuan();
     };*/

/*    function save(){
    //        let data = canvas.toDataURL('image/png').replace(`data:image/png`,'data:stream/octet')
    //        下载
        let data = canvas.toDataURL('image/png');
        img.src = data;

    //        location.href = data;
    }*/

        /*let n=6,num=6;
        for(let i=0;i<n;i++) {
            for (let j = 0; j < num; j++) {
                //平移坐标系
                ctx.save();
                ctx.fillStyle = 'green';
                ctx.translate(10 + 30 * j, 10 + 30 * i);

                ctx.fillRect(0, 0, 20, 20);
                ctx.restore();
            }
        }*/
};

