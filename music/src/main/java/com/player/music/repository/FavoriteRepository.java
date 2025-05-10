package com.player.music.repository;

import com.player.music.model.Favorite;
import com.player.music.model.Song;
import com.player.music.model.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface FavoriteRepository extends JpaRepository<Favorite, Long> {
    
    List<Favorite> findByUser(User user);
    
    Page<Favorite> findByUser(User user, Pageable pageable);
    
    List<Favorite> findByUserId(Long userId);
    
    Page<Favorite> findByUserId(Long userId, Pageable pageable);
    
    Optional<Favorite> findByUserAndSong(User user, Song song);
    
    boolean existsByUserAndSong(User user, Song song);
    
    void deleteByUserAndSong(User user, Song song);
} 