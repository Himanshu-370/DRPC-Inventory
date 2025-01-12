package com.example.InventoryManagement.repository;

import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public class GenericRepository {

    private final MongoTemplate mongoTemplate;

    public GenericRepository(MongoTemplate mongoTemplate) {
        this.mongoTemplate = mongoTemplate;
    }

    public <T> List<T> findAll(Class<T> clazz) {
        return mongoTemplate.findAll(clazz);
    }

    public <T> Optional<T> findById(String id, Class<T> clazz) {
        return Optional.ofNullable(mongoTemplate.findById(id, clazz));
    }

    public <T> T save(T item) {
        return mongoTemplate.save(item);
    }

    public <T> void delete(String id, Class<T> clazz) {
        T item = mongoTemplate.findById(id, clazz);
        if (item != null) {
            mongoTemplate.remove(item);
        }
    }

    public <T> List<T> findByIds(List<String> ids, Class<T> clazz) {
        Query query = new Query();
        query.addCriteria(Criteria.where("_id").in(ids));
        return mongoTemplate.find(query, clazz);
    }
}
