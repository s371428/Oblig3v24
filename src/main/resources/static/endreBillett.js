$(function(){
    const id = window.location.search.substring(1);
    const url = "/hentEnBillett?"+id;
    $.get(url,function(billett){
        $("#id").val(billett.id);
        $("#velg").val(billett.film);
        $("#antall").val(billett.antall);
        $("#fornavn").val(billett.fornavn);
        $("#etternavn").val(billett.etternavn);
        $("#telefonnr").val(billett.telefonnr);
        $("#epost").val(billett.epost);
    });
});

function endreBilletten(){
    console.log("Endre billett knapp klikket"); //Sjekker om at billettknapp funksjonen fungerer

    const film = $("#velg").val();
    const antall = $("#antall").val();
    const fornavn = $("#fornavn").val();
    const etternavn = $("#etternavn").val();
    const telefonnr = $("#telefonnr").val();
    const epost = $("#epost").val();


    //Sjekker om alle valideringsfunksjonene returnerer 'false', som indikerer at minst en av inputverdiene ikke er gyldig
    //Hindrer at billetten blir endret dersom minst en av inputfeltene inneholder ugyldig verdi
    if(!endreValideringSjekkFilm(film) | !endreValideringSjekkAntall(antall) | !endreValideringSjekkFornavn(fornavn) | !endreValideringSjekkEtternavn(etternavn) | !endreValideringSjekkTelefonnr(telefonnr) | !endreValideringSjekkEpost(epost)){
        return;
    }

    const billett = {
        id : $("#id").val(),
        film : film,
        antall : antall,
        fornavn : fornavn,
        etternavn : etternavn,
        telefonnr : telefonnr,
        epost : epost
    }
    $.post("/endreEnBillett",billett,function (){
        window.location.href = 'index.html';
    });
}

//Funksjon for å validere valgt endret film
function endreValideringSjekkFilm(film){
    if(!film){
        $("#endrevalideringfilm").text("Må velge en film"); //Viser feilmelding hvis det ikke ble valgt en film (dette er ikke nødvendig å ha med i forhold til oppgaven, men kan være greit å gjøre brukeren obs på at det ikke ble valgt en film)
        return false;
    } else {
        $("#endrevalideringfilm").text(""); //Hvis det ble valgt en film, vil evt. tidligere feilmeldinger fjernes
    }
    return true;
}

//Funksjon for validering av endring av antall billetter
function endreValideringSjekkAntall(antall){
    if(!antall){
        $("#endrevalideringantall").text("Må skrive inn noe i antall"); //Viser beskjed om å skrive inn tall hvis det ikke ble skrevet inn noe tall
        return false;
    }
    else if(isNaN(antall)){
        $("#endrevalideringantall").text("Ugyldig verdi - Vennligst skriv inn antall billetter"); //Viser feilmesling hvis det ble skrevet inn noe annet enn tall
        return false;
    }
    else if(parseInt(antall) < 1 || parseInt(antall) > 99){
        $("#endrevalideringantall").text("Vennligst velg antall billetter mellom 1 og 99"); //Viser feilmelding hvis det ble skrevet inn et antall mindre enn 1 eller større enn 99
        return false;
    } else {
        $("#endrevalideringantall").text(""); //Fjerner tidligere feilmeldinger hvis skrevet inn verdi er gydlig
    }
    return true;
}

//Funksjon for validering av endret fornavn
function endreValideringSjekkFornavn(fornavn){
    if(!fornavn){
        $("#endrevalideringfornavn").text("Må skrive inn noe inn i fornavnet"); //Gir beskjed om å skrive inn fornavn hvis det ikke ble skrevet inn noe i input feltet
        return false;
    }
    else if(/[^a-æøåA-ÆØÅ]/.test(fornavn)){ //Tester om fornavn inneholder noe annet enn bokstavene a-z og A-Z
        $("#endrevalideringfornavn").text("Ugyldig verdi - Vennligst skriv inn fornavn"); //Viser feilmelding hvis fornavn inneholder andre symboler, selv om det er bokstaver i fornavnet
        return false;
    } else {
        $("#endrevalideringfornavn").text("") //Fjerner tidligere feilmeldinger hvis skrevet inn verdi er gydlig
    }
    return true;
}

//Funksjon for validering av endret etternavn
function endreValideringSjekkEtternavn(etternavn){
    if(!etternavn){
        $("#endrevalideringetternavn").text("Må skrive inn noe inn i etternavnet"); //Gir beskjed om å skrive inn etternavn hvis det ikke ble skrevet inn noe i input feltet
        return false;
    }
    else if(/[^a-æøåA-ÆØÅ]/.test(etternavn)){ //Tester om fornavn inneholder noe annet enn bokstavene a-z og A-Z
        $("#endrevalideringetternavn").text("Ugyldig verdi - Vennligst skriv inn etternavn"); //Viser feilmelding hvis etternavn inneholder andre symboler, selv om det er bokstaver i etternavnet
        return false;
    } else {
        $("#endrevalideringetternavn").text(""); //Fjerner tidligere feilmeldinger hvis skrevet inn verdi er gydlig
    }
    return true;
}

//Funksjon for validering av endret telefonnummer
function endreValideringSjekkTelefonnr(telefonnr){
    if(!telefonnr){
        $("#endrevalideringtelefonnr").text("Må skrive inn noe inn i telefonnr");
        return false;
    }
    else if(isNaN(telefonnr) || telefonnr.length !== 8){ //Viser feilmelding hvis telefonnummer inneholder andre symboler enn tall og om nummeret ikke består av 8 siffere
        $("#endrevalideringtelefonnr").text("Ugyldig verdi - Telefonnummer må bestå av 8 siffer");
        return false;
    } else {
        $("#endrevalideringtelefonnr").text("");
    }
    return true;
}

//Funksjon for validering av endret epostadresse
function endreValideringSjekkEpost(epost){
    if(!epost){
        $("#endrevalideringepost").text("Må skrive inn noe inn i epost");
        return false;
    }
    else if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(epost)){ //Bruker dette mønsteret til å sjekke om epostadresse er gyldid ved å følge formatet der brukernavn er først, så @, domenenavn og toppnivådomene
        $("#endrevalideringepost").text("Ugyldig verdi - Vennligst skriv inn epost"); //Viser feilmelding hvsi epostadresse ikke er gyldig
        return false;
    } else {
        $("#endrevalideringepost").text("");
    }
    return true;
}