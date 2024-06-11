package com.luxuria.repositories;

import com.luxuria.models.Gem;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GemRepository extends JpaRepository<Gem, Long> {
}
