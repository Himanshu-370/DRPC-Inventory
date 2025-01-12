package com.example.InventoryManagement.util;

import java.lang.reflect.Field;
import java.util.List;

public class ReflectionUtils {

    @SuppressWarnings("unchecked")
    public static <T, R> List<R> getField(T item, String fieldName) {
        try {
            System.out.println("Fetching field '" + fieldName + "' from class: " + item.getClass().getSimpleName());
            Field field = item.getClass().getDeclaredField(fieldName);
            field.setAccessible(true); // Access private fields
            Object value = field.get(item);

            if (value == null) {
                throw new RuntimeException(
                        "Field '" + fieldName + "' is null in class " + item.getClass().getSimpleName());
            }

            if (!(value instanceof List<?>)) {
                throw new RuntimeException(
                        "Field '" + fieldName + "' is not a List in class " + item.getClass().getSimpleName());
            }
            return (List<R>) value;
        } catch (NoSuchFieldException e) {
            throw new RuntimeException(
                    "Field '" + fieldName + "' does not exist in class " + item.getClass().getSimpleName(), e);
        } catch (IllegalAccessException e) {
            throw new RuntimeException(
                    "Error accessing field '" + fieldName + "' in class " + item.getClass().getSimpleName(), e);
        }
    }

    public static <T> void setField(T item, String fieldName, Object value) {
        try {
            Field field = item.getClass().getDeclaredField(fieldName);
            field.setAccessible(true);
            field.set(item, value);
        } catch (NoSuchFieldException e) {
            throw new RuntimeException("Field '" + fieldName + "' not found in class: " + item.getClass().getName(), e);
        } catch (IllegalAccessException e) {
            throw new RuntimeException("Error setting field '" + fieldName + "' in class: " + item.getClass().getName(),
                    e);
        }
    }
}
