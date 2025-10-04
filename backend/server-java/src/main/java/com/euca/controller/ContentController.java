package com.euca.controller;

import java.util.Map;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.euca.dao.ContentDao;

@RestController
@RequestMapping("/api")
public class ContentController {
    private final ContentDao dao;
    public ContentController(ContentDao dao){ this.dao = dao; }

    @GetMapping("/videos")
    public Map<String,Object> videos(){ return Map.of("ok", true, "videos", dao.listVideos()); }

    @GetMapping("/images")
    public Map<String,Object> images(){ return Map.of("ok", true, "images", dao.listImages()); }
}
