package com.idislike.core.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.idislike.core.domain.Topic;
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
public class TopicResource {

    private final Logger log = LoggerFactory.getLogger(TopicResource.class);

    @Inject
    private TopicRepository topicRepository;

    /**
     * POST  /rest/topics -> Create a new topic.
     */
    @RequestMapping(value = "/rest/topics",
            method = RequestMethod.POST,
            produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public void create(@RequestBody Topic topic) {
        log.debug("REST request to save Topic : {}", topic);
        topicRepository.save(topic);
    }

    /**
     * GET  /rest/topics -> get all the topics.
     */
    @RequestMapping(value = "/rest/topics",
            method = RequestMethod.GET,
            produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public List<Topic> getAll() {
        log.debug("REST request to get all Topics");
        return topicRepository.findAll();
    }

    /**
     * GET  /rest/topics/:id -> get the "id" topic.
     */
    @RequestMapping(value = "/rest/topics/{id}",
            method = RequestMethod.GET,
            produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<Topic> get(@PathVariable Long id) {
        log.debug("REST request to get Topic : {}", id);
        return Optional.ofNullable(topicRepository.findOne(id))
                .map(topic -> new ResponseEntity<>(
                        topic,
                        HttpStatus.OK))
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    /**
     * DELETE  /rest/topics/:id -> delete the "id" topic.
     */
    @RequestMapping(value = "/rest/topics/{id}",
            method = RequestMethod.DELETE,
            produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public void delete(@PathVariable Long id) {
        log.debug("REST request to delete Topic : {}", id);
        topicRepository.delete(id);
    }

}
