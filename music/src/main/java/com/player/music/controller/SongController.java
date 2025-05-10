package com.player.music.controller;

import com.player.music.model.PlayHistory;
import com.player.music.model.Song;
import com.player.music.model.User;
import com.player.music.repository.PlayHistoryRepository;
import com.player.music.repository.SongRepository;
import com.player.music.repository.UserRepository;
import com.player.music.security.services.UserDetailsImpl;
import com.player.music.util.FileUploadUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.HashMap;
import java.util.Map;

// CORS is configured globally in WebMvcConfig
@RestController
@RequestMapping("/api/songs")
public class SongController {
    
    @Autowired
    private SongRepository songRepository;
    
    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private PlayHistoryRepository playHistoryRepository;
    
    @Autowired
    private FileUploadUtil fileUploadUtil;
    
    @Value("${file.upload-dir}")
    private String uploadDir;
    
    // Get all songs with pagination
    @GetMapping
    public ResponseEntity<Map<String, Object>> getAllSongs(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "id") String sortBy,
            @RequestParam(defaultValue = "asc") String direction) {
        
        Sort.Direction sortDirection = direction.equalsIgnoreCase("desc") ? Sort.Direction.DESC : Sort.Direction.ASC;
        Pageable pageable = PageRequest.of(page, size, Sort.by(sortDirection, sortBy));
        
        Page<Song> pageResult = songRepository.findAll(pageable);
        
        Map<String, Object> response = new HashMap<>();
        response.put("songs", pageResult.getContent());
        response.put("currentPage", pageResult.getNumber());
        response.put("totalItems", pageResult.getTotalElements());
        response.put("totalPages", pageResult.getTotalPages());
        
        return ResponseEntity.ok(response);
    }
    
    // Get song by ID
    @GetMapping("/{id}")
    public ResponseEntity<Song> getSongById(@PathVariable Long id) {
        return songRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    
    // Upload a new song (admin only)
    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Song> uploadSong(
            @RequestPart("song") Song song,
            @RequestPart("file") MultipartFile file) {
        
        try {
            String fileName = fileUploadUtil.saveFile(uploadDir, file);
            song.setFilePath(fileName);
            Song savedSong = songRepository.save(song);
            return ResponseEntity.ok(savedSong);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
    
    // Update song details (admin only)
    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Song> updateSong(@PathVariable Long id, @RequestBody Song songDetails) {
        return songRepository.findById(id)
                .map(song -> {
                    song.setTitle(songDetails.getTitle());
                    song.setGenre(songDetails.getGenre());
                    song.setDurationSeconds(songDetails.getDurationSeconds());
                    // Don't update file path or relationships here
                    return ResponseEntity.ok(songRepository.save(song));
                })
                .orElse(ResponseEntity.notFound().build());
    }
    
    // Delete a song (admin only)
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> deleteSong(@PathVariable Long id) {
        return songRepository.findById(id)
                .map(song -> {
                    // Also delete the file
                    if (song.getFilePath() != null) {
                        fileUploadUtil.deleteFile(uploadDir, song.getFilePath());
                    }
                    songRepository.delete(song);
                    return ResponseEntity.ok().build();
                })
                .orElse(ResponseEntity.notFound().build());
    }
    
    // Search songs
    @GetMapping("/search")
    public ResponseEntity<Map<String, Object>> searchSongs(
            @RequestParam String query,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        
        Pageable pageable = PageRequest.of(page, size);
        Page<Song> pageResult = songRepository.search(query, pageable);
        
        Map<String, Object> response = new HashMap<>();
        response.put("songs", pageResult.getContent());
        response.put("currentPage", pageResult.getNumber());
        response.put("totalItems", pageResult.getTotalElements());
        response.put("totalPages", pageResult.getTotalPages());
        
        return ResponseEntity.ok(response);
    }
    
    // Stream a song
    @GetMapping("/{id}/stream")
    public ResponseEntity<?> streamSong(@PathVariable Long id) {
        return songRepository.findById(id)
                .map(song -> {
                    // Log play history for authenticated users
                    Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
                    if (authentication != null && authentication.isAuthenticated() && 
                            authentication.getPrincipal() instanceof UserDetailsImpl) {
                        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
                        User user = userRepository.findById(userDetails.getId()).orElse(null);
                        if (user != null) {
                            PlayHistory playHistory = new PlayHistory();
                            playHistory.setUser(user);
                            playHistory.setSong(song);
                            playHistoryRepository.save(playHistory);
                        }
                    }
                    
                    try {
                        Resource resource = fileUploadUtil.loadFileAsResource(uploadDir, song.getFilePath());
                        return ResponseEntity.ok()
                                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + resource.getFilename() + "\"")
                                .contentType(MediaType.APPLICATION_OCTET_STREAM)
                                .body(resource);
                    } catch (Exception e) {
                        return ResponseEntity.notFound().build();
                    }
                })
                .orElse(ResponseEntity.notFound().build());
    }
    
    // Get songs by genre
    @GetMapping("/genre/{genre}")
    public ResponseEntity<Map<String, Object>> getSongsByGenre(
            @PathVariable String genre,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        
        Pageable pageable = PageRequest.of(page, size);
        Page<Song> pageResult = songRepository.findByGenre(genre, pageable);
        
        Map<String, Object> response = new HashMap<>();
        response.put("songs", pageResult.getContent());
        response.put("currentPage", pageResult.getNumber());
        response.put("totalItems", pageResult.getTotalElements());
        response.put("totalPages", pageResult.getTotalPages());
        
        return ResponseEntity.ok(response);
    }
} 