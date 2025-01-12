package com.example.InventoryManagement.service;

import com.example.InventoryManagement.repository.GenericRepository;
import com.example.InventoryManagement.util.ReflectionUtils;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import java.lang.reflect.Field;

import java.util.List;
import java.util.Optional;

@Service
public class GenericService {

    private final GenericRepository genericRepository;

    public GenericService(GenericRepository genericRepository) {
        this.genericRepository = genericRepository;
    }

    public <T> List<T> getAll(Class<T> clazz) {
        return genericRepository.findAll(clazz);
    }

    public <T> List<T> findAll(Class<T> clazz) {
        return genericRepository.findAll(clazz);
    }

    public <T> ResponseEntity<T> getById(String id, Class<T> clazz) {
        Optional<T> item = genericRepository.findById(id, clazz);
        return item.map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    public <T> T save(T item) {
        return genericRepository.save(item);
    }

    public <T> T update(String id, T entity, Class<T> clazz) {
        T existingEntity = genericRepository.findById(id, clazz)
                .orElseThrow(() -> new RuntimeException(clazz.getSimpleName() + " not found with id: " + id));

        ReflectionUtils.setField(entity, "id", id);
        return genericRepository.save(entity);
    }

    public <T> ResponseEntity<Void> delete(String id, Class<T> clazz) {
        Optional<T> item = genericRepository.findById(id, clazz);
        if (item.isPresent()) {
            genericRepository.delete(id, clazz);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    public <T, R> List<R> getEmbeddedItems(String id, Class<T> parentClazz, Class<R> childClazz, String fieldName) {
        System.out.println(
                "Fetching embedded items for field: " + fieldName + " in parent class: " + parentClazz.getSimpleName());

        Optional<T> parentEntityOptional = genericRepository.findById(id, parentClazz);
        if (!parentEntityOptional.isPresent()) {
            System.out.println("LibraryProduct not found with id: " + id);
            throw new RuntimeException(parentClazz.getSimpleName() + " not found with id: " + id);
        }

        T parentEntity = parentEntityOptional.get();
        Object field = ReflectionUtils.getField(parentEntity, fieldName);

        if (field == null || !(field instanceof List<?>)) {
            throw new RuntimeException("Field '" + fieldName + "' is either null or not a List in parent class "
                    + parentClazz.getSimpleName());
        }

        @SuppressWarnings("unchecked")
        List<R> embeddedItems = (List<R>) field;

        System.out.println("Embedded items retrieved: " + embeddedItems);
        return embeddedItems;
    }

    public <T, R> ResponseEntity<Void> addEmbeddedItem(String id, R newItem, Class<T> parentClazz, String fieldName) {
        T parentEntity = genericRepository.findById(id, parentClazz)
                .orElseThrow(() -> new RuntimeException(parentClazz.getSimpleName() + " not found with id: " + id));

        List<R> embeddedItems = ReflectionUtils.getField(parentEntity, fieldName);

        if (embeddedItems == null) {
            throw new RuntimeException("Embedded list is null for field: " + fieldName);
        }

        embeddedItems.add(newItem);
        ReflectionUtils.setField(parentEntity, fieldName, embeddedItems);
        genericRepository.save(parentEntity);

        return ResponseEntity.ok().build();
    }

    public <T, R> ResponseEntity<Void> updateEmbeddedItem(String parentId, String embeddedId, R updatedItem,
            Class<T> parentClazz, String fieldName) {
        T parentEntity = genericRepository.findById(parentId, parentClazz)
                .orElseThrow(
                        () -> new RuntimeException(parentClazz.getSimpleName() + " not found with id: " + parentId));

        List<R> embeddedItems = ReflectionUtils.getField(parentEntity, fieldName);

        if (embeddedItems == null) {
            throw new RuntimeException("Field '" + fieldName + "' is null in parent entity.");
        }

        boolean itemUpdated = false;

        for (int i = 0; i < embeddedItems.size(); i++) {
            R currentItem = embeddedItems.get(i);

            // Directly access the "id" field using Java reflection
            try {
                Field idField = currentItem.getClass().getDeclaredField("id");
                idField.setAccessible(true);
                String currentItemId = (String) idField.get(currentItem);

                if (currentItemId.equals(embeddedId)) {
                    // Update the item
                    idField.set(updatedItem, embeddedId); // Ensure the updated item retains the same ID
                    embeddedItems.set(i, updatedItem);
                    itemUpdated = true;
                    break;
                }
            } catch (NoSuchFieldException | IllegalAccessException e) {
                throw new RuntimeException("Error accessing 'id' field in embedded item: " + e.getMessage(), e);
            }
        }

        if (!itemUpdated) {
            throw new RuntimeException("Embedded item not found with id: " + embeddedId);
        }

        // Save the parent entity with the updated embedded list
        ReflectionUtils.setField(parentEntity, fieldName, embeddedItems);
        genericRepository.save(parentEntity);

        return ResponseEntity.ok().build();
    }

    public <T> ResponseEntity<Void> removeEmbeddedItem(String parentId, String embeddedId, Class<T> parentClazz,
            String fieldName) {
        // Fetch the parent entity
        T parentEntity = genericRepository.findById(parentId, parentClazz)
                .orElseThrow(
                        () -> new RuntimeException(parentClazz.getSimpleName() + " not found with id: " + parentId));

        // Fetch the embedded items list
        List<?> embeddedItems = ReflectionUtils.getField(parentEntity, fieldName);

        if (embeddedItems == null) {
            throw new RuntimeException("Field '" + fieldName + "' is null for parent entity.");
        }

        // Remove the item with the matching id
        boolean removed = embeddedItems.removeIf(item -> {
            try {
                Field idField = item.getClass().getDeclaredField("id");
                idField.setAccessible(true); // Access the private id field
                String currentItemId = (String) idField.get(item);
                return currentItemId.equals(embeddedId); // Match the ID
            } catch (NoSuchFieldException | IllegalAccessException e) {
                throw new RuntimeException("Error accessing 'id' field in embedded item: " + e.getMessage(), e);
            }
        });

        if (!removed) {
            throw new RuntimeException("Embedded item not found with id: " + embeddedId);
        }

        // Save the parent entity with the updated embedded list
        ReflectionUtils.setField(parentEntity, fieldName, embeddedItems);
        genericRepository.save(parentEntity);

        return ResponseEntity.ok().build();
    }

}
