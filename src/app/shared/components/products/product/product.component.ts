import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Iproduct } from 'src/app/shared/models/product';
import { ProductsService } from 'src/app/shared/services/products.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {
  pid!: string;
  product!: Iproduct;

  constructor(
    private _routes: ActivatedRoute,
    private _productSerrvice: ProductsService
  ) {}

  ngOnInit(): void {
    // console.log(this._routes.snapshot.params['pid'])
    this.pid = this._routes.snapshot.params['pid'];

    // GET ID and make API call using service to get single product
    this.product = this._productSerrvice.getProduct(this.pid);
  }
}
