package com.aifinance.authservice;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication   // this must scan all sub-packages
public class AuthServiceApplication {

    public static void main(String[] args) {
        SpringApplication.run(AuthServiceApplication.class, args);

        System.out.println("=====================================");
        System.out.println("AuthService started successfully!");
        System.out.println("SecurityConfig is ACTIVE!");
        System.out.println("=====================================");
    }
}