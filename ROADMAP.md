# 🎯 REMAINING ISSUES & ENHANCEMENT ROADMAP

**Project:** Rosette Boutique Catalog Management System  
**Current Status:** 13/18 bugs fixed | Phase 2 Complete

---

## 📋 REMAINING MEDIUM PRIORITY ISSUES

### **Issue #1: Rate Limiting on Login Endpoint** 
**Severity:** 🟠 High  
**Effort:** 🕐 30 mins  
**Status:** ⏳ Not Started

**Problem:**
- No brute force protection on `/api/auth/login`
- Users can try unlimited password attempts

**Solution:**
Option A: Use Spring Cloud CircuitBreaker
Option B: Use Bucket4j library
Option C: Custom implementation with Redis

```java
@RateLimiter(value = "loginLimiter")
@PostMapping("/login")
public ResponseEntity<AuthResponse> login(@RequestBody LoginRequest request) {
    // Max 5 attempts per 15 minutes per IP
}
```

**Recommended:** Bucket4j (simple, lightweight)

---

### **Issue #2: Missing Pagination**
**Severity:** 🟠 High  
**Effort:** 🕐 45 mins  
**Status:** ⏳ Not Started

**Problem:**
- Loading 1000+ products at once causes performance issues
- No `page` or `size` parameters
- Slow initial load time

**Solution:**
Add Spring Data `Pageable` parameter

```java
@GetMapping
public Page<Product> getAllProducts(
    @RequestParam(defaultValue = "0") int page,
    @RequestParam(defaultValue = "12") int size
) {
    return productService.getAllProducts(PageRequest.of(page, size));
}
```

**Frontend:**
```jsx
const [page, setPage] = useState(0);
const fetchProducts = async (pageNum) => {
  const res = await api.get(`/products?page=${pageNum}&size=12`);
  setProducts(res.data.content);
  setTotalPages(res.data.totalPages);
};
```

---

### **Issue #3: Inventory Management**
**Severity:** 🟡 Medium  
**Effort:** 🕐 1 hour  
**Status:** ⏳ Not Started

**Problem:**
- `soldOut` is boolean - can't track partial stock
- Can't show "only 2 left" type messages
- No stock updates when products are sold

**Solution:**
Add `quantity` field to Product model

```java
@Data
public class Product {
    private Integer quantity; // Total items in stock
    private Integer soldCount; // Items sold
    
    public boolean isSoldOut() {
        return quantity <= 0;
    }
}
```

**Endpoints:**
```
PATCH /api/admin/products/{id}/quantity
PATCH /api/products/{id}/reserve
```

---

### **Issue #4: Advanced Search Filters**
**Severity:** 🟡 Medium  
**Effort:** 🕐 1.5 hours  
**Status:** ⏳ Not Started

**Problem:**
- Can only search by text
- No price range filtering
- No category combination filters
- No size filter

**Solution:**
```java
@GetMapping("/search/advanced")
public Page<Product> advancedSearch(
    @RequestParam(required = false) String query,
    @RequestParam(required = false) String category,
    @RequestParam(required = false) Double minPrice,
    @RequestParam(required = false) Double maxPrice,
    @RequestParam(required = false) String size,
    @RequestParam(defaultValue = "0") int page
) {
    // Build dynamic query with all filters
}
```

---

### **Issue #5: Missing Logging**
**Severity:** 🟡 Medium  
**Effort:** 🕐 1 hour  
**Status:** ⏳ Not Started

**Problem:**
- No structured logging
- Hard to debug production issues
- No audit trail for admin actions

**Solution:**
Add SLF4J with Logback

```java
private static final Logger logger = LoggerFactory.getLogger(ProductService.class);

public Product saveProduct(Product product) {
    logger.info("Creating/updating product: {}", product.getId());
    try {
        Product saved = repository.save(product);
        logger.info("Product saved successfully: {}", saved.getId());
        return saved;
    } catch (Exception e) {
        logger.error("Failed to save product: {}", product.getId(), e);
        throw e;
    }
}
```

---

### **Issue #6: API Documentation**
**Severity:** 🟡 Medium  
**Effort:** 🕐 2 hours  
**Status:** ⏳ Not Started

**Problem:**
- No API documentation
- Frontend developers need to guess endpoints
- No schema validation documentation

**Solution:**
Add Swagger/OpenAPI with Springdoc

```xml
<!-- pom.xml -->
<dependency>
    <groupId>org.springdoc</groupId>
    <artifactId>springdoc-openapi-starter-webmvc-ui</artifactId>
    <version>2.0.0</version>
</dependency>
```

```java
@RestController
@CrossOrigin
@Tag(name = "Products", description = "Product management API")
public class ProductController {
    
    @GetMapping("/{id}")
    @Operation(summary = "Get product by ID", description = "Retrieve a single product with images and details")
    public Product getById(@PathVariable String id) {
        // ...
    }
}
```

