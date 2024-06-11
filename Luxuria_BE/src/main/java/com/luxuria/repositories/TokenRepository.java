package com.luxuria.repositories;

import com.luxuria.models.Token;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface TokenRepository extends JpaRepository<Token, Long> {

    @Query("SELECT t FROM Token t WHERE t.user.id = :user_id AND t.expired = false ")
    List<Token> findAllValidTokensByUser(@Param("user_id") Long userId);

    Optional<Token> findByToken(String token);
}
