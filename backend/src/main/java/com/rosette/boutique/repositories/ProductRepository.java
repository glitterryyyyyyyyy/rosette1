package com.rosette.boutique.repositories;

import com.rosette.boutique.models.Product;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import java.util.List;

public interface ProductRepository extends MongoRepository<Product, String> {
    
    List<Product> findByFeaturedTrue();
    
    List<Product> findByCategoryIgnoreCase(String category);
    
    @Query("{ 'name': { $regex: ?0, $options: 'i' }, 'brand': { $regex: ?0, $options: 'i' }, 'description': { $regex: ?0, $options: 'i' } }")
    List<Product> searchProducts(String query);
}