Access at: `http://localhost:8080/swagger-ui.html`

---

### **Issue #7: Image Optimization**
**Severity:** 🟡 Medium  
**Effort:** 🕐 1.5 hours  
**Status:** ⏳ Not Started

**Problem:**
- Images from Cloudinary might be large
- No compression on frontend
- No thumbnail generation
- Slow load times for multiple images

**Solution:**
Use Cloudinary transformations

```javascript
// Instead of:
src={imageUrl}

// Use optimized URLs:
src={`${imageUrl}?c_scale,w_400,q_auto`}  // 400px width, auto quality
```

Or use Next.js Image component (if upgrading)

---

### **Issue #8: Wishlist/Cart Feature**
**Severity:** 🟡 Medium  
**Effort:** 🕐 2+ hours  
**Status:** ⏳ Not Started

**Problem:**
- Users can't save favorite items
- No shopping cart
- No checkout flow

**Solution:**
Add new models & endpoints

```java
@Document(collection = "wishlists")
public class Wishlist {
    @Id private String id;
    private String userId;
    private List<String> productIds;
    private LocalDateTime createdAt;
}

@PostMapping("/wishlist/add/{productId}")
public ResponseEntity<Wishlist> addToWishlist(@PathVariable String productId) {
    // Add to user's wishlist
}
```

---

## 🚀 QUICK WINS (Easy Fixes)

### **Easy #1: ProductCard Component Validation**
**Effort:** 🕐 15 mins  
- Check if ProductCard exists and is properly implemented
- Verify it handles missing images gracefully
- Add `PropTypes` validation

### **Easy #2: Add Loading Skeletons**
**Effort:** 🕐 20 mins  
- Replace generic spinners with skeleton screens
- Better UX while loading products
- Show placeholder images

### **Easy #3: Add Breadcrumbs Navigation**
**Effort:** 🕐 20 mins  
- Home > Products > Category > Product
- Better navigation experience

### **Easy #4: Improve Mobile Responsiveness**
**Effort:** 🕐 30 mins  
- Test on mobile devices
- Fix button sizes
- Optimize touch targets (min 44px)

---

## 🎨 FEATURE ENHANCEMENTS

### **Feature #1: Product Recommendations**
- "You may also like" section
- Based on category or brand
- Simple but effective

### **Feature #2: User Reviews/Ratings**
- Star ratings (1-5)
- Review comments
- Helpful for other customers

### **Feature #3: Admin Analytics Dashboard**
- Sales trends
- Most viewed products
- Customer statistics
- Inventory warnings

### **Feature #4: Email Notifications**
- Order confirmations
- Stock alerts
- Admin alerts for low inventory

---

## 📊 PRIORITIZATION MATRIX

```
HIGH IMPACT + EASY → DO FIRST
├─ Rate Limiting (security)
├─ Pagination (performance)
└─ Logging (maintainability)

HIGH IMPACT + HARD → DO NEXT
├─ Inventory Management
├─ Advanced Search
└─ API Documentation

LOW IMPACT + EASY → DO LATER
├─ Loading Skeletons
├─ Breadcrumbs
└─ ProductCard Validation

LOW IMPACT + HARD → NICE TO HAVE
├─ Image Optimization
├─ Wishlist/Cart
└─ Reviews System
```

---

## ✅ IMMEDIATE ACTION ITEMS (Next 2 Hours)

1. **Rate Limiting** ← CRITICAL FOR PRODUCTION
   - Protect `/api/auth/login`
   - Simple library: Bucket4j

2. **Pagination** ← SCALABILITY
   - Add to `/api/products` endpoints
   - Update frontend to use pages

3. **ProductCard Review** ← VALIDATION
   - Check if component exists
   - Verify error handling

---

## 🎯 SPRINT PLANNING

### Sprint 1 (This Week)
- [x] Fix critical bugs (Done - Iteration 1)
- [x] Add validation & error handling (Done - Iteration 2)
- [ ] Implement rate limiting
- [ ] Add pagination

### Sprint 2 (Next Week)
- [ ] Inventory management
- [ ] Advanced search filters
- [ ] Logging integration
- [ ] API documentation

### Sprint 3 (Month 2)
- [ ] Wishlist feature
- [ ] User reviews
- [ ] Admin analytics
- [ ] Email notifications

---

## 📞 NEXT STEPS

**Option A (Conservative):**
1. Run comprehensive tests
2. Deploy current fixes to production
3. Then add rate limiting + pagination

**Option B (Aggressive):**
1. Continue and complete rate limiting now
2. Add pagination immediately
3. Deploy as complete package

**Recommendation:** Option B - Rate limiting is security-critical

---

*Last Updated: May 11, 2026*  
*Next Review Date: May 13, 2026*
