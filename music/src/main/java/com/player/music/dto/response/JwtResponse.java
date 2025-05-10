package com.player.music.dto.response;

import lombok.Data;

import java.util.List;

@Data
public class JwtResponse {
    private String token;
    private String type = "Bearer";
    private String refreshToken;
    private Long id;
    private String username;
    private String email;
    private boolean isEmailVerified;
    private List<String> roles;

    public JwtResponse(String accessToken, String refreshToken, Long id, String username, String email, 
                      boolean isEmailVerified, List<String> roles) {
        this.token = accessToken;
        this.refreshToken = refreshToken;
        this.id = id;
        this.username = username;
        this.email = email;
        this.isEmailVerified = isEmailVerified;
        this.roles = roles;
    }
} 