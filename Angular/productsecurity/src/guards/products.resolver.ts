import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';

import { Injectable } from '@angular/core';
import { Product } from '../models/product';
import { ProductService } from '../services/product.service';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root' //
})
export class ProductResolver implements Resolve<Product> {

  constructor(private service: ProductService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Product> {
    const courseId = route.paramMap.get('id');
    if (courseId) {
      console.log(courseId);
      return this.service.loadById(courseId);
    } else {

      return of({ id: '', name: '', price: 0, quantity: 0 });
    }
  }
}
