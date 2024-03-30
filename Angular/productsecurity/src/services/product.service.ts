import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../models/product';
import { first, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private readonly API = 'http://localhost:8080/api'
  private readonly pt = 'http://localhost:4200/api/products'
  constructor(private http: HttpClient) { }

  list() {
    return this.http.get<Product[]>(`${this.API}/products`)
      .pipe(
        first(),
        tap((product: any) => console.log(product))
      );
  }
  save(product: Partial<Product>){
    if(product.id){
      console.log("update");
      return this.update(product);

    }
    console.log("create");
    return this.http.post<Product>(`${this.API}/save`, product);

  }

  delete(id: string) {
    return this.http.delete(`${this.API}/${id}`);
  }


  loadById(id:string){
    return this.http.get<Product>(`${this.API}/${id}`)
  }
  update(product: Partial<Product>){
    return this.http.put<Product>(`${this.API}/${product.id}`, product);
  }

  lessOne(product: Product) {
    console.log("teste");
    return this.http.put<Product>(`${this.API}/${product.id}/lessOne`, product);
  }
  plusOne(product: Product) {
    console.log("teste");
    return this.http.put<Product>(`${this.API}/${product.id}/plusOne`, product);
  }


}
