package com.player.music.repository;

import com.player.music.model.PlayHistory;
import com.player.music.model.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PlayHistoryRepository extends JpaRepository<PlayHistory, Long> {
    
    List<PlayHistory> findByUser(User user);
    
    Page<PlayHistory> findByUser(User user, Pageable pageable);
    
    List<PlayHistory> findByUserId(Long userId);
    
    Page<PlayHistory> findByUserId(Long userId, Pageable pageable);
    
    @Query("SELECT ph FROM PlayHistory ph WHERE ph.user.id = :userId ORDER BY ph.playedAt DESC")
    Page<PlayHistory> findRecentlyPlayedByUserId(@Param("userId") Long userId, Pageable pageable);
} 