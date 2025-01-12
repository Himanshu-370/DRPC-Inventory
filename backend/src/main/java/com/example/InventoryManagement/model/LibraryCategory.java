package com.example.InventoryManagement.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Document
public class LibraryCategory {

    @Id
    private String id;
    private String CategoryName;
    private String CategoryDescription;
    private List<LibraryProduct> libraryProducts = new ArrayList<>();

    public LibraryCategory() {
        this.id = UUID.randomUUID().toString();
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getCategoryName() {
        return CategoryName;
    }

    public void setCategoryName(String CategoryName) {
        this.CategoryName = CategoryName;
    }

    public String getCategoryDescription() {
        return CategoryDescription;
    }

    public void setCategoryDescription(String CategoryDescription) {
        this.CategoryDescription = CategoryDescription;
    }

    public List<LibraryProduct> getLibraryProducts() {
        return libraryProducts;
    }

    public void setLibraryProducts(List<LibraryProduct> libraryProducts) {
        this.libraryProducts = libraryProducts;
    }
}
