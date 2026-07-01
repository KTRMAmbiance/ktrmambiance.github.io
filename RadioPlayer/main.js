let loadedrn = false;
let playingrn = false;
let currentstation;

var stations = {
    statname: [],
    statsource: [],
    playingtitle: []
};

window.onload = function() {
    const currenttime = new Date();
    if (currenttime.getHours() >= 22 || currenttime.getHours() < 7) {
        document.body.style.backgroundImage = "url('bg/night_full.png')";
    }
    else if (currenttime.getHours() >= 18) {
        document.body.style.backgroundImage = "url('bg/sunset_full.png')";
    }
    else if (currenttime.getHours() >= 13) {
        document.body.style.backgroundImage = "url('bg/daytime_full.png')";
    }
    else {
        document.body.style.backgroundImage = "url('bg/morning_full.png')";
    }
    
    for (i=1; i<=stationcount; i++) {
        document.getElementById("statName" + i).innerHTML = stations.statname[i];
    }
    initVolume();
}

function playRadioStation(num) {
    initCanvasPre();
    for (i=1; i<=stationcount; i++) {
        document.getElementById("stationItem" + i).style.background = "none";
        document.getElementById("playing" + i).style.display = "none";
        document.getElementById("playbutton" + i).innerHTML = ">";
    }

    document.getElementById("stationItem" + num).style.background = "rgba(255, 255, 255, 0.2)";
    document.getElementById("playing" + num).style.display = "block";
    document.getElementById("statdisplayname").innerHTML = stations.statname[num];
    document.getElementById("mainplayer").src = stations.statsource[num];

    if (currentstation != num) {
        loadedrn = false;
        playingrn = false;
    }

    if (loadedrn == false) {
        document.getElementById("rplayer").load();
        loadedrn = true;
    }

    if (loadedrn == true) {
        if (playingrn == false) {
            document.getElementById("rplayer").play();
            document.getElementById("playbutton" + num).innerHTML = "||";
            setInterval(document.getElementById("songtitle").src = stations.playingtitle[num], 100);
            playingrn = true;
        }
        else {
            document.getElementById("rplayer").pause();
            document.getElementById("playbutton" + num).innerHTML = ">";
            playingrn = false;
        }
    }

    currentstation = num;

    function updatePlayingTitle() {
        fetch(stations.playingtitle[num])
        .then(x => x.text())
        .then(y => document.getElementById("songtitle").innerHTML = y);
    }

    updatePlayingTitle();

    setInterval(function() {updatePlayingTitle();}, 100);
};


/**********/
/* CANVAS */
/**********/

function initCanvasPre() {
    const canvas = document.getElementById("equalizer");
    const audio = document.querySelector("audio");

    canvas.width = 300 * 16;
    canvas.height = 100 * 4;
    const canvdisplay = canvas.getContext("2d");

    let audioplaying = false;
    audio.onplay = () => {
        if (!audioplaying) {
            initCanvas();
            audioplaying = true;
        }
    }

    function initCanvas() {    
        const audiodisplay = new AudioContext();
        const audioanalyser = audiodisplay.createAnalyser();
        const source = audiodisplay.createMediaElementSource(audio);
        source.connect(audioanalyser);
        audioanalyser.connect(audiodisplay.destination);

        audioanalyser.fftSize = 8192;
        const bufferlength = audioanalyser.frequencyBinCount;
        const dataarray = new Uint8Array(bufferlength);

        function drawequ() {
            requestAnimationFrame(drawequ)

            audioanalyser.getByteFrequencyData(dataarray)

            canvdisplay.clearRect(0, 0, canvas.width, canvas.height);

            const barw = 1;
            let barh;
            let x = 0;

            for (let i = 0; i < bufferlength; i++) {
                barh = dataarray[i];
                canvdisplay.fillStyle = "rgba(255, 255, 255, 0.8)";
                canvdisplay.fillRect(x, (canvas.height / 2) - barh, barw, barh * 2);
                x += barw + 1;
            }
        }

        drawequ();
    }
}

/******************/
/* VOLUME SETTING */
/******************/


function initVolume() {
    document.getElementById("volumebg").onmousedown = function() {
        document.getElementById("volumefill").style.width = event.clientX - event.target.getBoundingClientRect().left + "px";
        document.getElementById("volumebtn").style.left = event.clientX - event.target.getBoundingClientRect().left - 8 + "px";
        document.getElementById("rplayer").volume = (event.clientX - event.target.getBoundingClientRect().left) / 100;
    }
}