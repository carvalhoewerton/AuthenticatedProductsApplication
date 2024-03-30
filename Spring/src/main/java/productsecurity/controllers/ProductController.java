package productsecurity.controllers;


import jakarta.validation.Valid;
import org.apache.coyote.Response;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import productsecurity.model.product.Product;
import productsecurity.model.product.ProductDto;
import productsecurity.service.ProductService;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api")
public class ProductController {
    @Autowired
    private ProductService service;

    @PostMapping("/save")
    @ResponseStatus(code = HttpStatus.CREATED)
    public Product create(@RequestBody ProductDto product) {
        var newProduct = new Product();
        BeanUtils.copyProperties(product, newProduct);
        return service.post(newProduct);
    }

    @GetMapping("/products")
    public ResponseEntity<List<Product>> getAllProducts() {
        List<Product> products = service.getAll();
        return ResponseEntity.ok(products);
    }
    @PutMapping("/{id}")
    public ResponseEntity<?> updateProduct(@PathVariable UUID id, @RequestBody Product product) {
        return service.updateProduct(id, product);
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable UUID id){
        return service.deleteProduct(id);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> get(@PathVariable UUID id){
        return service.getItem(id);
    }

    @PutMapping("/{id}/lessOne")
    public ResponseEntity<?> lessOne(@PathVariable UUID id) {
        return service.lessOne(id);
    }

    @PutMapping("/{id}/plusOne")
    public ResponseEntity<?> plusOne(@PathVariable UUID id) {
        return service.plusOne(id);
    }

}
