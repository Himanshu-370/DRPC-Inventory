package com.example.InventoryManagement.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.UUID;

@Document
public class ProductComponent {
    @Id
    private String id;
    private String ProductComponentName;
    private double ProductComponentQuantity;
    private double ProductComponentPricePerKg;
    private double ProductComponentNetPrice;
    private String rawMaterialId;

    public ProductComponent() {
        this.id = UUID.randomUUID().toString();
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getProductComponentName() {
        return ProductComponentName;
    }

    public void setProductComponentName(String ProductComponentName) {
        this.ProductComponentName = ProductComponentName;
    }

    public double getProductComponentQuantity() {
        return ProductComponentQuantity;
    }

    public void setProductComponentQuantity(double ProductComponentQuantity) {
        this.ProductComponentQuantity = ProductComponentQuantity;
    }

    public double getProductComponentPricePerKg() {
        return ProductComponentPricePerKg;
    }

    public void setProductComponentPricePerKg(double ProductComponentPricePerKg) {
        this.ProductComponentPricePerKg = ProductComponentPricePerKg;
    }

    public double getProductComponentNetPrice() {
        return ProductComponentNetPrice;
    }

    public void setProductComponentNetPrice(double ProductComponentNetPrice) {
        this.ProductComponentNetPrice = ProductComponentNetPrice;
    }

    public String getRawMaterialId() {
        return rawMaterialId;
    }

    public void setRawMaterialId(String rawMaterialId) {
        this.rawMaterialId = rawMaterialId;
    }
}
