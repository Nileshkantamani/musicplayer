package com.player.music.repository;

import com.player.music.model.Album;
import com.player.music.model.Artist;
import com.player.music.model.Song;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SongRepository extends JpaRepository<Song, Long> {
    
    Page<Song> findByArtist(Artist artist, Pageable pageable);
    
    Page<Song> findByAlbum(Album album, Pageable pageable);
    
    Page<Song> findByGenre(String genre, Pageable pageable);
    
    @Query("SELECT s FROM Song s WHERE LOWER(s.title) LIKE LOWER(CONCAT('%', :keyword, '%'))")
    Page<Song> searchByTitle(@Param("keyword") String keyword, Pageable pageable);
    
    @Query("SELECT s FROM Song s WHERE LOWER(s.artist.name) LIKE LOWER(CONCAT('%', :keyword, '%'))")
    Page<Song> searchByArtistName(@Param("keyword") String keyword, Pageable pageable);
    
    @Query("SELECT s FROM Song s WHERE LOWER(s.album.title) LIKE LOWER(CONCAT('%', :keyword, '%'))")
    Page<Song> searchByAlbumTitle(@Param("keyword") String keyword, Pageable pageable);
    
    @Query("SELECT s FROM Song s WHERE " +
           "LOWER(s.title) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
           "LOWER(s.artist.name) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
           "LOWER(s.album.title) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
           "LOWER(s.genre) LIKE LOWER(CONCAT('%', :keyword, '%'))")
    Page<Song> search(@Param("keyword") String keyword, Pageable pageable);
} 