namespace Form {
    let eissorten: String[] = [
        "Schokolade",
        "Erdbeere",
        "Vanille",
        "Waldbeere",
        "Nuss",
        "Yogurt",
        "Zitrone",
        "Mango",
        "Maracuja",
        "Grüner Apfel"
    ];
    
    let extras: String[] = [
        "Sahne",
        "Streusel",
        "Früchte"
    ];
    
    let sossen: String[] = [
        "Schokolade",
        "Erdbeere",
        "Vanille"
    ];
    
    let darreichungsformen: String[] = [
        "Waffel",
        "Becher"
    ];
    
    let lieferoptionen: String[] = [
        "Standard",
        "Express",
        "Selbstabholung"
    ];

    window.addEventListener("load", init);

    function init(_event: Event): void {
        console.log("Init");
        eissorten.forEach(function (element, index, array) {
            document.getElementById("eissorten").innerHTML += '<select id="eissorte-'+index+'"><option value="0">0</option><option value="1">1</option><option value="2">2</option><option value="3">3</option></select> '+element+'<br>';
        });
        
        extras.forEach(function (element, index, array) {
            document.getElementById("extras").innerHTML += '<input type="checkbox" id="extra-'+index+'"> '+element+'<br>';
        });
        
        var sossenoptions = "";
        sossen.forEach(function (element, index, array) {
            sossenoptions += '<option value="'+index+'">'+element+'</option>';
        });
        document.getElementById("extras").innerHTML += '<select id="sosse"><option value="false">Bitte Soße wählen</option>'+sossenoptions+'</select>';

        
        darreichungsformen.forEach(function (element, index, array) {
            document.getElementById("darreichungsformen").innerHTML += '<input type="radio" id="darreichungsform-'+index+'" name="darreichungsform" value="'+element+'"> '+element+'<br>';
        });
        
        lieferoptionen.forEach(function (element, index, array) {
            document.getElementById("lieferoptionen").innerHTML += '<input type="radio" id="lieferoption-'+index+'" name="lieferoption" value="'+element+'"> '+element+'<br>';
        });
        var elm = document.getElementsByTagName("input");
        for (var i = 0; i < elm.length; i++) {
            elm[i].addEventListener('change', livecheck);
        }
        var elm2 = document.getElementsByTagName("select");
        for (var i = 0; i < elm2.length; i++) {
            elm2[i].addEventListener('change', livecheck);
        }
        document.getElementsByClassName("button")[0].addEventListener('click', check);
        document.getElementsByClassName("button")[1].addEventListener('click', send);
    }
    
    function livecheck () {
        let summe: number = 0.0;
        document.getElementById("bestellung").innerHTML = "";
        eissorten.forEach(function (element, index, array) {
            var select = <HTMLInputElement> document.getElementById('eissorte-'+index);
            if (select.value != "0") {
                document.getElementById("bestellung").innerHTML += select.value+"x "+ element+" "+1 * parseInt(select.value)+"€<br>";
                summe = summe + 1 * parseInt(select.value);
            }
        });
        extras.forEach(function (element, index, array) {
            var checkbox = <HTMLInputElement> document.getElementById('extra-'+index);
            if (checkbox.checked == true) {
                document.getElementById("bestellung").innerHTML += element+" 0,50€<br>";
                summe = summe + 0.50;
            }
        });
        
        var sossenelem = <HTMLInputElement> document.getElementById('sosse');
        if (sossenelem.value != "false") {
            var index = parseInt(sossenelem.value);
            var element = sossen[index];
            document.getElementById("bestellung").innerHTML += 'Soße "'+element+'" 0,50€<br>';
            summe = summe + 0.50;
        }
        darreichungsformen.forEach(function (element, index, array) {
            var checkbox = <HTMLInputElement> document.getElementById('darreichungsform-'+index);
            if (checkbox.checked == true) {
                document.getElementById("bestellung").innerHTML += "Darreichungsform: "+element+"<br>";
            }
        });
        lieferoptionen.forEach(function (element, index, array) {
            var checkbox = <HTMLInputElement> document.getElementById('lieferoption-'+index);
            if (checkbox.checked == true) {
                document.getElementById("bestellung").innerHTML += "Lieferoption: "+element+"<br>";
            }
        });
        var endsumme = Math.round(summe * 100) / 100;
        document.getElementById("bestellung").innerHTML += "<br><br><b>Summe: "+endsumme+"€</b>";
    }
    
    function check () {
        var eissorte = 0;
        eissorten.forEach(function (element, index, array) {
            var checkbox = <HTMLInputElement> document.getElementById('eissorte-'+index);
            if (checkbox.value != "0") {
                eissorte = 1;
            }
        });
        if (eissorte == 0) {
            alert("Bitte wähle mindestens eine Eissorte");
            return;
        }
        var darreichungsform = 0;
        darreichungsformen.forEach(function (element, index, array) {
            var checkbox = <HTMLInputElement> document.getElementById('darreichungsform-'+index);
            if (checkbox.checked == true) {
                darreichungsform = 1;
            }
        });
        if (darreichungsform == 0) {
            alert("Bitte wähle eine Darreichungsform");
            return;
        }
        var lieferung = 0;
        lieferoptionen.forEach(function (element, index, array) {
            var checkbox = <HTMLInputElement> document.getElementById('lieferoption-'+index);
            if (checkbox.checked == true) {
                lieferung = 1;
            }
        });
        if (lieferung == 0) {
            alert("Bitte wähle eine Lieferoption");
            return;
        }
        
        var adr = <HTMLInputElement> document.getElementById("adr-name");
        if (adr.value == "") {
            alert("Bitte gib eine vollständige Lieferadresse an");
            return;
        }
        var adr = <HTMLInputElement> document.getElementById("adr-vorname");
        if (adr.value == "") {
            alert("Bitte gib eine vollständige Lieferadresse an");
            return;
        }
        var adr = <HTMLInputElement> document.getElementById("adr-strasse");
        if (adr.value == "") {
            alert("Bitte gib eine vollständige Lieferadresse an");
            return;
        }
        var adr = <HTMLInputElement> document.getElementById("adr-ort");
        if (adr.value == "") {
            alert("Bitte gib eine vollständige Lieferadresse an");
            return;
        }
        alert("Die Bestellung ist gültig");
    }
    
    function send (): void {
        var urlparse = document.getElementById("bestellung").innerHTML;
        let xhr: XMLHttpRequest = new XMLHttpRequest();
        //xhr.open("GET", "http://localhost:8100?bestellung=" + urlparse, true);
        xhr.open("GET", "https://eia-eisdealer-jade.herokuapp.com?bestellung=" + urlparse, true);
        xhr.addEventListener("readystatechange", handleStateChange);
        xhr.send();
    }
    

    function handleStateChange(_event: ProgressEvent): void {
        var xhr: XMLHttpRequest = (<XMLHttpRequest>_event.target);
        if (xhr.readyState == XMLHttpRequest.DONE) {
            console.log("ready: " + xhr.readyState, " | type: " + xhr.responseType, " | status:" + xhr.status, " | text:" + xhr.statusText);
            //console.log("response: " + xhr.response);
            document.documentElement.style.background = "none";
            document.body.innerHTML = "<center><h1>Ihre Bestellung:<br><br></h1>"+xhr.response+"</center>";
        }
    }
}