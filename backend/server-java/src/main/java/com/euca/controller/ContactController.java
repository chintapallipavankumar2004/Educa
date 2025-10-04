package com.euca.controller;

import java.util.Map;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class ContactController {
    private final JdbcTemplate jdbc;
    public ContactController(JdbcTemplate jdbc){ this.jdbc = jdbc; }

    @PostMapping("/contact")
    public Object contact(@RequestBody Map<String,String> body){ String name = body.get("name"); String email = body.get("email"); String message = body.get("message"); if(email==null||message==null) return Map.of("error","email and message required"); try{ jdbc.update("INSERT INTO contacts (name,email,message) VALUES (?,?,?)", name, email, message); return Map.of("ok", true); }catch(Exception e){ return Map.of("error","Server error"); } }
}
