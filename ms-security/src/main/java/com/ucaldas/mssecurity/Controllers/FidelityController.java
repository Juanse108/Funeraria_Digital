package com.ucaldas.mssecurity.Controllers;

import com.ucaldas.mssecurity.Models.Fidelity;
import com.ucaldas.mssecurity.Models.Role;
import com.ucaldas.mssecurity.Models.User;
import com.ucaldas.mssecurity.Repositories.FidelityRepository;
import com.ucaldas.mssecurity.Repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("fidelity")
public class FidelityController {

    @Autowired
    private FidelityRepository thefidelityRepository;

    @Autowired
    private UserRepository theUserRepository;



    @GetMapping("")
    public List<Fidelity> findAll() {
        return this.thefidelityRepository.findAll();
    }

    @ResponseStatus(HttpStatus.CREATED)

    @PostMapping()
    public Fidelity create() {
        Fidelity newFidelity = new Fidelity(20); // Assign default value of 20 points
        return thefidelityRepository.save(newFidelity);
    }

    @GetMapping("{id}")
    public Fidelity findById(@PathVariable String id) {
        Fidelity theUser = this.thefidelityRepository
                .findById(id)
                .orElse(null);
        return theUser;
    }

    @PutMapping("{id}")
    public Fidelity update(@PathVariable String id, @RequestBody Fidelity theNewFidelity) {
        Fidelity theActualUser = this.thefidelityRepository
                .findById(id)
                .orElse(null);
        if (theActualUser != null) {
            theActualUser.setPuntos(theNewFidelity.getPuntos());
            return this.thefidelityRepository.save(theActualUser);
        } else {
            return null;
        }
    }

    @ResponseStatus(HttpStatus.NO_CONTENT)
    @DeleteMapping("{id}")
    public void delete(@PathVariable String id) {
        Fidelity theUser = this.thefidelityRepository
                .findById(id)
                .orElse(null);
        if (theUser != null) {
            this.thefidelityRepository.delete(theUser);
        }
    }




}
