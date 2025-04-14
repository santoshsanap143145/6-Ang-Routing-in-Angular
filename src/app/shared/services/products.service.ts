import { Injectable } from '@angular/core';
import { Iproduct } from '../models/product';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  productsArr: Array<Iproduct> = [
    {
      pname: 'Samsung M31',
      pid: '123',
      pstatus: "In-progress",
      canReturn: 1
    },
    {
      pname: 'Samsung TV',
      pid: '124',
      pstatus: "Dispatched",
      canReturn: 1
    },
    {
      pname: 'Iphone',
      pid: '125',
      pstatus: "Delivered",
      canReturn: 0
    },
  ];
  constructor() {}

  fetchAllProducts(): Array<Iproduct>{
    // API call to fetch all products data
    return this.productsArr
  }

  getProduct(id : string): Iproduct{
    // APi call to get a product using productId = pid(parameter)
    return this.productsArr.find(prod => prod.pid === id)!
  }
}
