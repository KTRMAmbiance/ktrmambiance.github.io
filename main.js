
window.onload = function() {
    const currenttime = new Date();
    if (currenttime.getHours() >= 22 || currenttime.getHours() < 7) {
        document.body.style.backgroundImage = "url('_bg/night_full.png')";
    }
    else if (currenttime.getHours() >= 18) {
        document.body.style.backgroundImage = "url('_bg/sunset_full.png')";
    }
    else if (currenttime.getHours() >= 13) {
        document.body.style.backgroundImage = "url('_bg/daytime_full.png')";
    }
    else {
        document.body.style.backgroundImage = "url('_bg/morning_full.png')";
    }
}

function displayProjects() {
    document.getElementById("projectwindow").style.display = "block";
}

function closeProjects() {
    document.getElementById("projectwindow").style.display = "none";
}