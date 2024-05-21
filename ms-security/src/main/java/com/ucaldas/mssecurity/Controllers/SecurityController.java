package com.ucaldas.mssecurity.Controllers;

import com.ucaldas.mssecurity.Models.User;
import com.ucaldas.mssecurity.Repositories.UserRepository;
import com.ucaldas.mssecurity.Services.EncryptionService;
import com.ucaldas.mssecurity.Services.JwtService;
import com.ucaldas.mssecurity.Notifications.NotificationEmail;

import jakarta.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.HashMap;

@CrossOrigin
@RestController
@RequestMapping("/api/public/security")
public class SecurityController {

    @Autowired
    private UserRepository theUserRepository;

    @Autowired
    private EncryptionService theEncryptionService;

    @Autowired
    private JwtService theJwtService;

    @PostMapping("/login")
    public String login(@RequestBody User theUser,
                        final HttpServletResponse response) throws IOException {
        try {
            User theActualUser = this.theUserRepository.getUserByEmail(theUser.getEmail());
            if (theActualUser != null) {
                if (theActualUser.getPassword().equals(theEncryptionService.convertSHA256(theUser.getPassword()))) {
                    String token = NotificationEmail.generateRandomWord();
                    theActualUser.setToken(token);
                    this.theUserRepository.save(theActualUser);
                    NotificationEmail.sendEmail(theActualUser.getEmail(), token);
                    
                    return token;
                } else {
                    response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Invalid credentials");
                }
            }
        } catch (Exception e) {
            System.err.println("Error en el método login: " + e.getMessage());
            response.sendError(HttpServletResponse.SC_INTERNAL_SERVER_ERROR, "Error en el método login");
        }
        return null;
    }

    @PutMapping("/secondauth/{id}")
    public HashMap<String,Object> secondAuth(@PathVariable String id, @RequestBody String data,
                              final HttpServletResponse response) throws IOException {
        try {
            HashMap<String,Object> theResponse = new HashMap<>();
            User theUser = this.theUserRepository.findById(id).orElse(null);
            String token = data;
            User theActualUser = this.theUserRepository.getUserByEmail(theUser.getEmail());
            if (theActualUser != null) {
                if (theActualUser.getToken().equals(token)) {
                    token = theJwtService.generateToken(theActualUser);
                    theResponse.put("token", token);
                    theResponse.put("user", theActualUser);
                    theActualUser.setToken(null);
                    this.theUserRepository.save(theActualUser);
                    return theResponse;
                } else {
                    theActualUser.setToken(null);
                    this.theUserRepository.save(theActualUser);
                    response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Second auth failed");
                    return  theResponse;
                }
            }
            return theResponse;
        } catch (Exception e) {
            System.err.println("Error en el método secondAuth: " + e.getMessage());
            response.sendError(HttpServletResponse.SC_INTERNAL_SERVER_ERROR, "Error en el método secondAuth");
            return null;
        }
    }

    @PutMapping("/reesetpassword")
    public String reseetPass(@RequestBody User theUser,
                             final HttpServletResponse response) throws IOException {
        try {
            String token = "";
            User theActualUser = this.theUserRepository.getUserByEmail(theUser.getEmail());
            if (theActualUser != null) {
                token = NotificationEmail.generateRandomWord();
                theActualUser.setToken(token);
                this.theUserRepository.save(theActualUser);
                NotificationEmail.sendEmail(theActualUser.getEmail(), token);
            } else {
                response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Invalid credentials");
            }
            return "message: 'Email enviado'";
        } catch (Exception e) {
            System.err.println("Error en el método reseetPass: " + e.getMessage());
            response.sendError(HttpServletResponse.SC_INTERNAL_SERVER_ERROR, "Error en el método reseetPass");
            return null;
        }
    }

    @PutMapping("/changepassword/{id}")
    public String changePassword(@PathVariable String id, @RequestBody java.util.Map<String, String> requestBody,
                                 final HttpServletResponse response) throws IOException {
        try {
            User theActualUser = this.theUserRepository.findById(id).orElse(null);
            String token = requestBody.get("token");
            System.err.println(token);
            if (theActualUser != null) {
                if (theActualUser.getToken().equals(token)) {
                    theActualUser.setPassword(theEncryptionService.convertSHA256(requestBody.get("password")));
                    theActualUser.setToken(null);
                    this.theUserRepository.save(theActualUser);
                } else {
                    response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "INVALID TOKEN");
                }
            }
            return "message: 'Contraseña cambiada exitosamente'";
        } catch (Exception e) {
            System.err.println("Error en el método changePassword: " + e.getMessage());
            response.sendError(HttpServletResponse.SC_INTERNAL_SERVER_ERROR, "Error en el método changePassword");
            return null;
        }
    }
}
