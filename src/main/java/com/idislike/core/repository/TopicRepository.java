package com.idislike.core.repository;

import com.idislike.core.domain.Topic;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TopicRepository extends JpaRepository<Topic, Long> {

    Topic findByName(String name);

}
