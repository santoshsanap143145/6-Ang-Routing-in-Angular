import { Component, OnInit } from '@angular/core';
import { Iproduct } from '../../models/product';
import { ProductsService } from '../../services/products.service';
import { ActivatedRoute, Router, Routes } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  productsArr: Array<Iproduct> = [];
  constructor(
    private _productService: ProductsService,
    private _router: Router,
    private _Activatedroute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.productsArr = this._productService.fetchAllProducts();
  }

  navigateToproduct(prod: Iproduct) {
    console.log(prod.pid);
    
  // path above is absolute path which is default path, we get path like this ==> baseUrl/prodId
    // this._router.navigate([prodId]) // baseUrl/123
    // so we have to use like shown below
    // this._router.navigate(['products', prodId])
    // baseUrl/products/123 << our right path

    // and if we want to use relative path then ==>
    let routerConfig = {
      relativeTo: this._Activatedroute,
      queryParams: { 
        canReturn: prod.canReturn
      }
    }
    this._router.navigate([prod.pid], routerConfig)

    // baseUrl/products/:id ==>
    // baseUrl/products/123
  }
}
