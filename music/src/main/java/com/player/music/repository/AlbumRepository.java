package com.player.music.repository;

import com.player.music.model.Album;
import com.player.music.model.Artist;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AlbumRepository extends JpaRepository<Album, Long> {
    
    Page<Album> findByArtist(Artist artist, Pageable pageable);
    
    List<Album> findByArtistId(Long artistId);
    
    @Query("SELECT a FROM Album a WHERE LOWER(a.title) LIKE LOWER(CONCAT('%', :keyword, '%'))")
    Page<Album> searchByTitle(@Param("keyword") String keyword, Pageable pageable);
} 