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

    public Billett hentEnBillett(int id){ //Metode for å hente en billett basert på ID inne på databasen
        Object[] param = new Object[1]; //Oppretter en array med en enkelt plass for paramateren (ID)
        param[0] = id;
        String sql = "SELECT * FROM Billett WHERE id=?";
        Billett enBillett = db.queryForObject(sql, param, BeanPropertyRowMapper.newInstance(Billett.class)); //Utfører spørringen på databasen og mapper resultatet til en Billett-klasse
        return enBillett;
    }

    public void endreEnBillett(Billett billett){ //Metode for å endre en billett inne på databasen
        String sql = "UPDATE Billett SET film=?, antall=?, fornavn=?, etternavn=?, telefonnr=?, epost=? where id=?";
        db.update(sql,billett.getFilm(),billett.getAntall(),billett.getFornavn(),billett.getEtternavn(),billett.getTelefonnr(),billett.getEpost(),billett.getId());
    }

    public void slettEnBillett(int id){ //Metode for å slette en billett fra tabellen inne på databasen
        String sql = "DELETE FROM Billett WHERE id=?";
        db.update(sql,id);
    }

    public void slettAlleBilletter(){ //Metode for å slette billettene fra tabellen inne på databasen
        String sql = "DELETE FROM Billett";
        db.update(sql);
    }


}
