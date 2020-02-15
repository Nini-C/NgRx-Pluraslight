import { Action } from '@ngrx/store';
import { Product } from '../product';

// define the action types as a set of named constants
export enum ProductActionTypes {
  ToggleProductCode = '[Product] Toggle Product Code',
  SetCurrentProduct = '[Product] Set Current Product',
  ClearCurrentProduct = '[Product] Clear Current Product',
  InitializeCurrentProduct = '[Product] Initialize Current Product'
}

// build action creator: use this class to create an action
export class ToggleProductCode implements Action {
  readonly type = ProductActionTypes.ToggleProductCode;

  constructor(public payload: boolean) {}
}

export class SetCurrentProduct implements Action {
  readonly type = ProductActionTypes.SetCurrentProduct;

  constructor(public payload: Product) {}
}

export class ClearCurrentProduct implements Action {
  readonly type = ProductActionTypes.ClearCurrentProduct;
  // no payload, which return null, no need to write constructor
}

export class InitializeCurrentProduct implements Action {
  readonly type = ProductActionTypes.InitializeCurrentProduct;
}

// define a type to union all of the action creators
export type ProductActions = ToggleProductCode
  | SetCurrentProduct
  | ClearCurrentProduct
  | InitializeCurrentProduct;
