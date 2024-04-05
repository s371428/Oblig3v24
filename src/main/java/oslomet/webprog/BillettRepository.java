package oslomet.webprog;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class BillettRepository {

    @Autowired //Henter knyttning til databasen
    private JdbcTemplate db; //Henter klassen JdbcTemplate, gir navn db. Bruker da db til å aksessere databasen

    public void lagreBillett(Billett innBillett){ //Her lagres en billett inne i databasen (lagre metode)
        String sql = "INSERT INTO Billett (film, antall, fornavn, etternavn, telefonnr, epost) VALUES(?,?,?,?,?,?)";
        db.update(sql, innBillett.getFilm(),innBillett.getAntall(),innBillett.getFornavn(),innBillett.getEtternavn(),innBillett.getTelefonnr(),innBillett.getEpost()); //Her legges inn verdiene for registrering av billett
    }

    public List<Billett> hentAlleBilletter(){ //Lar seg hente opp alle registrerte billetter i fra tabellen Billett (hente metode)
        String sql = "SELECT * FROM Billett ORDER BY etternavn";
        List<Billett> alleBilletter = db.query(sql, new BeanPropertyRowMapper(Billett.class)); //BeanPropertyRowMapper tar en klasse definisjon. Klassen Billett blir da et objekt som man kan kalle med Billett definisjonen, og den mapper kolonnene i tabellen til klassen Billett
        return alleBilletter;
    }

    public void slettAlleBilletter(){ //Metode for å slette billettene fra tabellen
        String sql = "DELETE FROM Billett";
        db.update(sql);
    }
}
