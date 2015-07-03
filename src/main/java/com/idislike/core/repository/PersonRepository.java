package com.idislike.core.repository;

import com.idislike.core.domain.Person;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

/**
 * Spring Data JPA repository for the Person entity.
 */
public interface PersonRepository extends JpaRepository<Person, Long> {

}
