//Funksjon for å validere valgt film
function valideringSjekkFilm(film){
    if(!film){
        $("#valideringfilm").text("Må velge en film"); //Viser feilmelding hvis det ikke ble valgt en film (dette er ikke nødvendig å ha med i forhold til oppgaven, men kan være greit å gjøre brukeren obs på at det ikke ble valgt en film)
        return false;
    } else {
        $("#valideringfilm").text(""); //Hvis det ble valgt en film, vil evt. tidligere feilmeldinger fjernes
    }
    return true;
}

//Funksjon for validering av antall billetter
function valideringSjekkAntall(antall){
    if(!antall){
        $("#valideringantall").text("Må skrive inn noe i antall"); //Viser beskjed om å skrive inn tall hvis det ikke ble skrevet inn noe tall
        return false;
    }
    else if(isNaN(antall)){
        $("#valideringantall").text("Ugyldig verdi - Vennligst skriv inn antall billetter"); //Viser feilmesling hvis det ble skrevet inn noe annet enn tall
        return false;
    }
    else if(!/^[1-9][0-9]?$|^99$/.test(antall)){
        $("#valideringantall").text("Vennligst velg antall billetter mellom 1 og 99"); //Viser feilmelding hvis det ble skrevet inn et antall mindre enn 1 eller større enn 99
        return false;
    } else {
        $("#valideringantall").text(""); //Fjerner tidligere feilmeldinger hvis skrevet inn verdi er gydlig
    }
    return true;
}

//Funksjon for validering av fornavn
function valideringSjekkFornavn(fornavn){
    if(!fornavn){
        $("#valideringfornavn").text("Må skrive inn noe inn i fornavnet"); //Gir beskjed om å skrive inn fornavn hvis det ikke ble skrevet inn noe i input feltet
        return false;
    }
    else if(/[^a-æøåA-ÆØÅ]/.test(fornavn)){ //Tester om fornavn inneholder noe annet enn bokstavene a-z og A-Z
        $("#valideringfornavn").text("Ugyldig verdi - Vennligst skriv inn fornavn"); //Viser feilmelding hvis fornavn inneholder andre symboler, selv om det er bokstaver i fornavnet
        return false;
    } else {
        $("#valideringfornavn").text("") //Fjerner tidligere feilmeldinger hvis skrevet inn verdi er gydlig
    }
    return true;
}

//Funksjon for validering av etternavn
function valideringSjekkEtternavn(etternavn){
    if(!etternavn){
        $("#valideringetternavn").text("Må skrive inn noe inn i etternavnet"); //Gir beskjed om å skrive inn etternavn hvis det ikke ble skrevet inn noe i input feltet
        return false;
    }
    else if(/[^a-æøåA-ÆØÅ]/.test(etternavn)){ //Tester om fornavn inneholder noe annet enn bokstavene a-z og A-Z
        $("#valideringetternavn").text("Ugyldig verdi - Vennligst skriv inn etternavn"); //Viser feilmelding hvis etternavn inneholder andre symboler, selv om det er bokstaver i etternavnet
        return false;
    } else {
        $("#valideringetternavn").text(""); //Fjerner tidligere feilmeldinger hvis skrevet inn verdi er gydlig
    }
    return true;
}

//Funksjon for validering av telefonnummer
function valideringSjekkTelefonnr(telefonnr){
    if(!telefonnr){
        $("#valideringtelefonnr").text("Må skrive inn noe inn i telefonnr");
        return false;
    }
    else if(!/^\d{8}$/.test(telefonnr)) { //Viser feilmelding hvis telefonnummer inneholder andre symboler enn tall og om nummeret ikke består av 8 siffere
        $("#valideringtelefonnr").text("Ugyldig verdi - Telefonnummer må bestå av 8 siffer");
        return false;
    } else {
        $("#valideringtelefonnr").text("");
    }
    return true;
}

//Funksjon for validering av epostadresse
function valideringSjekkEpost(epost){
    if(!epost){
        $("#valideringepost").text("Må skrive inn noe inn i epost");
        return false;
    }
    else if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(epost)){ //Bruker dette mønsteret til å sjekke om epostadresse er gyldid ved å følge formatet der brukernavn er først, så @, domenenavn og toppnivådomene
        $("#valideringepost").text("Ugyldig verdi - Vennligst skriv inn epost"); //Viser feilmelding hvsi epostadresse ikke er gyldig
        return false;
    } else {
        $("#valideringepost").text("");
    }
    return true;
}


