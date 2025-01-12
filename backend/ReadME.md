# Inventory Management System

A Spring Boot application designed to efficiently manage product inventory, raw materials, and formulations for chemical and paint product manufacturing.

---

## Features
- **Product and Category Management**
- **Raw Material Inventory Tracking**
- **Product Formulation Management**
- **Advanced Search & Filtering**
---

## Project Setup

1. **Clone the repository**:
    ```bash
    git clone <repository-url>
    cd inventory-management
    ```

2. **Build the project**:
    ```bash
    mvn clean install
    ```

---

## API Endpoints
### Library Categories
- `GET /api/library-categories` - List all library categories.
- `GET /api/library-categories/{id}` - Get specific library category.
- `POST /api/library-categories` - Create new library category.
- `PUT /api/library-categories/{id}` - Update library category.
- `DELETE /api/library-categories/{id}` - Delete library category.
- `GET /api/library-categories/{id}/library-products` - Get library products in library category.
- `POST /api/library-categories/{id}/library-products` - Add library product to library category.
- `DELETE /api/library-categories/{id}/library-products/{productId}` - Remove library product from library category.

### Library Products
- `GET /api/library-products` - List all library products.
- `GET /api/library-products/{id}` - Get specific library product.
- `POST /api/library-products` - Create new library product.
- `PUT /api/library-products/{id}` - Update library product.
- `DELETE /api/library-products/{id}` - Delete library product.
- `GET /api/library-products/{id}/product-components` - Get product components of library product.
- `POST /api/library-products/{id}/product-components` - Add product component to library product.
- `DELETE /api/library-products/{id}/product-components/{componentId}` - Remove product component from library product.

### Product Components
- `GET /api/product-components` - List all product components.
- `GET /api/product-components/{id}` - Get specific product component.
- `POST /api/product-components` - Create new product component.
- `PUT /api/product-components/{id}` - Update product component.
- `DELETE /api/product-components/{id}` - Delete product component.
- `GET /api/product-components/{id}/raw-materials` - Get raw materials in product component.
- `POST /api/product-components/{id}/raw-materials` - Add raw material to product component.
- `DELETE /api/product-components/{id}/raw-materials/{rawMaterialId}` - Remove raw material from product component.

### Raw Materials
- `GET /api/raw-materials` - List all raw materials.
- `GET /api/raw-materials/{id}` - Get specific raw material.
- `POST /api/raw-materials` - Create new raw material.
- `PUT /api/raw-materials/{id}` - Update raw material.
- `DELETE /api/raw-materials/{id}` - Delete raw material.
- `GET /api/raw-materials/{id}/raw-material-products` - Get raw material products using raw material.
- `POST /api/raw-materials/{id}/raw-material-products` - Add raw material product to raw material.
- `DELETE /api/raw-materials/{id}/raw-material-products/{productId}` - Remove raw material product from raw material.

## Raw Material Categories
- `GET /api/raw-material-categories` - List all raw material categories.
- `GET /api/raw-material-categories/{id}` - Get specific raw material category.
- `POST /api/raw-material-categories` - Create new raw material category.
- `PUT /api/raw-material-categories/{id}` - Update raw material category.
- `DELETE /api/raw-material-categories/{id}` - Delete raw material category.
- `GET /api/raw-material-categories/{id}/raw-material-products` - Get raw material products in raw material category.
- `POST /api/raw-material-categories/{id}/raw-material-products` - Add raw material product to raw material category.
- `DELETE /api/raw-material-categories/{id}/raw-material-products/{productId}` - Remove raw material product from raw material category.
---