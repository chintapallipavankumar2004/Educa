package com.euca.controller;

import java.util.Map;
import java.util.Optional;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.euca.dao.ContentDao;
import com.euca.dao.UserDao;

import jakarta.servlet.http.HttpSession;

@RestController
@RequestMapping("/api/admin")
public class AdminController {
    private final ContentDao content;
    private final UserDao users;
    @org.springframework.beans.factory.annotation.Value("${ADMIN_SECRET:}")
    private String adminSecret;

    public AdminController(ContentDao content, UserDao users){ this.content = content; this.users = users; }

    private boolean isAdmin(HttpSession session){ Object uid = session.getAttribute("userId"); if(uid==null) return false; try{ Optional<com.euca.dao.UserDao.UserRecord> r = users.findByEmail((String)session.getAttribute("email")); return r.isPresent() && r.get().isAdmin; }catch(Exception e){ return false; } }

    @PostMapping("/videos")
    public Object addVideo(@RequestBody Map<String,String> body, HttpSession session){ if(!isAdmin(session)) return Map.of("error","Forbidden"); String title=body.get("title"), url=body.get("url"); if(title==null||url==null) return Map.of("error","title and url required"); content.addVideo(title,url); return Map.of("ok", true); }

    @PostMapping("/images")
    public Object addImage(@RequestBody Map<String,String> body, HttpSession session){ if(!isAdmin(session)) return Map.of("error","Forbidden"); String title=body.get("title"), url=body.get("url"); if(title==null||url==null) return Map.of("error","title and url required"); content.addImage(title,url); return Map.of("ok", true); }

    @GetMapping("/me")
    public Object me(HttpSession session){ Object uid = session.getAttribute("userId"); if(uid==null) return Map.of("authenticated", false); boolean a = isAdmin(session); return Map.of("authenticated", true, "is_admin", a); }

    @PostMapping("/promote")
    public Object promote(@RequestBody Map<String,String> body){ String email = body.get("email"), secret=body.get("secret"); if(adminSecret==null || adminSecret.isEmpty() || !adminSecret.equals(secret)) return Map.of("error","Forbidden"); if(email==null) return Map.of("error","email required"); try{ // update
            users.promoteToAdmin(email);
            return Map.of("ok", true);
        }catch(Exception e){ return Map.of("error","Server error"); }
    }
}
