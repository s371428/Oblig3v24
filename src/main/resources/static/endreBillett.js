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
    console.log("Endre billett knapp klikket");
    const billett = {
        id : $("#id").val(),
        film : $("#velg").val(),
        antall : $("#antall").val(),
        fornavn : $("#fornavn").val(),
        etternavn : $("#etternavn").val(),
        telefonnr : $("#telefonnr").val(),
        epost : $("#epost").val()
    }
    $.post("/endreEnBillett",billett,function (){
        window.location.href = 'index.html';
    });
}