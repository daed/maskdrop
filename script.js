$.getJSON('configs/alt.json', function(config)
{
    let debug = false;
    let info = false;
    let led = [0, 0, 0, 0];

    // setup behaviors
    let el = document.getElementById("showInstructions");
    el.onclick=function () { showInstructions() };
    el = document.getElementById("reset");
    el.onclick=function () { reset() };

    // build table from config
    let table = document.querySelector("table");
    for (x in config.codes){ 
        let row = table.insertRow();
        for (y in config.codes[x]) {
            let clickable = true;
            let cell = row.insertCell();
            //cell.classList.add('tab');
            cell.classList.add('kbkey');
            if (config.codes[x][y].id == -1) {
                cell.classList.add('null');
                clickable = false;
            }
            else if (config.codes[x][y].id == 0) {
                cell.classList.add('id0');
            }
            else if (config.codes[x][y].id == 1) {
                cell.classList.add('id1');
            }
            else if (config.codes[x][y].id == 2) {
                cell.classList.add('id2');
            }
            else if (config.codes[x][y].id == 3) {
                cell.classList.add('id3');
            }
            let text = document.createTextNode(config.codes[x][y].name);
            cell.appendChild(text);
            cell.id = config.codes[x][y].code;
            if (clickable)
            {
                cell.addEventListener("click", function() {clickMath(this.id)}, false);
            }
        }
    }

    function showInstructions() {
        let el = document.getElementById("instructions");
        if (el.classList.contains('hide')) {
            el.classList.remove('hide');    
            el = document.getElementById("showInstructions");
            el.innerText = "I want to know less! (reduce explanation)";
        }
        else {
            el.classList.add('hide');
            el = document.getElementById("showInstructions");
            el.innerText = "Do you want to know more? (expand explanation)";
        }

        el = document.getElementById("brief");
        if (el.classList.contains('hide')) {
            el.classList.remove('hide');    
        }
        else {
            el.classList.add('hide');
        }

    }

    function reset() {
        let kbkeys = document.getElementsByClassName("kbkey");
        for (x in kbkeys) {
            if (kbkeys[x].classList) {
                kbkeys[x].classList.remove("selected");
            }
        }
        for (x in led) {
            led[x] = 0;
        }
        updateValues();
    }

    function getBtnId(btn) {
        let ledid;
        if (info) {
            console.log("INFO: getBtnId():  btn classlist = " + btn.classList);
        }
        if (btn.classList.contains('id0'))
        {
            ledid = 0;
        }
        else if (btn.classList.contains('id1'))
        {
            ledid = 1;
        }
        else if (btn.classList.contains('id2'))
        {
            ledid = 2;
        }
        else if (btn.classList.contains('id3'))
        {
            ledid = 3;
        }
        if (info) {
            console.log("INFO: getBtnId():  ledid value   = " + ledid);
        }
        return ledid;
    }

    function updateValues() {
        let el = document.getElementById("code0");
        el.innerText = led[0] + ",";
        el = document.getElementById("code1");
        el.innerText = led[1] + ",";
        el = document.getElementById("code2");
        el.innerText = led[2] + ",";
        el = document.getElementById("code3");
        el.innerText = led[3] + ",";
    }

    function clickMath(clicked_id) {
        let btn = document.getElementById(clicked_id);
        let ledid = getBtnId(btn);
        let change = Math.pow(2, ( (clicked_id-1) % 32));
        if (debug) {
            console.log("DEBUG: clickMath():     clicked_id          : " + String(clicked_id));
            console.log("DEBUG: clickMath():     clicked_id - 1      : " + String(clicked_id-1));
            console.log("DEBUG: clickMath():    (clicked_id - 1)%32  : " + String((clicked_id-1) % 32));
            console.log("DEBUG: clickMath(): 2^((clicked_id - 1)%32) : " + String(Math.pow(2, ( (clicked_id-1) % 32))));
        }
        if (info) {
            console.log("INFO: clickMath(): clicked_id    = " + clicked_id);
            console.log("INFO: clickMath(): change        = " + change);
        }
        if (btn.classList.contains('selected')) {
            btn.classList.remove('selected');
            // remove bits from counters
            led[ledid] -= change;
            if (led[ledid] < 0) {
                console.log("ERROR: clickMath():  id value dropped below zero!");

            }
        }
        else{
            btn.classList.add('selected');
            // add based on id bits to counters
            led[ledid] += change;
        }
        if (info) {
            console.log("INFO: clickMath(): led values    = " + led);
        }
        updateValues();
    }


});
