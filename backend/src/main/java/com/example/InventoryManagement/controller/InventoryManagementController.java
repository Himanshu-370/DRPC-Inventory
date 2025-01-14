package com.example.InventoryManagement.controller;

import com.example.InventoryManagement.model.*;
import com.example.InventoryManagement.service.GenericService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import io.github.cdimascio.dotenv.Dotenv;
import main.java.com.example.InventoryManagement.model.RawMaterialPriceHistory;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin
public class InventoryManagementController {

    private final GenericService genericService;
    private final Dotenv dotenv;

    @Autowired
    public InventoryManagementController(GenericService genericService) {
        this.genericService = genericService;
        this.dotenv = Dotenv.configure().load();
    }

    // --- APIs used in the frontend ---

    // Library Categories
    @GetMapping("/library-categories")
    public ResponseEntity<List<LibraryCategory>> getAllLibraryCategories() {
        List<LibraryCategory> categories = genericService.getAll(LibraryCategory.class);
        return ResponseEntity.ok(categories);
    }

    @PostMapping("/library-categories")
    public LibraryCategory createLibraryCategory(@RequestBody LibraryCategory category) {
        return genericService.save(category);
    }

    @PutMapping("/library-categories/{id}")
    public ResponseEntity<LibraryCategory> updateLibraryCategory(@PathVariable String id,
            @RequestBody LibraryCategory category) {
        return ResponseEntity.ok(genericService.update(id, category, LibraryCategory.class));
    }

    @DeleteMapping("/library-categories/{id}")
    public ResponseEntity<Void> deleteLibraryCategory(@PathVariable String id) {
        return genericService.delete(id, LibraryCategory.class);
    }

    @GetMapping("/library-categories/{id}/library-products")
    public List<LibraryProduct> getLibraryProductsInCategory(@PathVariable String id) {
        return genericService.getEmbeddedItems(id, LibraryCategory.class, LibraryProduct.class, "libraryProducts");
    }

    @PostMapping("/library-categories/{id}/library-products")
    public ResponseEntity<Void> addLibraryProductToCategory(@PathVariable String id,
            @RequestBody LibraryProduct product) {
        return genericService.addEmbeddedItem(id, product, LibraryCategory.class, "libraryProducts");
    }

    @PutMapping("/library-categories/{id}/library-products/{productId}")
    public ResponseEntity<Void> updateLibraryProductInCategory(@PathVariable String id, @PathVariable String productId,
            @RequestBody LibraryProduct product) {
        return genericService.updateEmbeddedItem(id, productId, product, LibraryCategory.class, "libraryProducts");
    }

    @DeleteMapping("/library-categories/{id}/library-products/{productId}")
    public ResponseEntity<Void> removeLibraryProductFromCategory(@PathVariable String id,
            @PathVariable String productId) {
        return genericService.removeEmbeddedItem(id, productId, LibraryCategory.class, "libraryProducts");
    }

    @GetMapping("/library-categories/{id}/library-products/{productId}/product-components")
    public List<ProductComponent> getProductComponentsInLibraryProduct(@PathVariable String id,
            @PathVariable String productId) {
        LibraryCategory category = genericService.getById(id, LibraryCategory.class).getBody();
        if (category == null) {
            throw new RuntimeException("LibraryCategory not found with id: " + id);
        }

        LibraryProduct product = category.getLibraryProducts().stream()
                .filter(p -> p.getId().equals(productId))
                .findFirst()
                .orElseThrow(() -> new RuntimeException("LibraryProduct not found with id: " + productId));

        return product.getProductComponents();
    }

