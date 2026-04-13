package com.japaneselearn;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
@EnableJpaAuditing
public class JapaneseLearnApplication {
    public static void main(String[] args) {
        SpringApplication.run(JapaneseLearnApplication.class, args);
    }
}
