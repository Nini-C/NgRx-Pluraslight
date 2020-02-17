import { Component, OnInit, OnDestroy } from '@angular/core';

import { Product } from '../product';

/* rxjs */
import { takeWhile } from 'rxjs/operators';
import { Observable } from 'rxjs';

/* ngrx */
import { Store, select } from '@ngrx/store';
import * as fromProduct from '../state/product.reducer';
import * as productActions from '../state/product.actions';

@Component({
  selector: 'pm-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, OnDestroy {
  pageTitle = 'Products';
  componentActive = true;
  errorMessage$: Observable<string>;
  products$: Observable<Product[]>;

  displayCode: boolean;

  // Used to highlight the selected product in the list
  selectedProduct: Product | null;

  constructor(private store: Store<fromProduct.State>) { }

  ngOnInit(): void {

    // Do NOT subscribe here because it uses an async pipe
    // listen to the store and select this product state
    this.products$ = this.store.pipe(select(fromProduct.getProducts));

    // Do NOT subscribe here because it used an async pipe
    this.errorMessage$ = this.store.pipe(select(fromProduct.getError));

    this.store.dispatch(new productActions.Load());

     // Subscribe here because it does not use an async pipe
    this.store.pipe(
      select(fromProduct.getCurrentProduct),
      takeWhile(() => this.componentActive)
    ).subscribe(
      currentProduct => this.selectedProduct = currentProduct
    );

     // Subscribe here because it does not use an async pipe
    this.store.pipe(
      select(fromProduct.getShowProductCode),
      takeWhile(() => this.componentActive)
      ).subscribe(
        showProductCode => this.displayCode = showProductCode
      );
  }

  ngOnDestroy(): void {
    this.componentActive = false;
  }

  checkChanged(value: boolean): void {
    this.store.dispatch( new productActions.ToggleProductCode(value));
  }

  newProduct(): void {
    this.store.dispatch(new productActions.InitializeCurrentProduct());
  }

  productSelected(product: Product): void {
    this.store.dispatch(new productActions.SetCurrentProduct(product));
  }

}
