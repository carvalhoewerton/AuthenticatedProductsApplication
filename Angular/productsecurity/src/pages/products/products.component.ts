import { Component, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Product } from '../../models/product';
import { ProductService } from '../../services/product.service';
import { Observable, Subject } from 'rxjs';

import { ActivatedRoute, Router } from '@angular/router';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [MatButtonModule, MatCardModule, MatToolbarModule, MatIconModule, MatButtonModule, MatButtonModule, MatTableModule],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']

})
export class ProductsComponent implements OnInit {


  displayedColumns: string[] = ['name', 'price', 'quantity', 'actions'];
  tbtext: string = "Produtos Cadastrados";
  product$: Observable<Product[]>;
  private destroy$ = new Subject<void>();

   constructor(private router:Router, private route: ActivatedRoute, private service: ProductService){
    this.product$ = this.service.list();
  }

   ngOnInit(): void {

      const product:Product = this.route.snapshot.data['product'];
      this.loadProducts();
   }

   loadProducts() {
     this.product$ = this.service.list();
   }

   ngOnDestroy(): void {
     this.destroy$.next();
     this.destroy$.complete();
   }

   toCreate(){
    return this.router.navigate(['create']);
   }

   delete(product:Product){
    this.service.delete(product.id).subscribe(() => {
      this.loadProducts();
    });
   }

   lessOne(product: Product) {
    if (product.quantity > 0) {
      this.service.lessOne(product).subscribe(
        updatedProduct => {
          console.log("Produto atualizado:", updatedProduct);
          this.loadProducts();
        },
        error => {
          console.error("Erro ao atualizar produto:", error);
        }
      );
    } else {
      console.log("Produto com quantidade zero. Nenhuma ação necessária.");
    }
  }

  logOut() {

    localStorage.removeItem('accessToken');

    this.router.navigate(['login']);
  }

  plusOne(product: Product) {
    if (product.quantity > 0) {
      this.service.plusOne(product).subscribe(
        updatedProduct => {
          console.log("Produto atualizado:", updatedProduct);
          this.loadProducts();
        },
        error => {
          console.error("Erro ao atualizar produto:", error);
        }
      );
    } else {
      console.log("Produto com quantidade zero. Nenhuma ação necessária.");
    }
  }

  onEdit(product: Product) {

    this.router.navigate(['edit', product.id]);

  }

}
