import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product';
import { Location } from '@angular/common';

@Component({
  selector: 'app-createproduct',
  templateUrl: './createproduct.component.html',
  styleUrls: ['./createproduct.component.scss'],
  imports:[ReactiveFormsModule, RouterModule],
  standalone:true
})
export class CreateproductComponent implements OnInit {
  form: FormGroup;
  @Output() load = new EventEmitter<void>;
  constructor(private router: Router, private route: ActivatedRoute, private location: Location, private fb: FormBuilder, private service: ProductService) {
    this.form = fb.group({
      id: [''],
      name: ['', Validators.required],
      price: ['', Validators.required],
      quantity: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    const product: Product = this.route.snapshot.data['product'];
    if (product) {
      this.form.patchValue({
        id: product.id,
        name: product.name,
        price: product.price,
        quantity: product.quantity
      });
    }
  }

  saveOrUpdate(): void {
    this.service.save(this.form.value).subscribe(result => console.log(result));
    this.loadProduct()
    this.router.navigate(['products'])
  }

  loadProduct(){
    this.load.emit();
  }
}
