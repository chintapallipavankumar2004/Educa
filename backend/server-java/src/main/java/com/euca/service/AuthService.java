package com.euca.service;

import com.euca.dao.UserDao;
import com.euca.dao.UserDao.UserRecord;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AuthService {
    private final UserDao users;
    private final BCryptPasswordEncoder bcrypt;

    public AuthService(UserDao users){
        this.users = users;
        this.bcrypt = new BCryptPasswordEncoder(12);
    }

    public boolean register(String email, String password){
        Optional<UserRecord> exists = users.findByEmail(email);
        if(exists.isPresent()) return false;
        String hash = bcrypt.encode(password);
        users.createUser(email, hash);
        return true;
    }

    public Optional<UserRecord> authenticate(String email, String password){
        var u = users.findByEmail(email);
        if(u.isEmpty()) return Optional.empty();
        if(!bcrypt.matches(password, u.get().passwordHash)) return Optional.empty();
        return u;
    }
}
