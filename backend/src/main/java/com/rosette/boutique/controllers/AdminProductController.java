package com.rosette.boutique.controllers;

import com.rosette.boutique.dto.CreateProductRequest;
import com.rosette.boutique.models.Product;
import com.rosette.boutique.services.CloudinaryService;
import com.rosette.boutique.services.ProductService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
@PreAuthorize("hasAuthority('ADMIN')")
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:3000"}, allowCredentials = "true")
public class AdminProductController {
    private final ProductService productService;
    private final CloudinaryService cloudinaryService;

    @PostMapping("/products")
    public ResponseEntity<Product> createProduct(@Valid @RequestBody CreateProductRequest request) {
        Product product = Product.builder()
                .name(request.getName())
                .brand(request.getBrand())
                .category(request.getCategory())
                .price(request.getPrice())
                .size(request.getSize())
                .description(request.getDescription())
                .images(request.getImages())
                .soldOut(request.isSoldOut())
                .featured(request.isFeatured())
                .badge(request.getBadge())
                .build();
        return ResponseEntity.ok(productService.saveProduct(product));
    }

    @PutMapping("/products/{id}")
    public ResponseEntity<Product> updateProduct(@PathVariable String id, @Valid @RequestBody CreateProductRequest request) {
        Product product = Product.builder()
                .id(id)
                .name(request.getName())
                .brand(request.getBrand())
                .category(request.getCategory())
                .price(request.getPrice())
                .size(request.getSize())
                .description(request.getDescription())
                .images(request.getImages())
                .soldOut(request.isSoldOut())
                .featured(request.isFeatured())
                .badge(request.getBadge())
                .build();
        return ResponseEntity.ok(productService.saveProduct(product));
    }

    @DeleteMapping("/products/{id}")
    public ResponseEntity<Void> deleteProduct(@PathVariable String id) {
        productService.deleteProduct(id);
        return ResponseEntity.noContent().build();
    }

    @PatchMapping("/products/{id}/soldout")
    public ResponseEntity<Product> updateSoldOut(@PathVariable String id, @RequestParam boolean soldOut) {
        return ResponseEntity.ok(productService.updateSoldOut(id, soldOut));
    }

    @PatchMapping("/products/{id}/featured")
    public ResponseEntity<Product> updateFeatured(@PathVariable String id, @RequestParam boolean featured) {
        return ResponseEntity.ok(productService.updateFeatured(id, featured));
    }

    @PostMapping("/upload-images")
    public ResponseEntity<List<String>> uploadImages(@RequestParam("files") List<MultipartFile> files) throws IOException {
        return ResponseEntity.ok(cloudinaryService.uploadImages(files));
    }
}
