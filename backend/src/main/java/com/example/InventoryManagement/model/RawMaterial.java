package com.example.InventoryManagement.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.UUID;

@Document(collection = "rawMaterial")
public class RawMaterial {

    @Id
    private String id; // Use String instead of UUID for compatibility with MongoDB
    private String rawMaterialCategoryName;
    private String rawMaterialProductName;
    private double rawMaterialProductPricePerKg;
    private double rawMaterialProductDensity;
    private double rawMaterialProductPreviousPrice;

    // Default constructor
    public RawMaterial() {
        this.id = UUID.randomUUID().toString(); // Generate a random String UUID for the id
    }

    // Getters and setters
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getRawMaterialCategoryName() {
        return rawMaterialCategoryName;
    }

    public void setRawMaterialCategoryName(String rawMaterialCategoryName) {
        this.rawMaterialCategoryName = rawMaterialCategoryName;
    }

    public String getRawMaterialProductName() {
        return rawMaterialProductName;
    }

    public void setRawMaterialProductName(String rawMaterialProductName) {
        this.rawMaterialProductName = rawMaterialProductName;
    }

    public double getRawMaterialProductPricePerKg() {
        return rawMaterialProductPricePerKg;
    }

    public void setRawMaterialProductPricePerKg(double rawMaterialProductPricePerKg) {
        this.rawMaterialProductPricePerKg = rawMaterialProductPricePerKg;
    }

    public double getRawMaterialProductDensity() {
        return rawMaterialProductDensity;
    }

    public void setRawMaterialProductDensity(double rawMaterialProductDensity) {
        this.rawMaterialProductDensity = rawMaterialProductDensity;
    }

    public double getRawMaterialProductPreviousPrice() {
        return rawMaterialProductPreviousPrice;
    }

    public void setRawMaterialProductPreviousPrice(double rawMaterialProductPreviousPrice) {
        this.rawMaterialProductPreviousPrice = rawMaterialProductPreviousPrice;
    }
}
