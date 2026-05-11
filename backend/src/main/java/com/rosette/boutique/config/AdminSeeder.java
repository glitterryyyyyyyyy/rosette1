package com.rosette.boutique.config;

import com.rosette.boutique.models.User;
import com.rosette.boutique.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.Collections;

@Component
@RequiredArgsConstructor
public class AdminSeeder implements CommandLineRunner {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Value("${admin.email:admin@rosette.com}")
    private String adminEmail;

    @Value("${admin.password:changeMe123}")
    private String adminPassword;

    @Override
    public void run(String... args) {

        userRepository.findByEmail(adminEmail)
                .ifPresent(userRepository::delete);

        User admin = User.builder()
                .email(adminEmail)
                .password(passwordEncoder.encode(adminPassword))
                .roles(Collections.singleton("ADMIN"))
                .build();

        userRepository.save(admin);

        System.out.println("✓ Fresh admin account created");
    }
}