//funksjon for å vise billettregister
function BillettRegister(){

    const film = $("#velg").val();
    const antall = $("#antall").val();
    const fornavn = $("#fornavn").val();
    const etternavn = $("#etternavn").val();
    const telefonnr = $("#telefonnr").val();
    const epost = $("#epost").val();


    //Sjekker om alle valideringsfunksjonene returnerer 'false', som indikerer at minst en av inputverdiene ikke er gyldig
    //Hindrer at en billett blir registrert i billettregisteret dersom minst en av inputfeltene inneholder ugyldig verdi
    if(!valideringSjekkFilm(film) | !valideringSjekkAntall(antall) | !valideringSjekkFornavn(fornavn) | !valideringSjekkEtternavn(etternavn) | !valideringSjekkTelefonnr(telefonnr) | !valideringSjekkEpost(epost)){
        return;
    }
    //Brukte Bitwise OR operator, var eneste vei for å få koden til å vise alle feimeldinger på samme tid, ved benyttelse av vanlig OR operator (||), hadde en og en feilmedling vistes

    const nyBillett = {
        film : film,
        antall : antall,
        fornavn : fornavn,
        etternavn : etternavn,
        telefonnr : telefonnr,
        epost : epost
    };

    $.post("/lagre", nyBillett, function (){
        hentAlle();
    });

    klarererForm(); //Resetter og klarerer utfyllingene for neste billett
}

//Funksjon som fjerner skrevet inn verdier, denne funksjonen benyttes i visBillettRegister funksjonen
function klarererForm(){
    $("#velg").val("");
    $("#antall").val("");
    $("#fornavn").val("");
    $("#etternavn").val("");
    $("#telefonnr").val("");
    $("#epost").val("");
}

function hentAlle(){
    $.get("/hentAlle", function (data){
        visBillettTabell(data); //Funksjon som viser billett tabellen
    });
}

//Funksjon som viser billett tabellen og tillegg til registrerte billetter
function visBillettTabell(billetter){
    let utskriftAvBillett = "<table class='table table-striped' style='text-align: center'><tr>" +
        "<th><strong>Film</strong></th>" +
        "<th><strong>Antall</strong></th>" +
        "<th><strong>Fornavn</strong></th>" +
        "<th><strong>Etternavn</strong></th>" +
        "<th><strong>Telefonnr</strong></th>" +
        "<th><strong>Epost</strong></th>" +
        "<th></th>" +
        "<th></th>" +
        "</tr>";

    for(const nyBillett of billetter){
        utskriftAvBillett+="<tr>";
        utskriftAvBillett+="<td>"+nyBillett.film+"</td>" +
                           "<td>"+nyBillett.antall+"</td>" +
                           "<td>"+nyBillett.fornavn+"</td>" +
                           "<td>"+nyBillett.etternavn+"</td>" +
                           "<td>"+nyBillett.telefonnr+"</td>" +
                           "<td>"+nyBillett.epost+"</td>" +
                           "<td><a class='btn btn-primary' href='endreBillett.html?id="+nyBillett.id+"'>Endre</a></td>" +
                           "<td><button type='button' class='btn btn-danger' onclick='slettEnBillett("+nyBillett.id+")'>Slett</button></td>";
        utskriftAvBillett+="</tr>";
    }
    utskriftAvBillett+="<table>";

    $("#billettRegister").html(utskriftAvBillett);


}

//Funksjon som viser registrerte billetter som vil fremdeles vises etter at en billett er endret, så lenge det er registrert minst en billett
$(function() {
    $.get("/hentAlle", function (data) {
        if (data.length > 0) {
            // Vis tabellhodene hvis det er billetter tilgjengelig
            visBillettTabell(data);
        }
    });
});


//Funksjon som lar deg slette en enkelt billett
function slettEnBillett(id){
    const url = "/slettEnBillett?id="+id;
    $.get(url, function (){
        //window.location.href = "/";
        hentAlle();
    });
}

//Funksjon som fjerner billettene
function slettAlleBilletter(){
    $.get("/slettAlle", function (){
        visBillettTabell([]); //Viser tabellen på nytt, skal vise en tom tabell
        console.log("Tabell slettet"); //viser log for å sjekke om arrayet faktisk ble tømt
    });
}