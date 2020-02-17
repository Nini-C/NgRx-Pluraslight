import { Injectable } from '@angular/core';

import { ProductService } from './../product.service';
import { Product } from '../product';

/* RxJS */
import { mergeMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

/* NgRx */
import { Actions, Effect, ofType } from '@ngrx/effects';
import * as productActions from './product.actions';

@Injectable()
export class ProductEffects {

  constructor(
    private productService: ProductService,
    private actions$: Actions
  ) { }

  // register loadProducts$ observable as an effect with NgRx
  @Effect()
  // listen for all actions being dispatched in application
  loadProducts$ = this.actions$.pipe(
    // filter the actions
    ofType(productActions.ProductActionTypes.Load),
    // map over the emitted actions and return the result of calling injected productService's getProducts method
    mergeMap((action: productActions.Load) =>
       // using another pipe to pass in map operator
      this.productService.getProducts().pipe(
        // map over the results to get the products, then return a new productActions
        map((products: Product[]) => (new productActions.LoadSuccess(products))),
        catchError( err => of(new productActions.LoadFail(err)))
    ))
  );
}
