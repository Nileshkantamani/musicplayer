package com.player.music.controller;

import com.player.music.model.Playlist;
import com.player.music.model.Song;
import com.player.music.model.User;
import com.player.music.repository.PlaylistRepository;
import com.player.music.repository.SongRepository;
import com.player.music.repository.UserRepository;
import com.player.music.security.services.UserDetailsImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

// CORS is configured globally in WebMvcConfig
@RestController
@RequestMapping("/api/playlists")
public class PlaylistController {
    
    @Autowired
    private PlaylistRepository playlistRepository;
    
    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private SongRepository songRepository;
    
    // Get all playlists for current user
    @GetMapping
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<List<Playlist>> getUserPlaylists() {
        UserDetailsImpl userDetails = (UserDetailsImpl) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        User user = userRepository.findById(userDetails.getId()).orElseThrow(() -> new RuntimeException("User not found"));
        
        List<Playlist> playlists = playlistRepository.findByUser(user);
        return ResponseEntity.ok(playlists);
    }
    
    // Get playlist by ID
    @GetMapping("/{id}")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<?> getPlaylistById(@PathVariable Long id) {
        UserDetailsImpl userDetails = (UserDetailsImpl) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        
        return playlistRepository.findById(id)
                .map(playlist -> {
                    // Check if the playlist belongs to the current user or is public
                    if (playlist.getUser().getId().equals(userDetails.getId())) {
                        return ResponseEntity.ok(playlist);
                    } else {
                        return ResponseEntity.status(403).build();
                    }
                })
                .orElse(ResponseEntity.notFound().build());
    }
    
    // Create new playlist
    @PostMapping
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<Playlist> createPlaylist(@RequestBody Playlist playlistRequest) {
        UserDetailsImpl userDetails = (UserDetailsImpl) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        User user = userRepository.findById(userDetails.getId()).orElseThrow(() -> new RuntimeException("User not found"));
        
        Playlist playlist = new Playlist();
        playlist.setName(playlistRequest.getName());
        playlist.setDescription(playlistRequest.getDescription());
        playlist.setUser(user);
        playlist.setSongs(new HashSet<>());
        
        Playlist savedPlaylist = playlistRepository.save(playlist);
        return ResponseEntity.ok(savedPlaylist);
    }
    
    // Update playlist details
    @PutMapping("/{id}")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<?> updatePlaylist(@PathVariable Long id, @RequestBody Playlist playlistDetails) {
        UserDetailsImpl userDetails = (UserDetailsImpl) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        
        return playlistRepository.findById(id)
                .map(playlist -> {
                    // Check if the playlist belongs to the current user
                    if (!playlist.getUser().getId().equals(userDetails.getId())) {
                        return ResponseEntity.status(403).build();
                    }
                    
                    playlist.setName(playlistDetails.getName());
                    playlist.setDescription(playlistDetails.getDescription());
                    // Don't update user or songs here
                    
                    return ResponseEntity.ok(playlistRepository.save(playlist));
                })
                .orElse(ResponseEntity.notFound().build());
    }
    
    // Delete playlist
    @DeleteMapping("/{id}")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<?> deletePlaylist(@PathVariable Long id) {
        UserDetailsImpl userDetails = (UserDetailsImpl) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        
        return playlistRepository.findById(id)
                .map(playlist -> {
                    // Check if the playlist belongs to the current user
                    if (!playlist.getUser().getId().equals(userDetails.getId())) {
                        return ResponseEntity.status(403).build();
                    }
                    
                    playlistRepository.delete(playlist);
                    return ResponseEntity.ok().build();
                })
                .orElse(ResponseEntity.notFound().build());
    }
    
    // Add song to playlist
    @PostMapping("/{playlistId}/songs/{songId}")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<Playlist> addSongToPlaylist(@PathVariable Long playlistId, @PathVariable Long songId) {
        UserDetailsImpl userDetails = (UserDetailsImpl) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        
        Playlist playlist = playlistRepository.findById(playlistId)
                .orElseThrow(() -> new RuntimeException("Playlist not found"));
        
        // Check if the playlist belongs to the current user
        if (!playlist.getUser().getId().equals(userDetails.getId())) {
            return ResponseEntity.status(403).build();
        }
        
        Song song = songRepository.findById(songId)
                .orElseThrow(() -> new RuntimeException("Song not found"));
        
        playlist.getSongs().add(song);
        return ResponseEntity.ok(playlistRepository.save(playlist));
    }
    
    // Remove song from playlist
    @DeleteMapping("/{playlistId}/songs/{songId}")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<Playlist> removeSongFromPlaylist(@PathVariable Long playlistId, @PathVariable Long songId) {
        UserDetailsImpl userDetails = (UserDetailsImpl) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        
        Playlist playlist = playlistRepository.findById(playlistId)
                .orElseThrow(() -> new RuntimeException("Playlist not found"));
        
        // Check if the playlist belongs to the current user
        if (!playlist.getUser().getId().equals(userDetails.getId())) {
            return ResponseEntity.status(403).build();
        }
        
        Song song = songRepository.findById(songId)
                .orElseThrow(() -> new RuntimeException("Song not found"));
        
        playlist.getSongs().remove(song);
        return ResponseEntity.ok(playlistRepository.save(playlist));
    }
}