    @PostMapping("/library-categories/{id}/library-products/{productId}/product-components")
    public ResponseEntity<Void> addProductComponentToLibraryProduct(
            @PathVariable String id,
            @PathVariable String productId,
            @RequestBody ProductComponent component) {

        // Link raw material by matching productComponentName with
        // rawMaterialProductName
        List<RawMaterial> rawMaterials = genericService.findAll(RawMaterial.class);
        for (RawMaterial rawMaterial : rawMaterials) {
            if (rawMaterial.getRawMaterialProductName().equalsIgnoreCase(component.getProductComponentName())) {
                component.setRawMaterialId(rawMaterial.getId());
                component.setProductComponentPricePerKg(rawMaterial.getRawMaterialProductPricePerKg());
                component.setProductComponentNetPrice(
                        component.getProductComponentQuantity() * rawMaterial.getRawMaterialProductPricePerKg());
                break;
            }
        }

        // Fetch and update the LibraryProduct
        LibraryCategory category = genericService.getById(id, LibraryCategory.class).getBody();
        if (category == null) {
            throw new RuntimeException("LibraryCategory not found with id: " + id);
        }

        LibraryProduct product = category.getLibraryProducts().stream()
                .filter(p -> p.getId().equals(productId))
                .findFirst()
                .orElseThrow(() -> new RuntimeException("LibraryProduct not found with id: " + productId));

        product.getProductComponents().add(component);
        genericService.update(id, category, LibraryCategory.class);

        return ResponseEntity.ok().build();
    }

