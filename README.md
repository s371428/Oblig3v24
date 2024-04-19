# Oblig3v24

OsloMet brukernavn: s371428

GitHub brukernavn: s371428

Github repo URL: https://github.com/s371428/Oblig3v24

youtube demo video URL: https://youtu.be/EeBlH8Rbit4

Fullt navn: Mewan Andre Mohammad

Kort beskrivelse av applikasjon:

Beskrivesle fra oblig 1: Applikasjon som registrerer billetter. Flere input felt som man kan fylle inn på kommer med forskjellige valideringskriterier. Valgte å skrive inn valideringssjekkene inne på Javascript filen for å vise mer funksjonalitet av koden. Hvis det er skrevet inn ugyldige input verdier i disse input feltene, får man beskjed ved siden av spesifikk input felt med rød tekst at verdien er ugyldig. Hvis alle verdier er gyldig, vil billetten bli registrert og vil vises opp på en tabell. Slett knapp nederst inne på applikasjonen er også lagt til for å slette alle registrerte billetter.

Beskrivelse fra oblig 2: Lagt til funksjonalitet som Lagrer billetter inne i et array inne på en server ved bruk av Springboot og Java. Prosjektet har en Billett java kode for opprettelse av disse billett objektene. BillettController er også lagt til med funksjonaliteter som lagrer, henter og sletter billett objektene. HTML er stylet med Bootstrap, slik at det blir mer brukervennlig å benytte klienten.

Beskrivelse fra oblig 3: Erstattet arrayet på tjener/server med en tabell i relasjonsdatabase. H2-"in-memory"-database ble benyttet for dette. La til forskjellige kode inne på src/main/rescources/application.properties for å få tilgang til databasen. Opprettet en schema sql fil for å opprette tabellen Billett. Opprettet java klassen BillettRepository for å kunne opprette, lagre, slette og hente billettene i tabellen i databasen. La til også mulighet for å endre eller slette en enkelt billett inne på klienten.