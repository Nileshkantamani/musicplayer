package com.player.music.controller;

import com.player.music.model.Favorite;
import com.player.music.model.Song;
import com.player.music.model.User;
import com.player.music.repository.FavoriteRepository;
import com.player.music.repository.SongRepository;
import com.player.music.repository.UserRepository;
import com.player.music.security.services.UserDetailsImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

// CORS is configured globally in WebMvcConfig
@RestController
@RequestMapping("/api/favorites")
public class FavoriteController {
    
    @Autowired
    private FavoriteRepository favoriteRepository;
    
    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private SongRepository songRepository;
    
    // Get favorite songs for current user with pagination
    @GetMapping
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<Map<String, Object>> getUserFavorites(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "createdAt") String sortBy,
            @RequestParam(defaultValue = "desc") String direction) {
        
        UserDetailsImpl userDetails = (UserDetailsImpl) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        User user = userRepository.findById(userDetails.getId()).orElseThrow(() -> new RuntimeException("User not found"));
        
        Sort.Direction sortDirection = direction.equalsIgnoreCase("desc") ? Sort.Direction.DESC : Sort.Direction.ASC;
        Pageable pageable = PageRequest.of(page, size, Sort.by(sortDirection, sortBy));
        
        Page<Favorite> pageResult = favoriteRepository.findByUser(user, pageable);
        
        Map<String, Object> response = new HashMap<>();
        response.put("favorites", pageResult.getContent());
        response.put("currentPage", pageResult.getNumber());
        response.put("totalItems", pageResult.getTotalElements());
        response.put("totalPages", pageResult.getTotalPages());
        
        return ResponseEntity.ok(response);
    }
    
    // Add song to favorites
    @PostMapping("/songs/{songId}")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<?> addToFavorites(@PathVariable Long songId) {
        UserDetailsImpl userDetails = (UserDetailsImpl) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        User user = userRepository.findById(userDetails.getId()).orElseThrow(() -> new RuntimeException("User not found"));
        
        Song song = songRepository.findById(songId)
                .orElseThrow(() -> new RuntimeException("Song not found"));
        
        // Check if already in favorites
        if (favoriteRepository.existsByUserAndSong(user, song)) {
            return ResponseEntity.badRequest().body("Song is already in favorites");
        }
        
        Favorite favorite = new Favorite();
        favorite.setUser(user);
        favorite.setSong(song);
        
        favoriteRepository.save(favorite);
        return ResponseEntity.ok().build();
    }
    
    // Remove song from favorites
    @DeleteMapping("/songs/{songId}")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<?> removeFromFavorites(@PathVariable Long songId) {
        UserDetailsImpl userDetails = (UserDetailsImpl) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        User user = userRepository.findById(userDetails.getId()).orElseThrow(() -> new RuntimeException("User not found"));
        
        Song song = songRepository.findById(songId)
                .orElseThrow(() -> new RuntimeException("Song not found"));
        
        // Find and delete favorite
        favoriteRepository.findByUserAndSong(user, song)
                .ifPresent(favorite -> favoriteRepository.delete(favorite));
        
        return ResponseEntity.ok().build();
    }
    
    // Check if a song is in the user's favorites
    @GetMapping("/songs/{songId}")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<Boolean> checkFavorite(@PathVariable Long songId) {
        UserDetailsImpl userDetails = (UserDetailsImpl) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        User user = userRepository.findById(userDetails.getId()).orElseThrow(() -> new RuntimeException("User not found"));
        
        Song song = songRepository.findById(songId)
                .orElseThrow(() -> new RuntimeException("Song not found"));
        
        boolean isFavorite = favoriteRepository.existsByUserAndSong(user, song);
        return ResponseEntity.ok(isFavorite);
    }
}