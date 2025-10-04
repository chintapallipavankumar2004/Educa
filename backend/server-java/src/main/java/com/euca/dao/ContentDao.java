package com.euca.dao;

import java.util.List;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

@Repository
public class ContentDao {
    private final JdbcTemplate jdbc;
    public ContentDao(JdbcTemplate jdbc){ this.jdbc = jdbc; }

    public List<Media> listVideos(){
        return jdbc.query("SELECT id, title, url, created_at FROM videos ORDER BY id DESC", (rs, i) -> new Media(rs.getInt("id"), rs.getString("title"), rs.getString("url"), rs.getTimestamp("created_at").toString()));
    }

    public List<Media> listImages(){
        return jdbc.query("SELECT id, title, url, created_at FROM images ORDER BY id DESC", (rs, i) -> new Media(rs.getInt("id"), rs.getString("title"), rs.getString("url"), rs.getTimestamp("created_at").toString()));
    }

    public int addVideo(String title, String url){ return jdbc.update("INSERT INTO videos (title,url) VALUES (?,?)", title, url); }
    public int addImage(String title, String url){ return jdbc.update("INSERT INTO images (title,url) VALUES (?,?)", title, url); }

    public static class Media { public int id; public String title; public String url; public String created_at; public Media(int id,String title,String url,String created_at){this.id=id;this.title=title;this.url=url;this.created_at=created_at;} }
}
