package com.example.dbcheck.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/db-status")
public class DbStatusController {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @GetMapping
    public ResponseEntity<Map<String, String>> status() {
        Map<String, String> resp = new HashMap<>();
        try {
            jdbcTemplate.execute("SELECT 1");
            resp.put("status", "OK");
            resp.put("message", "Successfully connected to the database.");
            return ResponseEntity.ok(resp);
        } catch (Exception ex) {
            resp.put("status", "Error");
            resp.put("message", "Failed to connect to the database.");
            return ResponseEntity.status(500).body(resp);
        }
    }
}
