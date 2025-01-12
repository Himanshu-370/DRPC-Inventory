package com.example.InventoryManagement.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Document
public class LibraryProduct {
    @Id
    private String id;
    private String ProductName;
    private String ProductDescription;
    private double ProductPricePerKg;
    private List<ProductComponent> productComponents = new ArrayList<>();

    public LibraryProduct() {
        this.id = UUID.randomUUID().toString(); 
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getProductName() {
        return ProductName;
    }

    public void setProductName(String ProductName) {
        this.ProductName = ProductName;
    }

    public String getProductDescription() {
        return ProductDescription;
    }

    public void setProductDescription(String ProductDescription) {
        this.ProductDescription = ProductDescription;
    }

    public double getProductPricePerKg() {
        return ProductPricePerKg;
    }

    public void setProductPricePerKg(double ProductPricePerKg) {
        this.ProductPricePerKg = ProductPricePerKg;
    }

    public List<ProductComponent> getProductComponents() {
        return productComponents;
    }

    public void setProductComponents(List<ProductComponent> productComponents) {
        this.productComponents = productComponents;
    }
}
