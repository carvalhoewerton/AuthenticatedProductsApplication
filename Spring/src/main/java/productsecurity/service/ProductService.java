package productsecurity.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import productsecurity.model.product.Product;
import productsecurity.repository.ProductRepository;

import java.util.List;
import java.util.UUID;

@Service
public class ProductService {
    @Autowired
    private ProductRepository repository;

    public List<Product> getAll() {
        return repository.findAll();
    }
    public Product post(Product product){
        return repository.save(product);
    }
    public ResponseEntity<?> updateProduct(UUID id, Product product) {
        return repository.findById(id)
                .map(found -> {
                    found.setName(product.getName());
                    found.setPrice(product.getPrice());
                    found.setQuantity(product.getQuantity());
                    repository.save(found);
                    return ResponseEntity.ok(found);
                })
                .orElse(ResponseEntity.notFound().build());
    }
    public ResponseEntity<?> deleteProduct(UUID id) {
        return repository.findById(id)
                .map(found -> {
                    repository.deleteById(id);
                    return ResponseEntity.noContent().build();
                })
                .orElse(ResponseEntity.notFound().build());
    }


    public ResponseEntity<?> getItem(UUID id) {
        var product = repository.findProductById(id);
        return ResponseEntity.ok().body(product);
    }
    public ResponseEntity<?> lessOne(UUID id) {
        return repository.findById(id)
                .map(foundProduct -> {
                    foundProduct.setName(foundProduct.getName());
                    foundProduct.setPrice(foundProduct.getPrice());
                    foundProduct.setQuantity(foundProduct.getQuantity() -1);
                    repository.save(foundProduct);
                    return ResponseEntity.ok(foundProduct);
                })
                .orElse(ResponseEntity.notFound().build());
    }

    public ResponseEntity<?> plusOne(UUID id) {
        return repository.findById(id)
                .map(foundProduct -> {
                    foundProduct.setName(foundProduct.getName());
                    foundProduct.setPrice(foundProduct.getPrice());
                    foundProduct.setQuantity(foundProduct.getQuantity() +1);
                    repository.save(foundProduct);
                    return ResponseEntity.ok(foundProduct);
                })
                .orElse(ResponseEntity.notFound().build());
    }


}