    @PutMapping("/library-categories/{id}/library-products/{productId}/product-components/{componentId}")
    public ResponseEntity<Void> updateProductComponentInLibraryProduct(@PathVariable String id,
            @PathVariable String productId, @PathVariable String componentId, @RequestBody ProductComponent component) {
        LibraryCategory category = genericService.getById(id, LibraryCategory.class).getBody();
        if (category == null) {
            throw new RuntimeException("LibraryCategory not found with id: " + id);
        }

        LibraryProduct product = category.getLibraryProducts().stream()
                .filter(p -> p.getId().equals(productId))
                .findFirst()
                .orElseThrow(() -> new RuntimeException("LibraryProduct not found with id: " + productId));

        ProductComponent existingComponent = product.getProductComponents().stream()
                .filter(c -> c.getId().equals(componentId))
                .findFirst()
                .orElseThrow(() -> new RuntimeException("ProductComponent not found with id: " + componentId));

        existingComponent.setProductComponentName(component.getProductComponentName());
        existingComponent.setProductComponentQuantity(component.getProductComponentQuantity());
        existingComponent.setProductComponentPricePerKg(component.getProductComponentPricePerKg());
        existingComponent.setProductComponentNetPrice(component.getProductComponentNetPrice());

        genericService.update(id, category, LibraryCategory.class);

        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/library-categories/{id}/library-products/{productId}/product-components/{componentId}")
    public ResponseEntity<Void> removeProductComponentFromLibraryProduct(@PathVariable String id,
            @PathVariable String productId, @PathVariable String componentId) {
        LibraryCategory category = genericService.getById(id, LibraryCategory.class).getBody();
        if (category == null) {
            throw new RuntimeException("LibraryCategory not found with id: " + id);
        }

        LibraryProduct product = category.getLibraryProducts().stream()
                .filter(p -> p.getId().equals(productId))
                .findFirst()
                .orElseThrow(() -> new RuntimeException("LibraryProduct not found with id: " + productId));

        boolean removed = product.getProductComponents().removeIf(c -> c.getId().equals(componentId));
        if (!removed) {
            throw new RuntimeException("ProductComponent not found with id: " + componentId);
        }

        genericService.update(id, category, LibraryCategory.class);

        return ResponseEntity.ok().build();
    }

    // Library Products
    @GetMapping("/library-products/{id}/product-components")
    public List<ProductComponent> getProductComponentsInLibraryProduct(@PathVariable String id) {
        return genericService.getEmbeddedItems(id, LibraryProduct.class, ProductComponent.class, "productComponents");
    }

    @PostMapping("/library-products/{id}/product-components")
    public ResponseEntity<Void> addProductComponentToLibraryProduct(@PathVariable String id,
            @RequestBody ProductComponent component) {
        return genericService.addEmbeddedItem(id, component, LibraryProduct.class, "productComponents");
    }

    @PutMapping("/library-products/{id}/product-components/{componentId}")
    public ResponseEntity<Void> updateProductComponentInLibraryProduct(@PathVariable String id,
            @PathVariable String componentId, @RequestBody ProductComponent component) {
        return genericService.updateEmbeddedItem(id, componentId, component, LibraryProduct.class, "productComponents");
    }

    @DeleteMapping("/library-products/{id}/product-components/{componentId}")
    public ResponseEntity<Void> removeProductComponentFromLibraryProduct(@PathVariable String id,
            @PathVariable String componentId) {
        return genericService.removeEmbeddedItem(id, componentId, LibraryProduct.class, "productComponents");
    }

    // Raw Materials
    @GetMapping("/raw-materials")
    public ResponseEntity<List<RawMaterial>> getAllRawMaterials() {
        List<RawMaterial> rawMaterials = genericService.findAll(RawMaterial.class);
        return ResponseEntity.ok(rawMaterials);
    }

    @PostMapping("/raw-materials")
    public ResponseEntity<RawMaterial> createRawMaterial(@RequestBody RawMaterial rawMaterial) {
        RawMaterial savedRawMaterial = genericService.save(rawMaterial);
        return ResponseEntity.ok(savedRawMaterial);
    }

    @PutMapping("/raw-materials/{id}")
    public ResponseEntity<RawMaterial> updateRawMaterial(@PathVariable String id,
            @RequestBody RawMaterial rawMaterial) {
        ResponseEntity<RawMaterial> rawMaterialResponse = genericService.getById(id, RawMaterial.class);
        if (rawMaterialResponse.getBody() == null) {
            throw new RuntimeException("RawMaterial not found with id: " + id);
        }
        RawMaterial existingRawMaterial = rawMaterialResponse.getBody();

        // Update associated ProductComponents
        List<LibraryCategory> categories = genericService.findAll(LibraryCategory.class);
        for (LibraryCategory category : categories) {
            for (LibraryProduct product : category.getLibraryProducts()) {
                for (ProductComponent component : product.getProductComponents()) {
                    if (id.equals(component.getRawMaterialId())) {
                        component.setProductComponentPricePerKg(rawMaterial.getRawMaterialProductPricePerKg());
                        component.setProductComponentNetPrice(
                                component.getProductComponentQuantity()
                                        * rawMaterial.getRawMaterialProductPricePerKg());
                    }
                }
                genericService.update(category.getId(), category, LibraryCategory.class);
            }
        }

        // Update price history if the price has changed
        if (existingRawMaterial.getRawMaterialProductPricePerKg() != rawMaterial.getRawMaterialProductPricePerKg()) {
            RawMaterialPriceHistory history = genericService.findAll(RawMaterialPriceHistory.class).stream()
                    .filter(h -> h.getRawMaterialId().equals(id))
                    .findFirst()
                    .orElse(new RawMaterialPriceHistory());

            history.setRawMaterialId(id);
            history.setRawMaterialProductName(rawMaterial.getRawMaterialProductName());
            history.setCurrentPrice(rawMaterial.getRawMaterialProductPricePerKg());

            history.getPriceHistory().add(
                    new RawMaterialPriceHistory.PriceRecord(
                            existingRawMaterial.getRawMaterialProductPricePerKg(), LocalDateTime.now()));

            genericService.save(history);
        }

        // Update the raw material
        RawMaterial updatedRawMaterial = genericService.update(id, rawMaterial, RawMaterial.class);
        return ResponseEntity.ok(updatedRawMaterial);
    }

    @DeleteMapping("/raw-materials/{id}")
    public ResponseEntity<Void> deleteRawMaterial(@PathVariable String id) {
        return genericService.delete(id, RawMaterial.class);
    }

    @GetMapping("/raw-materials/price-history")
    public ResponseEntity<List<RawMaterialPriceHistory>> getAllRawMaterialPriceHistory() {
        List<RawMaterialPriceHistory> histories = genericService.findAll(RawMaterialPriceHistory.class);
        return ResponseEntity.ok(histories);
    }

    @GetMapping("/raw-materials/{id}/price-history")
    public ResponseEntity<RawMaterialPriceHistory> getRawMaterialPriceHistory(@PathVariable String id) {
        RawMaterialPriceHistory history = genericService.findAll(RawMaterialPriceHistory.class).stream()
                .filter(h -> h.getRawMaterialId().equals(id))
                .findFirst()
                .orElseThrow(() -> new RuntimeException("Price history not found for RawMaterial with id: " + id));
        return ResponseEntity.ok(history);
    }

    // --- APIs not used in the frontend ---

    // Library Categories
    @GetMapping("/library-categories/{id}")
    public ResponseEntity<LibraryCategory> getLibraryCategory(@PathVariable String id) {
        return genericService.getById(id, LibraryCategory.class);
    }

    // Library Products
    @GetMapping("/library-products")
    public List<LibraryProduct> getAllLibraryProducts() {
        return genericService.getAll(LibraryProduct.class);
    }

    @GetMapping("/library-products/{id}")
    public ResponseEntity<LibraryProduct> getLibraryProduct(@PathVariable String id) {
        return genericService.getById(id, LibraryProduct.class);
    }

    @PostMapping("/library-products")
    public LibraryProduct createLibraryProduct(@RequestBody LibraryProduct product) {
        return genericService.save(product);
    }

    @PutMapping("/library-products/{id}")
    public ResponseEntity<LibraryProduct> updateLibraryProduct(@PathVariable String id,
            @RequestBody LibraryProduct product) {
        return ResponseEntity.ok(genericService.update(id, product, LibraryProduct.class));
    }

    @DeleteMapping("/library-products/{id}")
    public ResponseEntity<Void> deleteLibraryProduct(@PathVariable String id) {
        return genericService.delete(id, LibraryProduct.class);
    }

    // Product Components
    @GetMapping("/product-components")
    public List<ProductComponent> getAllProductComponents() {
        return genericService.getAll(ProductComponent.class);
    }

    @GetMapping("/product-components/{id}")
    public ResponseEntity<ProductComponent> getProductComponent(@PathVariable String id) {
        return genericService.getById(id, ProductComponent.class);
    }

    @PostMapping("/product-components")
    public ProductComponent createProductComponent(@RequestBody ProductComponent component) {
        return genericService.save(component);
    }

    @PutMapping("/product-components/{id}")
    public ResponseEntity<ProductComponent> updateProductComponent(@PathVariable String id,
            @RequestBody ProductComponent component) {
        return ResponseEntity.ok(genericService.update(id, component, ProductComponent.class));
    }

    @DeleteMapping("/product-components/{id}")
    public ResponseEntity<Void> deleteProductComponent(@PathVariable String id) {
        return genericService.delete(id, ProductComponent.class);
    }

    @GetMapping("/product-components/{id}/raw-materials")
    public List<RawMaterial> getRawMaterialsInProductComponent(@PathVariable String id) {
        return genericService.getEmbeddedItems(id, ProductComponent.class, RawMaterial.class, "rawMaterials");
    }

    @PostMapping("/product-components/{id}/raw-materials")
    public ResponseEntity<Void> addRawMaterialToProductComponent(@PathVariable String id,
            @RequestBody RawMaterial rawMaterial) {
        return genericService.addEmbeddedItem(id, rawMaterial, ProductComponent.class, "rawMaterials");
    }

    @DeleteMapping("/product-components/{id}/raw-materials/{rawMaterialId}")
    public ResponseEntity<Void> removeRawMaterialFromProductComponent(@PathVariable String id,
            @PathVariable String rawMaterialId) {
        return genericService.removeEmbeddedItem(id, rawMaterialId, ProductComponent.class, "rawMaterials");
    }

    @GetMapping("/raw-materials/{id}")
    public ResponseEntity<RawMaterial> getRawMaterialById(@PathVariable String id) {
        return genericService.getById(id, RawMaterial.class);
    }
}
