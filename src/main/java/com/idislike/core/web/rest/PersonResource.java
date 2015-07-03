package com.idislike.core.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.idislike.core.domain.Person;
import com.idislike.core.domain.Topic;
import com.idislike.core.repository.PersonRepository;
import com.idislike.core.repository.TopicRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.inject.Inject;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/app")
public class PersonResource {

    private final Logger log = LoggerFactory.getLogger(PersonResource.class);

    @Inject
    private PersonRepository personRepository;

    @Inject
    private TopicRepository topicRepository;

    /**
     * POST  /rest/persons -> Create a new person.
     */
    @RequestMapping(value = "/rest/persons",
            method = RequestMethod.POST,
            produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public void create(@RequestBody Person person) {
        log.debug("REST request to save Person : {}", person);
        personRepository.save(person);
    }

    /**
     * GET  /rest/persons -> get all the persons.
     */
    @RequestMapping(value = "/rest/persons",
            method = RequestMethod.GET,
            produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public List<Person> getAll() {
        log.debug("REST request to get all Persons");
        return personRepository.findAll();
    }

    /**
     * GET  /rest/persons/:id -> get the "id" person.
     */
    @RequestMapping(value = "/rest/persons/{id}",
            method = RequestMethod.GET,
            produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<Person> get(@PathVariable Long id) {
        log.debug("REST request to get Person : {}", id);
        return Optional.ofNullable(personRepository.findOne(id))
            .map(person -> new ResponseEntity<>(
                person,
                HttpStatus.OK))
            .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    /**
     * GET  /rest/persons/:id -> get the "id" person.
     */
    @RequestMapping(value = "/rest/persons/topics/{topic}",
            method = RequestMethod.GET,
            produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public List<Person> getByTopic(@PathVariable String topic) {
        log.debug("REST request to get Person by topic: {}", topic);
        return personRepository.findByTopics(topicRepository.findByName(topic));
    }

    /**
     * DELETE  /rest/persons/:id -> delete the "id" person.
     */
    @RequestMapping(value = "/rest/persons/{id}",
            method = RequestMethod.DELETE,
            produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public void delete(@PathVariable Long id) {
        log.debug("REST request to delete Person : {}", id);
        personRepository.delete(id);
    }

    /**
     * PUT  /rest/persons/dislike/:id -> dislike the "id" person.
     */
    @RequestMapping(value = "/rest/persons/{id}",
            method = RequestMethod.PUT,
            produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public void dislike(@PathVariable Long id) {
        log.debug("REST request to delete Person : {}", id);
        Person person = personRepository.findOne(id);
        person.setScore(person.getScore() + 1);
        personRepository.save(person);
    }
}
