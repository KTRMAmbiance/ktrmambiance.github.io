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
}

var listofstrings = [];
var selectedstring = [];
var listwithremovedstrings = [];
var prevstring = "prev";
var nextstring = "current";
var stringsperpage = 0;
var pagecount = 0;
var pagedisp = 1;
var stringcount = 0;
var newstringcount = 0;
var listdisp = [""];

var maxstringsperpage = 23;

function listStrings() {    

    document.getElementById("pageprevbutton").disabled = true;
    document.getElementById("pagebutton").disabled = true;
    for (i=1; i<=100; i++) {
        listdisp[i] = "";
    }

    pagecount = 1;
    pagedisp = 1;
    stringcount = 0;
    stringsperpage = 0;

    listStringsMain();

    var remdup = i - stringcount;

    document.getElementById("listbox1").innerHTML = listdisp[1];

    if (pagecount > 1) {   
        document.getElementById("pagebutton").disabled = false;
    }
    
    document.getElementById("pagenum").innerHTML = "Page " + (pagedisp) + " of " + (pagecount);
    if (stringcount > maxstringsperpage) {
        document.getElementById("ranges").innerHTML = "(" + ((maxstringsperpage * (pagedisp - 1)) + 1) + " to " + ((maxstringsperpage * (pagedisp))) + ")";
    }
    else
    {
        document.getElementById("ranges").innerHTML = "(" + ((maxstringsperpage * (pagedisp - 1)) + 1) + " to " + (stringcount) + ")";
    }
    if (document.getElementById("listfilter").value != "") {
        document.getElementById("summary").innerHTML = "</br>Listed a total of " + stringcount + " strings with filtering";
    }
    else {
        if (document.getElementById("removedups").checked == true) {
            document.getElementById("summary").innerHTML = "</br>Listed a total of " + stringcount + " strings with " + remdup + " duplicates omitted";
        }
        else
        {
            document.getElementById("summary").innerHTML = "</br>Listed a total of " + stringcount + " strings";
        }
    }
}

function nextPage() {
    pagedisp += 1;
    document.getElementById("listbox1").innerHTML = listdisp[pagedisp];
    document.getElementById("pagenum").innerHTML = "Page " + (pagedisp) + " of " + (pagecount);
    document.getElementById("ranges").innerHTML = "(" + ((maxstringsperpage * (pagedisp - 1)) + 1) + " to " + ((maxstringsperpage * (pagedisp))) + ")";
    if (pagedisp == pagecount)
    {
        document.getElementById("ranges").innerHTML = "(" + ((maxstringsperpage * (pagedisp - 1)) + 1) + " to " + (stringcount) + ")";
    }
    if (pagedisp == pagecount)
    {
        document.getElementById("pagebutton").disabled = true;
    }

    if (document.getElementById("pageprevbutton").disabled == true)
    {
        document.getElementById("pageprevbutton").disabled = false;
    }
}

function prevPage() {
    pagedisp -= 1;
    document.getElementById("listbox1").innerHTML = listdisp[pagedisp];
    document.getElementById("pagenum").innerHTML = "Page " + (pagedisp) + " of " + (pagecount);
    document.getElementById("ranges").innerHTML = "(" + (maxstringsperpage * (pagedisp)) + " to " + ((maxstringsperpage * (pagedisp))) + ")";


    if (document.getElementById("pagebutton").disabled == true)
    {
        document.getElementById("pagebutton").disabled = false;
    }
    
    if (pagedisp == 1)
    {
        document.getElementById("pageprevbutton").disabled = true;
    }
}

function listStringPages(nn, pn, ld, ln)
{
    for (i=0; i<ln.length; i++)
    {
        var pn = nn;
        var nn = ln[i].replace(/\\/g, "\\\\");
        nn = nn.replace(/"/g, "\\\"");
        let lfilter;
        if (document.getElementById("listfilter").value != "") {
            if (listfilterc.checked == true) {
                lfilter = nn.search(document.getElementById("listfilter").value);
            }
            else {
                lfilter = nn.search(new RegExp(document.getElementById("listfilter").value, "i"));  
            }
            if (lfilter != -1) {
                if (removedups.checked == true) {
                    if (nn != pn) {
                        generatelist(ld, nn);
                    }
                }
                else
                {
                    generatelist(ld, nn);
                }
            }
        }
        else {
            if (removedups.checked == true) {
                if (nn != pn) {
                    generatelist(ld, nn);
                }
            }
            else
            {
                generatelist(ld, nn);
            }
        }
    }
}

function generatelist(ld, nn) {
    if (stringsperpage < maxstringsperpage) {
        ld[pagecount] += nn + "</br>";
        stringcount += 1;
        stringsperpage += 1;
    }
    else {
        pagecount += 1;
        stringsperpage = 0;
        ld[pagecount] += nn + "</br>";
        stringcount += 1;
        stringsperpage += 1;
    }
}

function listStringsMain() {
    listStringPages(nextstring, prevstring, listdisp, listofstrings);
}

