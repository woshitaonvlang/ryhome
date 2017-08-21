/**
 * Created by Administrator on 2017/5/16.
 */
window.onload=function(){
    let audio=document.querySelector('audio');
    let gm=document.querySelector('.gm');
    let gs=document.querySelector('.gs');
    let lyrics=document.querySelector('.lyrics');
    let qj=document.querySelector('.qj');
    let ht=document.querySelector('.ht');
    let zj=document.querySelector('.zj');
    let t1=document.querySelector('.t1');
    let t2=document.querySelector('.t2');
    let gec=document.querySelector('.gec');
    let prot1=document.querySelector('.prot1');
    let img=document.querySelectorAll('.img');
    let sy=document.querySelector('.sy');
    let sy1=document.querySelector('.sy1');
    let syy=document.querySelector('.syy');
    let yl=document.querySelector('.yl');

   // console.log(sy);




// 声音
    syy.onmousedown=function(e){
                 let ox=e.offsetX;
         syy.onmousemove=function(e){
                    let bx=sy1.offsetLeft;
                    let cx=e.clientX;
                    // 鼠标相对于事件源位置
                    let lefts=cx-ox-bx;
                    // console.log(lefts);
                if(lefts>ox-10&&lefts<ox+110){
                    syy.style.left=lefts+'px';
                    sy1.style.width=lefts+8+'px';
                    // audio.valume=lefts/100;
                 }
    }
    syy.onmouseup=function(){
            syy.onmousemove=null;
            syy.onmouseup=null;
        }
}





// 声音2
    sy.onmousedown=function(e){
            let ox=e.offsetX;
            let bx=sy1.offsetLeft;
            let cx=e.clientX;
            let lefts=cx-ox-bx;
            if(lefts>ox-10&&lefts<ox+110){
                syy.style.left=lefts+'px';
                sy1.style.width=lefts+8+'px';
                audio.volume=lefts/120;
        }
    }






    let index=0;
    load(database[index]);

    function load(obj){
        let lj='';
        gm.innerText=obj.songs;
        gs.innerText=obj.name;
        audio.src=obj.src;
        t1.innerText="00:00";
        gec.innerText=`${obj.songs}-${obj.name}`;

        t2.innerText=obj.alltime;


         obj.lyrics.forEach(function(value,index){
             lj+=`
             <li>${value.lyric}</li> 
              `
         })
        lyrics.innerHTML='';
        lyrics.innerHTML=lj;
    }



    let z=x=0;
    audio.ontimeupdate=function(){
        let time2=times(audio.currentTime);
        let time1=times(audio.duration);
        prot1.style.width=audio.currentTime/audio.duration*100+'%';
        t1.innerText=time2;
        t2.innerText=database[index].alltime;

        // 歌词
        let string='';

        database[index]['lyrics'].forEach(function(value,index){
               if(value.time==time2) {
                   x = z = index;
               }
        })
        if(z<2){
            x=0;
        }
        else{
            x=z-2;
        }

        for(let j=x;j<database[index]['lyrics'].length;j++){
            if(j==z){
                string+=`
              <li  class="hot"> 
                  ${database[index]['lyrics'][j]['lyric']}
              </li>                                       
             `
            }else{
                string+=`
              <li > 
                  ${database[index]['lyrics'][j]['lyric']}
              </li>                                       
             `
            }
        }
        lyrics.innerHTML='';
        lyrics.innerHTML=string;

    }

    function times(time){
        let m=Math.floor(time/60)>=10? Math.floor(time/60):'0'+Math.floor(time/60);
        let s=Math.floor(time%60)>=10? Math.floor(time%60):'0'+Math.floor(time%60);
        return `${m}:${s}`;
    }


// 后退
    ht.onclick=function(){
        index--;
        if(index<=0){
            index=database.length-1;
            lyrics.innerHTML='';
            lj='';
            load(database[index]);
            audio.play();
            x=z=0;
            prot1.style.width=audio.currentTime/audio.duration*100+'%';
            zj.className='iconfont icon-play1 zj icon-pause4';
            lyrics.innerHTML=lj;
        }
        else{
            lj='';
            lyrics.innerHTML='';
            load(database[index]);
            audio.play();
            x=z=0;
            prot1.style.width=audio.currentTime/audio.duration*100+'%';
            zj.className='iconfont icon-play1 zj icon-pause4';
            lyrics.innerHTML=lj;
        }
        for(let i=0;i<img.length;i++){
            img[i].style.display='none';
            img[index].style.display='block';
        }
    }
// 前进
    qj.onclick=function(){
        index++;
        if(index>=6){
            index=0;
            lyrics.innerHTML='';
            lj='';
            load(database[index]);
            audio.play();icon-pause4
            x=z=0;
            prot1.style.width=audio.currentTime/audio.duration*100+'%';
            zj.className='iconfont icon-play1 zj icon-pause4';
            lyrics.innerHTML=lj;
        }
        else{
            lyrics.innerHTML='';
            lj='';
            load(database[index]);
            audio.play();
            x=z=0;
            prot1.style.width=audio.currentTime/audio.duration*100+'%';
            zj.className='iconfont icon-play1 zj icon-pause4';
            lyrics.innerHTML=lj;
        }
        for(let i=0;i<img.length;i++){
            img[i].style.display='none';
            img[index].style.display='block';
        }
    }
// 暂停 播放
    zj.onclick=function(){
        if(audio.paused){
            audio.play();
            zj.classList.toggle('icon-pause4');
        }
        else{
            audio.pause();
            zj.classList.toggle('icon-pause4');
        }
    }

    // 声音
     yl.onclick=function(){
         if(audio.paused){
             audio.play();
             zj.classList.toggle('icon-pause4');
         }
         else{
             audio.pause();
             zj.classList.toggle('icon-pause4');
         }
     }


// 结束
    /* function end(){
     if(audio.ended){
     index++;
     for(let i=0;i<img.length;i++){
     img[i].style.display='none';
     img[index].style.display='block';
     }
     }
     load(database[index]);
     }*/

    audio.addEventListener('ended',function(){
        index++;
        if(index>=6){
            index=database.length-1;
            lyrics.innerHTML='';
            lj='';
            load(database[index]);
            audio.play();
            prot1.style.width=audio.currentTime/audio.duration*100+'%';
            zj.className='iconfont icon-play1 zj icon-pause4';
            lyrics.innerHTML=lj;
        }
        for(let i=0;i<img.length;i++){
            img[i].style.display='none';
            img[index].style.display='block';
        }
        zj.className='iconfont icon-play1 zj icon-pause4';
        load(database[index]);
    },false);





}