package com.euca.dao;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.Optional;

@Repository
public class UserDao {
    private final JdbcTemplate jdbc;

    public UserDao(JdbcTemplate jdbc){ this.jdbc = jdbc; }

    public Optional<UserRecord> findByEmail(String email){
        var rows = jdbc.query("SELECT id, email, password_hash, is_admin FROM users WHERE email = ? LIMIT 1", new Object[]{email}, new RowMapper<UserRecord>(){
            public UserRecord mapRow(ResultSet rs, int rowNum) throws SQLException{
                return new UserRecord(rs.getInt("id"), rs.getString("email"), rs.getString("password_hash"), rs.getInt("is_admin") == 1);
            }
        });
        if(rows == null || rows.isEmpty()) return Optional.empty();
        return Optional.of(rows.get(0));
    }

    public int createUser(String email, String passwordHash){
        return jdbc.update("INSERT INTO users (email, password_hash) VALUES (?,?)", email, passwordHash);
    }

    public int promoteToAdmin(String email){
        return jdbc.update("UPDATE users SET is_admin = 1 WHERE email = ?", email);
    }

    public static class UserRecord {
        public final int id; public final String email; public final String passwordHash; public final boolean isAdmin;
        public UserRecord(int id, String email, String passwordHash, boolean isAdmin){ this.id = id; this.email = email; this.passwordHash = passwordHash; this.isAdmin = isAdmin; }
    }
}
