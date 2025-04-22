import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Iproduct } from 'src/app/shared/models/product';
import { ProductsService } from 'src/app/shared/services/products.service';
import { GetConfirmationComponent } from '../../get-confirmation/get-confirmation.component';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {
  prodId!: string;
  product!: Iproduct;

  constructor(
    private _routes: ActivatedRoute,
    private _productSerrvice: ProductsService,
    private _matDialog: MatDialog
  ) {}

  ngOnInit(): void {
    // console.log(this._routes.snapshot.params['pid'])
    this.prodId = this._routes.snapshot.params['prodId'];
    console.log(this.prodId);

    // GET ID and make API call using service to get single product
    this.product = this._productSerrvice.getProduct(this.prodId);
    console.log(this.product);
  }

  onRemove() {
    // get Product then get Confirmation

    // let getConfirmation = confirm(
    //   `Are you sure, you want to remove the Product?`
    // );
    // if (getConfirmation) {
    //   // DELETE API call to remove product === call method from Service
    //   this._productSerrvice.removeProduct(this.product);
    // }

    let matDialogConfig = new MatDialogConfig();

    matDialogConfig.disableClose = true;
    matDialogConfig.width = '500px';
    matDialogConfig.data = `Do you really want to delete the Product ${this.product.pname}?  `;

    let matDialogRef = this._matDialog.open(
      GetConfirmationComponent,
      matDialogConfig
    );
    matDialogRef.afterClosed().subscribe((res) => {
      if (res) {
        this._productSerrvice.removeProduct(this.product);
      }
    });
  }
}
