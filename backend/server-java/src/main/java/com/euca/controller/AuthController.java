package com.euca.controller;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.euca.dao.UserDao.UserRecord;
import com.euca.dto.AuthDtos;
import com.euca.service.AuthService;

import jakarta.servlet.http.HttpSession;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    private final AuthService auth;

    public AuthController(AuthService auth){ this.auth = auth; }

    @PostMapping("/register")
    public ResponseEntity<?> register(@Valid @RequestBody AuthDtos.RegisterRequest req){
        boolean ok = auth.register(req.email, req.password);
        if(!ok) return ResponseEntity.status(400).body(Map.of("error","Account already exists"));
        return ResponseEntity.ok(Map.of("ok", true, "message","Account created"));
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody AuthDtos.LoginRequest req, HttpSession session){
        Optional<UserRecord> user = auth.authenticate(req.email, req.password);
        if(user.isEmpty()) return ResponseEntity.status(400).body(Map.of("error","Invalid email or password"));
        UserRecord u = user.get();
        session.setAttribute("userId", u.id);
        session.setAttribute("email", u.email);
        Map<String,Object> resp = new HashMap<>(); resp.put("ok", true);
        return ResponseEntity.ok(resp);
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout(HttpSession session){
        try{ session.invalidate(); }catch(Exception e){}
        return ResponseEntity.ok(Map.of("ok", true));
    }

    @GetMapping("/me")
    public ResponseEntity<?> me(HttpSession session){
        Object uid = session.getAttribute("userId");
        if(uid == null) return ResponseEntity.ok(Map.of("authenticated", false));
        return ResponseEntity.ok(Map.of("authenticated", true, "user", Map.of("id", uid, "email", session.getAttribute("email"))));
    }
}