function addString() {
    listofstrings[stringcount] = document.getElementById("texttoadd").value;
    stringcount++;
    for (i=0; i<listofstrings.length; i++) {
        listStrings();
    }
}

function removeString() {
    let texttoremove = document.getElementById("removefromlist").value;
    newstringcount = 0;
    listwithremovedstrings.length = 0;
    for (i=0; i<listofstrings.length; i++) {
        if (texttoremove != listofstrings[i]) {
            listwithremovedstrings[newstringcount] = listofstrings[i];
            newstringcount++;
        }
    }
    listofstrings.length = 0;
    document.getElementById("listbox1").innerHTML = "";
    for (x=0; x<listwithremovedstrings.length; x++) {
        listofstrings[x] = listwithremovedstrings[x];
    }
    stringcount = listofstrings.length;
    listStrings();
}

function listStringsOnClick() {
    if (alphasort.checked == true) {
        listofstrings.sort();
    }
    listStrings();
}

/**************/
/* 3D SPINNER */
/**************/

function pickString(ln, lnx) {
    renderSpinner();
    generateString(ln, lnx);
    setTimeout(() => {generateString(ln, lnx);}, 200);
    setTimeout(() => {generateString(ln, lnx);}, 600);
    setTimeout(() => {generateString(ln, lnx);}, 1200);
}

function generateString(ln, lnx) {
    for (i=8; i>=1; i--) {
        selectNick();
    }
    document.getElementById("spinnerdisp1").innerHTML = ln[1];
    setTimeout(() => {document.getElementById("spinnerdisp2").innerHTML = ln[2];}, 50);
    setTimeout(() => {document.getElementById("spinnerdisp3").innerHTML = ln[3];}, 100);
    setTimeout(() => {document.getElementById("spinnerdisp4").innerHTML = ln[4];}, 150);
    setTimeout(() => {document.getElementById("spinnerdisp5").innerHTML = ln[5];}, 200);
    setTimeout(() => {document.getElementById("spinnerdisp6").innerHTML = ln[6];}, 250);
    setTimeout(() => {document.getElementById("spinnerdisp7").innerHTML = ln[7];}, 300);
    setTimeout(() => {document.getElementById("spinnerdisp8").innerHTML = ln[8];}, 350);

    function selectNick() {
        stringnum = Math.floor(Math.random() * lnx.length);
        printNick();
    } 
    
    function printNick() {
        let filternick;
        if (custominclsns.checked == true) {
        filternick = lnx[stringnum].search(document.getElementById("includedtext").value);
        }
        else {
        filternick = lnx[stringnum].search(new RegExp(document.getElementById("includedtext").value, "i"));
        }
        if (customincl.checked == true) {
            if (filternick >= 0) {
                ln[i] = lnx[stringnum];   
            }
            else {
                selectNick();
            }  
        }
        else {
            ln[i] = lnx[stringnum];
        }
    }
}

function spinnerresult() {
    document.getElementById("spinner2").style.display = "none";
    document.getElementById("spinner3").style.display = "none";
    document.getElementById("spinner4").style.display = "none";
    document.getElementById("spinnerdisp5").style.display = "none";
    if (removeselected.checked == true) {
        if (listofstrings.length > 1) {
            newstringcount = 0;
            listwithremovedstrings.length = 0;
            for (i=0; i<listofstrings.length; i++) {
                if (selectedstring[1] != listofstrings[i]) {
                    listwithremovedstrings[newstringcount] = listofstrings[i];
                    newstringcount++;
                }
            }
            listofstrings.length = 0;
            for (x=0; x<listwithremovedstrings.length; x++) {
                listofstrings[x] = listwithremovedstrings[x];
            }
            listStrings();
        }
    }
}

function renderSpinner() {

    if (soundswitch.checked == true) {
        spinsound.play();
    }
    setTimeout(spinnerresult, 3000);
    document.getElementById("spinnerbox").style.display = "block";
    document.getElementById("spinner1").style.animation = "none";
    document.getElementById("spinner1").offsetHeight;
    document.getElementById("spinner1").style.animation = null;

    document.getElementById("spinnerbox").style.animation = "none";
    document.getElementById("spinnerbox").offsetHeight;
    document.getElementById("spinnerbox").style.animation = null;

    document.getElementById("spinner2").style.display = "block";
    document.getElementById("spinner3").style.display = "block";
    document.getElementById("spinner4").style.display = "block";
    document.getElementById("spinnerdisp5").style.display = "block";

    document.getElementById("spinner1").style.animation = "3s spin";
    document.getElementById("spinner2").style.animation = "3s spin2";
    document.getElementById("spinner3").style.animation = "3s spin3";
    document.getElementById("spinner4").style.animation = "3s spin4";
}

/********************/
/* SETTINGS & ABOUT */
/********************/

function displaySettings() {
    document.getElementById("settingswindow").style.display = "block";
};

function closeSettings() {
    document.getElementById("settingswindow").style.display = "none";
}

function displayAbout() {
    document.getElementById("aboutwindow").style.display = "block";
};

function closeAbout() {
    document.getElementById("aboutwindow").style.display = "none";
}