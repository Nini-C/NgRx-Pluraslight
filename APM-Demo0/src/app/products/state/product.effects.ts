import { ProductService } from './../product.service';
import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import * as productActions from './product.actions';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { Product } from '../product';
import { of } from 'rxjs';

@Injectable()
export class ProductEffects {
  constructor( 
    private productService: ProductService,
    private actions$: Actions
  ) { }

  // register loadProducts$ observable as an effect with NgRx
  @Effect()
  // listen for all actions being dispatched in application
  loadProduct$ = this.actions$.pipe(
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
