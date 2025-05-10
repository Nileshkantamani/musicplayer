package com.player.music.repository;

import com.player.music.model.Playlist;
import com.player.music.model.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PlaylistRepository extends JpaRepository<Playlist, Long> {
    
    List<Playlist> findByUser(User user);
    
    Page<Playlist> findByUser(User user, Pageable pageable);
    
    List<Playlist> findByUserId(Long userId);
    
    Page<Playlist> findByUserId(Long userId, Pageable pageable);
    
    @Query("SELECT p FROM Playlist p WHERE LOWER(p.name) LIKE LOWER(CONCAT('%', :keyword, '%'))")
    Page<Playlist> searchByName(@Param("keyword") String keyword, Pageable pageable);
    
    @Query("SELECT p FROM Playlist p WHERE p.user.id = :userId AND LOWER(p.name) LIKE LOWER(CONCAT('%', :keyword, '%'))")
    Page<Playlist> searchByNameAndUserId(@Param("keyword") String keyword, @Param("userId") Long userId, Pageable pageable);
} 