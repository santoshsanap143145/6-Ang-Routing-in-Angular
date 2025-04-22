import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Iproduct } from 'src/app/shared/models/product';
import { ProductsService } from 'src/app/shared/services/products.service';
import { UuidService } from 'src/app/shared/services/uuid.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss'],
})
export class ProductFormComponent implements OnInit {
  prodId!: string;
  isEditMode: boolean = false;
  @ViewChild('productForm') productForm!: NgForm;

  editProdObj!: Iproduct;
  constructor(
    private _routes: ActivatedRoute,
    private _productService: ProductsService,
    private _uuidService: UuidService
  ) {}

  ngOnInit(): void {
    this.prodId = this._routes.snapshot.params['prodId'];
    console.log(this.prodId);
    if (this.prodId) {
      this.isEditMode = true;
      // get prod obj using this.prodId >> Service
      this.editProdObj = this._productService.getProduct(this.prodId);
      if (this.editProdObj) {
        setTimeout(() => {
          this.productForm.form.patchValue(this.editProdObj);
        }, 0);
      }
    } else {
      this.isEditMode = false;
    }
  }
  // isInEditMode ? Patch

  submitOnClick() {
    if (this.productForm.valid) {
      // if comp isEditMode == false add == POST API
      if (!this.isEditMode) {
        // get New prod Obj >> API call using service
        let newProd: Iproduct = {
          ...this.productForm.value,
          pid: this._uuidService.uuid(),
        };
        newProd.canReturn = +newProd.canReturn;
        console.log(newProd);
        this.productForm.reset();
        this._productService.addNewProduct(newProd);
      } else {
        // else comp isIneditMode == true update == PATCH API
        // GET updated Obj from form
        let updatedProd = { ...this.productForm.value, pid: this.prodId };
        updatedProd.canReturn = +updatedProd.canReturn;
        console.log(updatedProd);
        // API Call to updated obj in DB using service
        this._productService.updateProduct(updatedProd);
      }
    }
  }
  
}
