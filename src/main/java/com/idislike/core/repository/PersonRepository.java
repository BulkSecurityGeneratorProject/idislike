package com.idislike.core.repository;

import com.idislike.core.domain.Person;
import com.idislike.core.domain.Topic;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface PersonRepository extends JpaRepository<Person, Long> {

    List<Person> findByTopics(Topic topic);

}
