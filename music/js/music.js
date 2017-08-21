/**
 * Created by Administrator on 2017/5/16.
 */

window.onload=function(){
/*获取audio
    获取歌名
    获取歌手

    初始化：
        传进
    设置歌名
    设置歌手
    歌曲路径 src

    歌词遍历*/
    let audio=document.querySelector('audio');
    let pre=document.querySelector('.pre');
    let play=document.querySelector('.play');
    let next=document.querySelector('.next');
    let song=document.querySelector('.song');
    let author=document.querySelector('.author');
    let lyricall=document.querySelector('.lyrics');
    let lyric1=document.querySelectorAll('.lyrics li');//歌词
    let mxia=document.querySelector('.mxia');
    let jindu=document.querySelector('.jindu');
    let timee=document.querySelector('.timee');
    let ctime=document.querySelector('.ctime');
    let ztime=document.querySelector('.ztime');
    let gname=document.querySelector('.gname');  //歌名
    let rname=document.querySelector('.rname');  //歌手名
    let mimg =document.querySelector('.middle img');
    let voice =document.querySelector('.right i');//  音量
    let volume =document.querySelector('.volume');//  音量大小
    let volumeh =document.querySelector('.volumeh');//  音量大小具体位置
    let vdot =document.querySelector('.vdot');//  音量大小控制点
    let index=0;
    // lyrics
    console.log(voice)

   /*  // vdot.
    鼠标按下  获取位置   让位置=左侧
    audio.volum = */
    /*volume.onmousedown=function(e){
        // let ox=e.offsetX;
        // volumeh.style.width=ox+'px';
        // let bili=ox/volume.offsetWidth;
        // audio.volume = bili;     //音量
        volume.onmousemove=function(e){
            let ox=e.offsetX;
            let bili=ox/volume.offsetWidth;
            volumeh.style.width=ox+'px';
            audio.volume = bili;
        }
        volume.onmouseup=function(e){
            volume.onmousemove=null;
        }

    }*/
    
    //静音
    voice.onclick=function(){
        // audio.muted=true;
        if(audio.muted){
            audio.muted = false;
            voice.classList.remove('icon-jingyin');
            voice.classList.add('icon-voice');
        }else{
            audio.muted = true;
            voice.classList.remove('icon-voice');
            voice.classList.add('icon-jingyin');
        }
    };



    //点击进度条播放
    mxia.onclick=function(e){
        let timeall=audio.duration;
        let timenow;
        obj=e.target;
        let x1=e.offsetX;
        let bili=x1/mxia.offsetWidth;
        audio.currentTime=bili*timeall;
        console.log(bili);
        jindu.style.width=mxia.offsetWidth*bili+'px'; //进度条位置
    }

    //进度条
    function jindu1(){
        let timenow=audio.currentTime;
        let timeall=audio.duration;
        let bili=timenow/timeall;
        jindu.style.width=mxia.offsetWidth*bili+'px';
    }

    play.onclick=function(){
        if(audio.paused){     //如果暂停 则播放
            init(database[index]);
            audio.play();
            play.classList.toggle('icon-bofanganniu');
        }else{                  //如果播放 则暂停
            audio.pause();
            play.classList.toggle('icon-bofanganniu');
        }
    };
    next.onclick=function(){
        next1();
    };
    function next1(){
        index++;
        if(index >= database.length){
            index=0;
        }
        init(database[index]);
        play.classList.remove('icon-bofanganniu');
        play.classList.add('icon-pause');
        audio.play();
    }
    pre.onclick=function(){
        index--;
        if(index <= 0){
            index = database.length;
        }
        init(database[index]);
        play.classList.remove('icon-bofanganniu');
        play.classList.add('icon-pause');
        audio.play();
    };

    //初始化
    // init(database[index]);
    function init(obj){
        song.innerText=obj.songs;
        author.innerText=obj.name;
        audio.src=obj.src;
        lyric1.forEach(function(value,index){
            lyric1[index].innerText=obj['lyrics'][index]['lyric'];
        });
        gname.innerText = obj.songs;  //底部栏中间部分
        rname.innerText = obj.name;
        mimg.src=obj.photo;
    }

    //歌词函数
    let i=x=0;
    audio.ontimeupdate=function(){
        let current=format(audio.currentTime);
        let timeall=format(audio.duration);
        ctime.innerText=current;
        ztime.innerText=timeall;
        let string='';

        jindu1();
        if(audio.ended){
            next1();
        }
        lyricall.innerHTML='';
        database[index].lyrics.forEach(function(value,index,obj){
            if(value.time == current){
                x = i = index;
            }
        });
        if(x<2){
            i=0;
        }else{
            i = x - 2;
        }
        for(let j=i;j<database[index].lyrics.length;j++){
            if(j == x){
                string+=`
                    <li class="hot">${database[index].lyrics[j].lyric}</li>
                `
            }else{
                string+=`
                    <li>${database[index].lyrics[j].lyric}</li>
                `
            }
        }
        lyricall.innerHTML = string;
        // console.log(lyricall.innerHTML);
        // 获取歌词 遍历 获取下标
        // 让他的string  = 下标对相应的那句歌词
    };


    //格式化时间
    function format(time){
        let min=Math.floor(time/60)<10 ? '0'+Math.floor(time/60) : Math.floor(time/60);
        let s=Math.floor(time%60)<10 ? '0'+Math.floor(time%60) : Math.floor(time%60);
        return `${min}:${s}`;
    }
};
