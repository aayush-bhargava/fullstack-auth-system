package com.aifinance.authservice.controller;

import com.aifinance.authservice.service.AuthService;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class AuthController {

    private final AuthService authService;

    @PostMapping("/signup")
    public String signup(@RequestBody SignupRequest req) {
        return authService.signup(req.fullName, req.email, req.password);
    }

    @PostMapping("/login")
    public TokenResponse login(@RequestBody LoginRequest req) {
        String token = authService.login(req.email, req.password);
        return new TokenResponse(token);
    }
}

@Data class SignupRequest {
    String fullName;
    String email;
    String password;
}

@Data class LoginRequest {
    String email;
    String password;
}

@Data class TokenResponse {
    private final String token;
}
