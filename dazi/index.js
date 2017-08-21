/**
 * Created by lenovo on 2017/5/10.
 */
/*
*   属性    a-z 个数 速度  成绩 生命  时间
 *   方法   产生  掉  消除  重新开始  next   checkposition  checkrepeat  img  关卡
* */
function Game(){
    /*this.charArr=[
          'Q','W','E','R','T','Y','U','I','O','P',
            'A','S','D','F','G','H','J','K','L',
                'Z','X','C','V','B','N','M'
     ];*/
    this.charArr=[];
    for(let i=0;i<26;i++){
       let content=String.fromCharCode(Math.floor(Math.random()*26)+65);
       this.charArr.push(content);
        // console.log(this.charArr)
    }
    this.charLength=5;
    this.cw=window.innerWidth;
    this.ch=window.innerHeight;
    this.currentEle=[];
    this.currentpos=[];
    this.speed=10;
    this.gq=10;
    this.guanqiaElement=document.querySelector('.guanqia');
    this.guanqia=1;
    this.smElement=document.querySelector('.sm1');
    this.sm=100;
    this.scoreElement=document.querySelector('.score');
    this.score=0;
}
Game.prototype={
    // 创建元素
    start:function(){
        this.getElements(this.charLength);
        this.drop();
        this.key();
        // this.restart();
        // this.next();
    },
    // 创建多少个   创建哪些  （变量）   产生随机数的长度
    getElements:function(length){
        for(let i=0;i<length;i++){
            this.getChar();
        }
    },
    // 获取字符  去重
    checkRepeat:function(text){
       return this.currentEle.some(function(value){
            return value.innerText===text
        })
    },
    checkPosition:function(lefts){
        return this.currentpos.some(function(value){
            return value+100>lefts && lefts+100>value;
        })
    },
    getChar:function(){
        //this.charArr=['Q','img']
        let num=Math.floor(Math.random()*this.charArr.length);
        //num  重复 this.charArr[num]   this.currentEle[i].innerText
        while(this.checkRepeat(this.charArr[num])){
           num=Math.floor(Math.random()*this.charArr.length);
        }
        let ele=document.createElement('div');
        let tops=Math.random()*100,lefts=Math.random()*(this.cw-400)+200;
        while(this.checkPosition(lefts)){
            lefts=Math.random()*(this.cw-400)+200;
        }
        ele.style.cssText=`
            width:80px;
            height:100px;
            background-image:url('img/yun.png');
            background-position:center center;
            background-size:80px 100px;
            font-size:26px;
            color:yellow;
            text-align:center;
            line-height:55px;
            position:absolute;
            top:${tops}px;
            left:${lefts}px;
        `;
        ele.innerText=this.charArr[num];
        document.body.appendChild(ele);
            this.currentEle.push(ele);
            this.currentpos.push(lefts);
    },
    //保存元素
    drop:function(){
        let self=this;
        //  时间函数停掉   以后会用  变成属性  不是变量
        self.t=setInterval(function(){
            for(let i=0;i<self.currentEle.length;i++){
                //掉   获取当前位置  加上步径值  把步径值设为属性值方便以后修改
                let tops=self.currentEle[i].offsetTop+self.speed;
                self.currentEle[i].style.top=tops+'px';
                    if(tops>500){
                    //在界面中消失   在数组中移除  splice(index,1,ele)
                    document.body.removeChild(self.currentEle[i]);
                    self.currentEle.splice(i,1);
                    self.currentpos.splice(i,1);
                    self.sm-=10;
                    self.smElement.style.width=self.sm+'px';
                    // console.log(self.sm)???????????????????
                //    重新开始
                    if(self.smElement.style.width===0+'px'){
                    //    选择是否继续
                        let flag=window.confirm('游戏结束，是否重新开始');
                        if(flag){
                            self.restart()
                        }else{
                            close();
                        }
                    }
                }
            }
            // 如果当前界面中显示的长度小于规定数，再继续产生
            if(self.currentEle.length<self.charLength){
                self.getChar();
            }
        },300)
    },
    key:function(){
        document.body.onkeydown=function(e){
        //    e.keycode 65 66 67    ele.innerHTML  A B C
            let code=String.fromCharCode(e.keyCode);
            for(let i=0;i<this.currentEle.length;i++){
                if(code===this.currentEle[i].innerText){
                    document.body.removeChild(this.currentEle[i]);
                    this.currentEle.splice(i,1);
                    this.currentpos.splice(i,1);
                    this.score++;
                    this.scoreElement.innerText=this.score;
                //    进入下一关
                    if(this.score===this.gq){
                        this.next();
                    }
                }
            }
            if(this.currentEle.length<this.charLength){
                this.getChar();
            }
        }.bind(this);
    },
    restart:function(){
    //    初始状态
        /*
             停下    页面元素删除  数据清空  生命10 分数0  start
         */
        clearInterval(this.t);
        for(let i=0;i<this.currentEle.length;i++){
            document.body.removeChild(this.currentEle[i]);
        }
        this.currentEle=[];
        this.currentpos=[];
        this.sm=100;
        this.smElement.style.width=this.sm+'px';
        this.score=0;
        this.scoreElement.innerText=this.score;
        this.start();
    },
    next:function(){
        /*
         停下    页面元素删除  数zu清空  关卡  生命 分数  start
         */
        clearInterval(this.t);
        for(let i=0;i<this.currentEle.length;i++){
            document.body.removeChild(this.currentEle[i]);
        }
        this.currentEle=[];
        this.currentpos=[];
        this.charLength++;
        this.speed+=1;
        this.sm++;
        this.gq+=10;
        this.guanqia++;
        this.guanqiaElement.innerText=this.guanqia;
        this.start();
    }
}