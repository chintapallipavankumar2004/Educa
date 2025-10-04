package com.euca.seed;

import org.springframework.boot.CommandLineRunner;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;

@Component
public class SeedRunner implements CommandLineRunner {
    private final JdbcTemplate jdbc;
    public SeedRunner(JdbcTemplate jdbc){ this.jdbc = jdbc; }

    @Override
    public void run(String... args) throws Exception{
        var v = jdbc.queryForObject("SELECT COUNT(*) FROM videos", Integer.class);
        if(v == 0){
            jdbc.update("INSERT INTO videos (title,url) VALUES (?,?)", "Intro to Mindful Breathing","https://www.youtube.com/watch?v=inpok4MKVLM");
            jdbc.update("INSERT INTO videos (title,url) VALUES (?,?)", "5 Minute Relaxation","https://www.youtube.com/watch?v=ZToicYcHIOU");
            jdbc.update("INSERT INTO videos (title,url) VALUES (?,?)", "Guided Sleep Meditation","https://www.youtube.com/watch?v=1vx8iUvfyCY");
        }

        var i = jdbc.queryForObject("SELECT COUNT(*) FROM images", Integer.class);
        if(i == 0){
            jdbc.update("INSERT INTO images (title,url) VALUES (?,?)", "Calm Lake","https://images.pexels.com/photos/1089438/pexels-photo-1089438.jpeg");
            jdbc.update("INSERT INTO images (title,url) VALUES (?,?)", "Soft Sunset","https://images.pexels.com/photos/462353/pexels-photo-462353.jpeg");
        }
    }
}
