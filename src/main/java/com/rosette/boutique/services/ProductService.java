package com.rosette.boutique.services;

import com.rosette.boutique.models.Product;
import com.rosette.boutique.repositories.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ProductService {
    private final ProductRepository repository;

    public List<Product> getAllProducts() {
        return repository.findAll();
    }

    public Product getProductById(String id) {
        return repository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Product not found"));
    }

    public List<Product> getFeaturedProducts() {
        return repository.findByFeaturedTrue();
    }

    public List<Product> searchProducts(String query) {
        return repository.searchProducts(query);
    }

    public List<Product> getProductsByCategory(String category) {
        return repository.findByCategoryIgnoreCase(category);
    }

    public Product saveProduct(Product product) {
        return repository.save(product);
    }

    public void deleteProduct(String id) {
        if (!repository.existsById(id)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Product not found");
        }
        repository.deleteById(id);
    }

    public Product updateSoldOut(String id, boolean soldOut) {
        Product product = getProductById(id);
        product.setSoldOut(soldOut);
        return repository.save(product);
    }

    public Product updateFeatured(String id, boolean featured) {
        Product product = getProductById(id);
        product.setFeatured(featured);
        return repository.save(product);
    }
}

