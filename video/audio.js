window.onload = function () {
    let audio = document.querySelector('audio');
    let song = document.querySelector('.song');
    let author = document.querySelector('.author');
    let lyrics = document.querySelector('.lyrics');
    let playBtn = document.querySelector('.play');
    let son = document.querySelector('.son');
    console.log(son)
    let prevBtn = document.querySelector('.prev');
    let nextBtn = document.querySelector('.next');
    let img = document.querySelector('img');
    let info = document.querySelector('.info');
    let cTime = document.querySelector('.cTime');
    let dTime = document.querySelector('.dTime');

    let love = document.querySelector('.love');
    let like = document.querySelector('.like');
    let download = document.querySelector('.xiazai')

    let index = 0;


    render(database[0]);

    //收藏
    love.onmouseenter = function () {
        like.style.display = 'block';
        love.style.color = 'red';
    }
    love.onmouseleave = function () {
        like.style.display = 'none'
    }
    //下载
    download.click = function () {
        console.log(a)
    }
    //  暂停 播放
    playBtn.onclick = function () {
        if (audio.paused) {
            audio.play();
            playBtn.classList.toggle('icon-pause');
        } else {
            audio.pause();
            playBtn.classList.toggle('icon-pause');
        }
    }

    let i = x = 0;

    audio.ontimeupdate = function () {
        let current = format(audio.currentTime);
        let duration = format(audio.duration);
        let string = ''
        cTime.innerText = current;
        dTime.innerText = duration;
        let c = audio.currentTime;
        let d = audio.duration;
        son.style.width = c / d * 100 + '%';
        lyrics.innerHTML = '';
        // id: "0", songs: "阴天", name: "莫文蔚", src: "music/阴天.mp3",
        // alltime:"04:02", photo: "images/mww.jpg", lyrics: [ {time: "00:02", lyric: "阴天"},
        //j是现在这个时间点显示的，x是整首歌的每句歌词下标,i是现在正在显示的

        database[index]['lyrics'].forEach(function (value, aa) {
            if (value.time == current) {
                x = i = aa;
            }
        })
        if (x < 2) {
            i = 0
        } else {
            i = x - 2;
        }
        //当前歌曲 database[index]  当前歌曲所有歌词  database[index]['lyrics']
        //当前歌曲的某一条歌词   database[index]['lyrics'][j]['lyric']

        for (let j = i; j < database[index]['lyrics'].length; j++) {
            if (j == x) {
                string += `
             <li class="hot">
                ${database[index]['lyrics'][j]['lyric']}
             </li>`;
            } else {
                string += `
             <li >
                ${database[index]['lyrics'][j]['lyric']}
             </li>`;
            }
        }
        lyrics.innerHTML = string;

        if (audio.ended) {
            index++;
            if (index > 5) {
                index = 0;
            }
            render(database[index]);
            audio.play();
        }
    }
    //时间格式化

    function format(time) {
        let m = Math.floor(time / 60) < 10 ? '0' + Math.floor(time / 60) : Math.floor(time / 60);
        let s = Math.floor(time % 60) < 10 ? '0' + Math.floor(time % 60) : Math.floor(time % 60);
        return (`${m}:${s}`);
    }

    //     初始化
    function render(obj) {
        let string = '';
        // song  author   lyrics>li  audio(src)
        // id: "0", songs: "阴天", name: "莫文蔚", src: "music/阴天.mp3",
        // alltime:"04:02", photo: "images/mww.jpg", lyrics: [ {time: "00:02", lyric: "阴天"},
        song.innerText = obj.songs;
        author.innerText = obj.name;
        audio.src = obj.src;

        info.innerText = `${obj.songs} - ${obj.name}`;
        img.src = obj.photo;
        cTime.innerText = '00:00';
        dTime.innerText = obj.alltime;

        //    歌词
        obj.lyrics.forEach(function (value, index) {
            //   {time: "00:04", lyric: "莫文蔚"},
            string += `<li>${value.lyric}</li>`
        })
        lyrics.innerHTML = '';
        lyrics.innerHTML = string;
    }

    nextBtn.onclick = function () {
        index++;
        if (index > database.length) {
            index = 0;
        }
        render(database[index])
    }
    prevBtn.onclick = function () {
        index--;
        if (index < 0) {
            index = database.length;
        }
        render(database[index])
    }


}