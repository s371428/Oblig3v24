package oslomet.webprog;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
public class BillettController {

    @Autowired //Bruker Autowired for å hente BillettRepository klassen
    BillettRepository rep;

    @PostMapping("/lagre")
    public void lagreBillett(Billett innBillett){
        rep.lagreBillett(innBillett);
    }

    @GetMapping("/hentAlle")
    public List<Billett> hentAlle(){
        return rep.hentAlleBilletter();
    }

    @GetMapping("/hentEnBillett")
    public Billett hentEnBillett(int id){
        return rep.hentEnBillett(id);
    }

    @PostMapping("/endreEnBillett")
    public void endreEnBillett(Billett billett){
        rep.endreEnBillett(billett);
    }

    @GetMapping("/slettEnBillett")
    public void slettEnBillett(int id){
        rep.slettEnBillett(id);
    }

    @GetMapping("/slettAlle")
    public void slettAlle(){
        rep.slettAlleBilletter();
    }
}

