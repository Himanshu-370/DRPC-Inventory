package main.java.com.example.InventoryManagement.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Document(collection = "rawMaterialPriceHistory")
public class RawMaterialPriceHistory {

    @Id
    private String id; // Unique identifier for the history record
    private String rawMaterialId; // Reference to the raw material
    private String rawMaterialProductName;
    private double currentPrice; // Current price of the raw material
    private List<PriceRecord> priceHistory = new ArrayList<>();

    public RawMaterialPriceHistory() {
        this.id = UUID.randomUUID().toString();
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getRawMaterialId() {
        return rawMaterialId;
    }

    public void setRawMaterialId(String rawMaterialId) {
        this.rawMaterialId = rawMaterialId;
    }

    public String getRawMaterialProductName() {
        return rawMaterialProductName;
    }

    public void setRawMaterialProductName(String rawMaterialProductName) {
        this.rawMaterialProductName = rawMaterialProductName;
    }

    public double getCurrentPrice() {
        return currentPrice;
    }

    public void setCurrentPrice(double currentPrice) {
        this.currentPrice = currentPrice;
    }

    public List<PriceRecord> getPriceHistory() {
        return priceHistory;
    }

    public void setPriceHistory(List<PriceRecord> priceHistory) {
        this.priceHistory = priceHistory;
    }

    public static class PriceRecord {
        private double price;
        private LocalDateTime timestamp;

        public PriceRecord(double price, LocalDateTime timestamp) {
            this.price = price;
            this.timestamp = timestamp;
        }

        public double getPrice() {
            return price;
        }

        public void setPrice(double price) {
            this.price = price;
        }

        public LocalDateTime getTimestamp() {
            return timestamp;
        }

        public void setTimestamp(LocalDateTime timestamp) {
            this.timestamp = timestamp;
        }
    }
}
